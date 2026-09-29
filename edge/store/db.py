"""SQLite local store with WAL mode and outbox pattern."""
import json
import sqlite3
import time
import uuid
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Dict, Generator, List, Optional


class EdgeStore:
    """Local SQLite edge database strictly storing anonymous events and outbox messages."""

    def __init__(self, db_path: str = "data/edge_store.db"):
        self.db_path = Path(db_path)
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._init_db()

    @contextmanager
    def _connection(self) -> Generator[sqlite3.Connection, None, None]:
        """Context manager that guarantees connection is closed on exit."""
        conn = sqlite3.connect(str(self.db_path), timeout=10.0)
        conn.row_factory = sqlite3.Row
        try:
            conn.execute("PRAGMA journal_mode = WAL;")
            conn.execute("PRAGMA synchronous = NORMAL;")
            yield conn
            conn.commit()
        finally:
            conn.close()

    def _init_db(self) -> None:
        with self._connection() as conn:
            conn.executescript(
                """
                -- Events table (footfall, line crossing, queue status, shelf alerts)
                CREATE TABLE IF NOT EXISTS events (
                    id TEXT PRIMARY KEY,
                    store_id TEXT NOT NULL,
                    event_type TEXT NOT NULL,
                    payload TEXT NOT NULL,
                    timestamp REAL NOT NULL,
                    created_at REAL NOT NULL
                );

                -- Aggregates table (hourly / 5-min footfall, dwell, wait times)
                CREATE TABLE IF NOT EXISTS aggregates (
                    id TEXT PRIMARY KEY,
                    store_id TEXT NOT NULL,
                    metric_name TEXT NOT NULL,
                    metric_value REAL NOT NULL,
                    window_start REAL NOT NULL,
                    window_end REAL NOT NULL,
                    metadata TEXT
                );

                -- Outbox table for reliable store-and-forward sync
                CREATE TABLE IF NOT EXISTS outbox (
                    id TEXT PRIMARY KEY,
                    store_id TEXT NOT NULL,
                    topic TEXT NOT NULL,
                    payload TEXT NOT NULL,
                    idempotency_key TEXT UNIQUE NOT NULL,
                    status TEXT NOT NULL DEFAULT 'PENDING', -- PENDING, IN_FLIGHT, SENT, FAILED
                    retry_count INTEGER NOT NULL DEFAULT 0,
                    created_at REAL NOT NULL,
                    sent_at REAL
                );

                CREATE INDEX IF NOT EXISTS idx_events_store_timestamp ON events(store_id, timestamp);
                CREATE INDEX IF NOT EXISTS idx_outbox_status ON outbox(status, created_at);
                """
            )

    def record_event(self, store_id: str, event_type: str, payload: Dict[str, Any], timestamp: Optional[float] = None) -> str:
        """Record an anonymous edge event and enqueue into outbox."""
        event_id = str(uuid.uuid4())
        ts = timestamp or time.time()
        payload_str = json.dumps(payload)

        with self._connection() as conn:
            conn.execute(
                """
                INSERT INTO events (id, store_id, event_type, payload, timestamp, created_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (event_id, store_id, event_type, payload_str, ts, time.time()),
            )

            # Stage in outbox with idempotency key
            outbox_id = str(uuid.uuid4())
            conn.execute(
                """
                INSERT INTO outbox (id, store_id, topic, payload, idempotency_key, status, retry_count, created_at)
                VALUES (?, ?, ?, ?, ?, 'PENDING', 0, ?)
                """,
                (outbox_id, store_id, f"retail.events.{event_type}", payload_str, event_id, time.time()),
            )

        return event_id

    def fetch_pending_outbox(self, limit: int = 50) -> List[Dict[str, Any]]:
        """Fetch pending outbox records to send to central cloud API."""
        with self._connection() as conn:
            cursor = conn.execute(
                """
                SELECT id, store_id, topic, payload, idempotency_key, retry_count, created_at
                FROM outbox
                WHERE status = 'PENDING'
                ORDER BY created_at ASC
                LIMIT ?
                """,
                (limit,),
            )
            rows = cursor.fetchall()
            return [dict(row) for row in rows]

    def mark_outbox_sent(self, ids: List[str]) -> None:
        """Mark outbox items as successfully sent."""
        if not ids:
            return
        with self._connection() as conn:
            placeholders = ",".join("?" for _ in ids)
            conn.execute(
                f"""
                UPDATE outbox
                SET status = 'SENT', sent_at = ?
                WHERE id IN ({placeholders})
                """,
                [time.time()] + ids,
            )

    def close(self) -> None:
        """No persistent pool, but provided for explicit lifecycle completion."""
        pass
