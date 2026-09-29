import json
import sqlite3
import tempfile
from pathlib import Path
from edge.store.db import EdgeStore


def test_edge_store_init_and_wal():
    """Verify SQLite initialization and WAL mode."""
    with tempfile.TemporaryDirectory() as tmp_dir:
        db_path = str(Path(tmp_dir) / "test_store.db")
        store = EdgeStore(db_path)

        # Inspect PRAGMA journal_mode
        conn = sqlite3.connect(db_path)
        mode = conn.execute("PRAGMA journal_mode;").fetchone()[0]
        conn.close()

        assert mode.lower() == "wal"


def test_record_event_and_outbox():
    """Verify recording events and automatic outbox staging."""
    with tempfile.TemporaryDirectory() as tmp_dir:
        db_path = str(Path(tmp_dir) / "test_store.db")
        store = EdgeStore(db_path)

        event_payload = {"count": 5, "zone": "entrance"}
        event_id = store.record_event(
            store_id="store_test",
            event_type="footfall_in",
            payload=event_payload,
        )

        assert event_id is not None

        # Verify event in outbox
        pending = store.fetch_pending_outbox(limit=10)
        assert len(pending) == 1
        record = pending[0]
        assert record["store_id"] == "store_test"
        assert record["topic"] == "retail.events.footfall_in"
        assert json.loads(record["payload"]) == event_payload
        assert record["idempotency_key"] == event_id

        # Mark sent
        store.mark_outbox_sent([record["id"]])
        pending_after = store.fetch_pending_outbox(limit=10)
        assert len(pending_after) == 0
