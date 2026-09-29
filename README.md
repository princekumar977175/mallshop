# Offline-First Edge AI Retail Intelligence Platform

High-performance, privacy-first edge intelligence platform running entirely on local CPU hardware:
- **Shopper Analytics**: Directional virtual line crossing, footfall metrics, dwell time.
- **Queue Intelligence**: Waiting line estimation, cashier service time, and lane opening recommendations.
- **Shelf Monitoring**: Out-of-stock and low-stock detection with debounced alert states.
- **Edge Outbox & SQLite WAL**: 100% offline-tolerant with store-and-forward sync.
- **Zero PII**: No face recognition, no raw video or frame storage.

---

## Quickstart

### 1. Install Dependencies
```bash
make install
# or
pip install -r requirements.txt
```

### 2. Generate Sample Retail Videos
```bash
make samples
# or
python -m sim.video_generator
```
This produces 3 synthetic retail test videos in `data/`:
- `data/sample_retail_entry.mp4`: Entrance door crossing with virtual line.
- `data/sample_queue_checkout.mp4`: Billing counters 1 & 2 with customer queuing.
- `data/sample_shelf_aisle.mp4`: Retail aisle with beverage and snack shelving units.

### 3. Run Pipeline Demo
```bash
make run
# or
python -m edge.pipeline --config configs/store_default.yaml --source data/sample_queue_checkout.mp4 --headless
```

### 4. Run Test Suite
```bash
make test
# or
pytest tests/ -v
```

---

## Directory Structure
```
├── edge/
│   ├── detect/        # YOLO ONNX person & shelf detectors
│   ├── track/         # Persistent anonymous tracking
│   ├── analytics/     # Footfall, dwell, queue, heatmap calculations
│   ├── store/         # SQLite WAL mode database & outbox pattern
│   ├── config.py      # Pydantic models & YAML loader
│   ├── logger.py      # Latency & FPS performance tracking
│   └── pipeline.py    # Main CV edge pipeline runner
├── api/               # FastAPI service (local edge API & central endpoints)
├── dashboard/         # React + Vite live store monitor
├── sim/               # Video generators and data simulation
├── configs/           # Store layout YAML configuration files
├── docs/              # Architecture, Privacy, and Benchmark docs
└── tests/             # Unit and integration test suite
```
