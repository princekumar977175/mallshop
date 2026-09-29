import logging
import sys
import time
from collections import deque
from typing import Optional


def get_logger(name: str = "edge", level: int = logging.INFO) -> logging.Logger:
    """Return a configured logger with clean formatted output."""
    logger = logging.getLogger(name)
    if not logger.handlers:
        logger.setLevel(level)
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(level)
        formatter = logging.Formatter(
            fmt="[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    return logger


class LatencyTracker:
    """Tracks latency and FPS over a rolling window."""

    def __init__(self, window_size: int = 30):
        self.window_size = window_size
        self.frame_durations = deque(maxlen=window_size)
        self.total_frames = 0
        self._start_time: Optional[float] = None
        self._last_frame_time: Optional[float] = None

    def start_frame(self) -> None:
        """Mark start of frame processing."""
        self._start_time = time.perf_counter()

    def end_frame(self) -> float:
        """Mark end of frame processing, returns latency in milliseconds."""
        if self._start_time is None:
            return 0.0
        elapsed = time.perf_counter() - self._start_time
        self.frame_durations.append(elapsed)
        self.total_frames += 1
        self._last_frame_time = elapsed
        return elapsed * 1000.0

    @property
    def fps(self) -> float:
        """Current rolling frames per second."""
        if not self.frame_durations:
            return 0.0
        avg_time = sum(self.frame_durations) / len(self.frame_durations)
        return 1.0 / avg_time if avg_time > 0 else 0.0

    @property
    def avg_latency_ms(self) -> float:
        """Average latency in milliseconds over the window."""
        if not self.frame_durations:
            return 0.0
        return (sum(self.frame_durations) / len(self.frame_durations)) * 1000.0

    @property
    def last_latency_ms(self) -> float:
        """Last frame latency in milliseconds."""
        if self._last_frame_time is None:
            return 0.0
        return self._last_frame_time * 1000.0
