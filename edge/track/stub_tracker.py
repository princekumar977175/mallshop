"""Tracking module with anonymous track IDs."""
from dataclasses import dataclass, field
from typing import Dict, List, Tuple
from edge.detect.stub_detector import Detection


@dataclass
class TrackedObject:
    """Represents an anonymized tracked entity."""
    track_id: int
    box: Tuple[int, int, int, int]  # x1, y1, x2, y2
    class_name: str
    centroid: Tuple[int, int]
    history: List[Tuple[int, int]] = field(default_factory=list)
    age_frames: int = 1


class StubTracker:
    """Stub tracker maintaining persistent IDs."""

    def __init__(self):
        self._next_id = 1
        self.tracks: Dict[int, TrackedObject] = {}

    def update(self, detections: List[Detection]) -> List[TrackedObject]:
        """Update tracks given frame detections."""
        current_tracks: List[TrackedObject] = []
        for det in detections:
            x1, y1, x2, y2 = det.box
            cx, cy = (x1 + x2) // 2, (y1 + y2) // 2

            # Stub matching: match to track 1 or increment
            track_id = 1 if 1 in self.tracks else self._next_id
            if track_id not in self.tracks:
                self._next_id += 1
                t = TrackedObject(
                    track_id=track_id,
                    box=det.box,
                    class_name=det.class_name,
                    centroid=(cx, cy),
                    history=[(cx, cy)],
                    age_frames=1,
                )
                self.tracks[track_id] = t
            else:
                t = self.tracks[track_id]
                t.box = det.box
                t.centroid = (cx, cy)
                t.history.append((cx, cy))
                t.age_frames += 1

            current_tracks.append(t)

        return current_tracks
