from pathlib import Path
import pytest
from edge.config import load_config, StoreConfig


def test_load_default_config():
    """Verify that default store configuration loads and parses correctly."""
    cfg = load_config("configs/store_default.yaml")
    assert isinstance(cfg, StoreConfig)
    assert cfg.store_id == "store_001"
    assert cfg.name == "Retail Flagship Downtown"
    assert len(cfg.lines) >= 1
    assert len(cfg.zones) >= 2
    assert len(cfg.queues) >= 2
    assert len(cfg.shelves) >= 2


def test_config_missing_file():
    """Verify that non-existent config path raises FileNotFoundError."""
    with pytest.raises(FileNotFoundError):
        load_config("configs/non_existent.yaml")


def test_config_structure_validation():
    """Verify specific attributes and sub-configs."""
    cfg = load_config("configs/store_default.yaml")
    line = cfg.lines[0]
    assert line.id == "entrance_main"
    assert line.entry_direction == "down"

    q = cfg.queues[0]
    assert q.counter_id == "counter_1"
    assert q.target_wait_seconds == 120

    s = cfg.shelves[0]
    assert s.shelf_id == "shelf_beverages"
    assert s.low_stock_ratio == 0.35
