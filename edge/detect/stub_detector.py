"""Detection module for person and shelf monitoring."""
from dataclasses import dataclass
from typing import List, Tuple


@dataclass
class Detection:
    """Represents a bounding box detection."""
    box: Tuple[int, int, int, int]  # x1, y1, x2, y2
    confidence: float
    class_id: int
    class_name: str


class StubDetector:
    """Stub person detector for Phase 0 scaffolding."""

    def __init__(self, confidence_threshold: float = 0.4):
        self.confidence_threshold = confidence_threshold

    def detect(self, frame) -> List[Detection]:
        """Perform stub detection on frame."""
        # For Phase 0 stub pipeline, return simulated or basic detections
        h, w = frame.shape[:2]
        # Return a simulated bounding box near center
        center_x, center_y = w // 2, h // 2
        return [
            Detection(
                box=(center_x - 30, center_y - 80, center_x + 30, center_y + 80),
                confidence=0.92,
                class_id=0,
                class_name="person",
            )
        ]
