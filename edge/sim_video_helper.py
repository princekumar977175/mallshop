"""Helper to quickly create lightweight test video clips."""
import numpy as np


def create_dummy_video(path: str, num_frames: int = 15, width: int = 640, height: int = 480, fps: int = 15) -> str:
    """Create a minimal valid mp4 video file for pipeline testing."""
    import cv2

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(path, fourcc, fps, (width, height))
    for i in range(num_frames):
        frame = np.ones((height, width, 3), dtype=np.uint8) * 128
        cv2.putText(
            frame,
            f"Test Frame {i+1}",
            (50, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            1.0,
            (255, 255, 255),
            2,
        )
        out.write(frame)
    out.release()
    return path
