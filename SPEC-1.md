# SPEC.md — Edge AI Retail Intelligence Platform (SIH)

## 1. Goal
Build an offline-first retail analytics system that turns camera video into business insights **entirely on local hardware**: shopper analytics, shelf/stock monitoring, and queue prediction, with a live store dashboard. Privacy-first: no faces, no PII, no raw video stored.

## 2. Principles (apply to every phase)
- All inference runs locally. The system must work with the internet disconnected.
- Store only anonymous data: track IDs, coordinates, counts, timestamps. Discard frames after inference.
- Cloud sync is optional, batched, and tolerant of outages (outbox pattern).
- Every phase ends with a runnable demo and passing tests. Do not start the next phase until the current one works.

## 3. Stack
- Python 3.11, OpenCV, Ultralytics YOLO (nano) exported to ONNX, ONNX Runtime, ByteTrack (or supervision library)
- FastAPI + WebSocket, SQLite (WAL mode), pytest
- Frontend: React + Vite + Recharts, Tailwind
- Config: YAML per store (zones, counters, line positions, shelf ROIs)

## 4. Repo layout
```
/edge        # CV pipeline, runs on device
  /detect    # person detector, shelf analyzer
  /track     # tracker, zone logic
  /analytics # footfall, dwell, heatmap, queue
  /store     # SQLite models, outbox
/api         # FastAPI service (local + central)
/dashboard   # React app
/sim         # video/sample generators, POS/inventory mocks
/configs     # store YAML files
/docs        # architecture, privacy, benchmarks
/tests
```

## 5. Phases

### Phase 0 — Scaffold
- Repo layout, dependency management, config loader, logging, Makefile (`make run`, `make test`).
- Download 2–3 sample retail/queue videos for development (or record your own).
- **Done when:** `make test` passes and a video plays through a stub pipeline.

### Phase 1 — Detection + tracking
- Person detection with YOLO-nano via ONNX Runtime; multi-object tracking with stable anonymous IDs.
- Frame skipping and resize to hit target FPS on CPU.
- Log FPS and latency per frame.
- **Done when:** annotated output video shows stable IDs; ≥10 FPS on laptop CPU.

### Phase 2 — Shopper analytics
- Entry/exit counting via virtual line crossing (direction-aware).
- Zone definition (polygons in YAML); per-zone dwell time per track.
- Heatmap accumulation (grid-based) rendered as image overlay.
- Footfall aggregation by hour, day, zone.
- **Done when:** counts match manual counts on sample video within ~10%; heatmap image generated.

### Phase 3 — Queue intelligence
- Count people inside each billing-counter queue polygon.
- Estimate wait time (queue length × rolling avg service time) and service time (time from queue-head to exit).
- Congestion forecast: simple model (exponential smoothing or gradient boosting on queue length, arrival rate, time-of-day) predicting 5–10 min ahead.
- Rule engine: recommend "open counter N" when predicted wait exceeds threshold.
- **Done when:** forecast beats a naive last-value baseline on simulated data; recommendation fires in demo.

### Phase 4 — Shelf monitoring
- Shelf ROIs from config. Detect empty/low-stock via one of: (a) fine-tuned YOLO for "empty slot" class, or (b) fill-ratio via segmentation/edge density vs. a stocked reference image.
- State machine per shelf: OK → LOW → EMPTY with debounce (avoid flicker).
- Planogram compliance (stretch): compare detected product classes/positions vs. expected layout.
- **Done when:** alerts fire on sample images/video of emptied shelf; false alarm rate documented.

### Phase 5 — Edge runtime + offline sync
- Single edge process: pipeline → SQLite (events, aggregates) → outbox table.
- Sync worker pushes batches to central API when online, with retries and idempotency keys.
- Offline test: disable network, run 10 minutes, restore, verify all data arrives once.
- Measure bandwidth: raw video stream vs. JSON events.
- **Done when:** offline/online demo script passes; bandwidth comparison in `/docs/benchmarks.md`.

### Phase 6 — API + integrations
- REST: footfall, dwell, heatmap, queue status, shelf status, alerts, reports.
- WebSocket: live alert and queue stream.
- Mock POS webhook (transactions → conversion indicator = transactions / footfall) and mock inventory feed (cross-check shelf alerts with stock levels).
- Multi-store support: `store_id` on all records; central view aggregates stores.
- **Done when:** OpenAPI docs complete; integration tests pass.

### Phase 7 — Dashboard
- Live view: footfall counter, queue status per counter, active alerts.
- Charts: footfall by hour/zone, dwell by zone, heatmap overlay, queue trend + forecast, shelf status grid.
- KPIs: footfall, conversion indicator, out-of-stock count, avg wait, staff efficiency proxy.
- Daily/weekly report page with PDF or CSV export.
- Multi-store selector.
- **Done when:** dashboard runs against live pipeline and shows alerts within ~2 seconds of an event.

### Phase 8 — Privacy, evaluation, docs
- Privacy doc: what is stored, what is never stored, data flow diagram, retention policy (e.g., 90 days aggregates).
- Evaluation report: detection/tracking accuracy on samples, count error, forecast error vs. baseline, FPS/latency per hardware, bandwidth savings.
- Architecture diagram, deployment guide (small store vs. chain), hardware BOM with rough cost.
- **Done when:** `/docs` complete and numbers reproducible via scripts.

### Phase 9 — Demo polish
- One-command demo script (`make demo`) with sample videos, dashboard, simulated network cut.
- 3-minute demo flow: live analytics → queue alert → shelf alert → network cut → still running → reconnect and sync.
- README with screenshots; presentation deck outline.
- **Done when:** a fresh clone runs the demo end to end.

## 6. Non-goals (for MVP)
- Face recognition, demographics, or any identity tracking.
- Full SKU-level recognition across large catalogs.
- Real ERP integrations (mock only).

## 7. Acceptance checklist
- [ ] Runs fully offline
- [ ] No frames or PII persisted
- [ ] Entry/exit, dwell, heatmap working
- [ ] Queue forecast + counter recommendation working
- [ ] Empty-shelf alerts working
- [ ] Sync after outage verified
- [ ] Dashboard with live alerts and reports
- [ ] Benchmarks and privacy docs written
