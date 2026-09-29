from pathlib import Path
from typing import List, Optional, Tuple
import yaml
from pydantic import BaseModel, Field


class VideoConfig(BaseModel):
    source: str = "0"
    target_fps: int = 15
    frame_skip: int = 1
    input_resolution: Tuple[int, int] = (1280, 720)
    inference_resolution: Tuple[int, int] = (640, 640)


class LineConfig(BaseModel):
    id: str
    name: str
    start_point: Tuple[int, int]
    end_point: Tuple[int, int]
    entry_direction: str = "down"  # "up", "down", "left", "right"


class ZoneConfig(BaseModel):
    id: str
    name: str
    polygon: List[Tuple[int, int]]
    min_dwell_seconds: float = 3.0


class QueueConfig(BaseModel):
    counter_id: str
    name: str
    polygon: List[Tuple[int, int]]
    service_point: Optional[Tuple[int, int]] = None
    target_wait_seconds: int = 120
    max_recommended_queue: int = 3


class ShelfConfig(BaseModel):
    shelf_id: str
    name: str
    category: str
    roi: Tuple[int, int, int, int]  # [x, y, w, h]
    expected_stock: int = 10
    low_stock_ratio: float = 0.35
    empty_stock_ratio: float = 0.10


class StorageConfig(BaseModel):
    db_path: str = "data/edge_store.db"
    sync_batch_size: int = 50
    sync_interval_seconds: int = 30
    retention_days: int = 90


class StoreConfig(BaseModel):
    store_id: str = "store_001"
    name: str = "Default Retail Store"
    version: str = "1.0.0"
    video: VideoConfig = Field(default_factory=VideoConfig)
    lines: List[LineConfig] = Field(default_factory=list)
    zones: List[ZoneConfig] = Field(default_factory=list)
    queues: List[QueueConfig] = Field(default_factory=list)
    shelves: List[ShelfConfig] = Field(default_factory=list)
    storage: StorageConfig = Field(default_factory=StorageConfig)


def load_config(config_path: Optional[str | Path] = None) -> StoreConfig:
    """Load and validate store configuration from a YAML file."""
    if config_path is None:
        # Default fallback
        config_path = Path("configs/store_default.yaml")
    else:
        config_path = Path(config_path)

    if not config_path.exists():
        raise FileNotFoundError(f"Configuration file not found: {config_path}")

    with open(config_path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f) or {}

    return StoreConfig(**data)
