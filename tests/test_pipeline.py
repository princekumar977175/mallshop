import tempfile
import time
from pathlib import Path
import numpy as np

from edge.analytics.stub_analytics import StubAnalytics
from edge.config import load_config
from edge.detect.stub_detector import StubDetector
from edge.logger import LatencyTracker
from edge.pipeline import EdgePipeline
from edge.sim_video_helper import create_dummy_video
from edge.track.stub_tracker import StubTracker


def test_latency_tracker():
    """Verify latency tracker computes frame rates and averages."""
    tracker = LatencyTracker(window_size=10)
    for _ in range(5):
        tracker.start_frame()
        time.sleep(0.005)
        tracker.end_frame()

    assert tracker.total_frames == 5
    assert tracker.fps > 0
    assert tracker.avg_latency_ms > 0


def test_stub_detector():
    """Verify detector produces valid detections."""
    detector = StubDetector()
    frame = np.zeros((480, 640, 3), dtype=np.uint8)
    detections = detector.detect(frame)
    assert len(detections) >= 1
    assert detections[0].class_name == "person"
    assert detections[0].confidence > 0.5


def test_stub_tracker():
    """Verify tracker assigns consistent IDs."""
    detector = StubDetector()
    tracker = StubTracker()
    frame = np.zeros((480, 640, 3), dtype=np.uint8)

    dets1 = detector.detect(frame)
    tracks1 = tracker.update(dets1)
    assert len(tracks1) >= 1
    track_id = tracks1[0].track_id

    dets2 = detector.detect(frame)
    tracks2 = tracker.update(dets2)
    assert tracks2[0].track_id == track_id
    assert len(tracks2[0].history) == 2


def test_stub_analytics():
    """Verify analytics processing snapshot."""
    cfg = load_config("configs/store_default.yaml")
    analytics = StubAnalytics(cfg)
    detector = StubDetector()
    tracker = StubTracker()
    frame = np.zeros((480, 640, 3), dtype=np.uint8)

    tracks = tracker.update(detector.detect(frame))
    snapshot = analytics.process(tracks, timestamp=time.time())

    assert snapshot.active_occupancy == len(tracks)
    assert "counter_1" in snapshot.queue_counts
    assert "zone_promo_endcap" in snapshot.zone_dwells


def test_pipeline_execution():
    """Verify that video plays through the stub pipeline end-to-end."""
    with tempfile.TemporaryDirectory() as tmp_dir:
        video_path = str(Path(tmp_dir) / "test_dummy.mp4")
        create_dummy_video(video_path, num_frames=15, width=640, height=480, fps=15)

        cfg = load_config("configs/store_default.yaml")
        cfg.storage.db_path = str(Path(tmp_dir) / "test_pipeline.db")

        pipeline = EdgePipeline(
            config=cfg,
            source=video_path,
            headless=True,
            max_frames=10,
        )

        frames_processed = pipeline.run()
        assert frames_processed == 10
