"""Edge video processing pipeline coordinating detection, tracking, analytics, and storage."""
import argparse
import sys
import time
from pathlib import Path
from typing import Optional

import cv2
from edge.analytics.stub_analytics import StubAnalytics
from edge.config import StoreConfig, load_config
from edge.detect.stub_detector import StubDetector
from edge.logger import LatencyTracker, get_logger
from edge.store.db import EdgeStore
from edge.track.stub_tracker import StubTracker

logger = get_logger("edge.pipeline")


class EdgePipeline:
    """Offline edge video intelligence pipeline."""

    def __init__(
        self,
        config: Optional[StoreConfig] = None,
        source: Optional[str] = None,
        headless: bool = True,
        max_frames: Optional[int] = None,
    ):
        self.config = config or load_config()
        self.source = source or self.config.video.source
        self.headless = headless
        self.max_frames = max_frames

        # Components
        self.detector = StubDetector()
        self.tracker = StubTracker()
        self.analytics = StubAnalytics(self.config)
        self.store = EdgeStore(self.config.storage.db_path)
        self.latency_tracker = LatencyTracker(window_size=30)

        self._running = False

    def run(self) -> int:
        """Run the pipeline on video source. Returns total frames processed."""
        # Check source type (int for webcam index, str for file/stream)
        src_val = int(self.source) if str(self.source).isdigit() else str(self.source)

        cap = cv2.VideoCapture(src_val)
        if not cap.isOpened():
            logger.error(f"Failed to open video source: {self.source}")
            raise RuntimeError(f"Cannot open video source: {self.source}")

        fps_source = cap.get(cv2.CAP_PROP_FPS) or self.config.video.target_fps
        total_source_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        logger.info(
            f"Initialized EdgePipeline on '{self.source}' | "
            f"Source FPS: {fps_source:.1f} | Total Frames: {total_source_frames} | "
            f"Target Store: {self.config.store_id} ({self.config.name})"
        )

        frame_count = 0
        self._running = True
        start_wall_time = time.time()

        try:
            while self._running:
                self.latency_tracker.start_frame()

                ret, frame = cap.read()
                if not ret:
                    logger.info("End of video stream reached.")
                    break

                frame_count += 1

                # Frame skip if configured
                if self.config.video.frame_skip > 1 and (frame_count % self.config.video.frame_skip != 0):
                    continue

                # Resize to inference resolution if needed
                infer_w, infer_h = self.config.video.inference_resolution
                if frame.shape[1] != infer_w or frame.shape[0] != infer_h:
                    infer_frame = cv2.resize(frame, (infer_w, infer_h))
                else:
                    infer_frame = frame

                # Step 1: Detect
                detections = self.detector.detect(infer_frame)

                # Step 2: Track (anonymized IDs)
                tracks = self.tracker.update(detections)

                # Step 3: Analytics (counts, dwell, queues)
                now_ts = time.time()
                snapshot = self.analytics.process(tracks, timestamp=now_ts)

                # Step 4: Edge storage (event logging periodically or on trigger)
                if frame_count % 30 == 0:
                    self.store.record_event(
                        store_id=self.config.store_id,
                        event_type="occupancy_tick",
                        payload={
                            "frame": frame_count,
                            "occupancy": snapshot.active_occupancy,
                            "total_in": snapshot.total_in,
                            "total_out": snapshot.total_out,
                            "queues": snapshot.queue_counts,
                        },
                        timestamp=now_ts,
                    )

                # Measure latency & FPS
                latency_ms = self.latency_tracker.end_frame()

                if frame_count % 15 == 0 or frame_count == 1:
                    logger.info(
                        f"Frame {frame_count:04d} | "
                        f"FPS: {self.latency_tracker.fps:5.1f} | "
                        f"Latency: {latency_ms:5.1f}ms (avg {self.latency_tracker.avg_latency_ms:5.1f}ms) | "
                        f"Active Tracks: {len(tracks)}"
                    )

                # Display frame if not in headless mode
                if not self.headless:
                    # Draw simple debug annotations
                    for t in tracks:
                        x1, y1, x2, y2 = t.box
                        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                        cv2.putText(
                            frame,
                            f"ID: {t.track_id}",
                            (x1, max(20, y1 - 10)),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.5,
                            (0, 255, 0),
                            2,
                        )

                    cv2.imshow("Edge AI Retail Monitor (Local)", frame)
                    if cv2.waitKey(1) & 0xFF == ord("q"):
                        logger.info("User requested exit.")
                        break

                if self.max_frames and frame_count >= self.max_frames:
                    logger.info(f"Reached max requested frames limit ({self.max_frames}).")
                    break

        finally:
            cap.release()
            if not self.headless:
                cv2.destroyAllWindows()

        elapsed_total = time.time() - start_wall_time
        effective_fps = frame_count / elapsed_total if elapsed_total > 0 else 0
        logger.info(
            f"Pipeline finished: {frame_count} frames processed in {elapsed_total:.2f}s "
            f"({effective_fps:.1f} effective FPS)."
        )
        return frame_count

    def close(self) -> None:
        """Release pipeline resources."""
        self.stop()
        if hasattr(self, "store") and hasattr(self.store, "close"):
            self.store.close()

    def stop(self) -> None:
        """Signal pipeline to stop processing."""
        self._running = False


def main():
    parser = argparse.ArgumentParser(description="Edge AI Retail Intelligence Pipeline")
    parser.add_argument("--config", type=str, default="configs/store_default.yaml", help="Path to store YAML configuration")
    parser.add_argument("--source", type=str, default=None, help="Video source (path to file or camera index)")
    parser.add_argument("--headless", action="store_true", default=True, help="Run without UI window (default True)")
    parser.add_argument("--gui", dest="headless", action="store_false", help="Run with GUI preview window")
    parser.add_argument("--max-frames", type=int, default=None, help="Maximum frames to process before exiting")

    args = parser.parse_args()

    cfg = load_config(args.config)
    pipeline = EdgePipeline(
        config=cfg,
        source=args.source,
        headless=args.headless,
        max_frames=args.max_frames,
    )
    pipeline.run()


if __name__ == "__main__":
    main()
