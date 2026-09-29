"""Analytics module for footfall, dwell, queue, and heatmaps."""
from dataclasses import dataclass, field
from typing import Dict, List, Optional
from edge.config import StoreConfig
from edge.track.stub_tracker import TrackedObject


@dataclass
class AnalyticsSnapshot:
    """Snapshot of store intelligence metrics for a single frame or time window."""
    timestamp: float
    total_in: int = 0
    total_out: int = 0
    active_occupancy: int = 0
    queue_counts: Dict[str, int] = field(default_factory=dict)
    zone_dwells: Dict[str, float] = field(default_factory=dict)
    shelf_alerts: List[Dict[str, str]] = field(default_factory=list)


class StubAnalytics:
    """Stub analytics engine for Phase 0."""

    def __init__(self, config: StoreConfig):
        self.config = config
        self.total_in = 0
        self.total_out = 0

    def process(self, tracks: List[TrackedObject], timestamp: float) -> AnalyticsSnapshot:
        """Process active tracks and return analytics snapshot."""
        # Active occupancy is count of active tracks
        active_occupancy = len(tracks)

        # Stub counts
        queue_counts = {q.counter_id: 0 for q in self.config.queues}
        zone_dwells = {z.id: 0.0 for z in self.config.zones}

        return AnalyticsSnapshot(
            timestamp=timestamp,
            total_in=self.total_in,
            total_out=self.total_out,
            active_occupancy=active_occupancy,
            queue_counts=queue_counts,
            zone_dwells=zone_dwells,
        )
