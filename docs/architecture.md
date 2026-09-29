# Edge AI Retail Intelligence Platform — Architecture

## 1. System Overview
The Edge AI Retail Intelligence Platform operates on local edge hardware directly within the store environment. It processes incoming camera streams in real-time, extracts privacy-preserving spatial-temporal analytics, persists data to a local transactional SQLite store with WAL mode, and synchronizes aggregated intelligence with a central cloud API when network connectivity is available.

```
+--------------------+        +---------------------+        +--------------------+
| Local Camera Stream| ---->  |   CV Edge Pipeline  | ---->  | SQLite (WAL Mode)  |
| (RTSP / USB / MP4) |        | (YOLO ONNX + Track) |        | (Events + Outbox)  |
+--------------------+        +---------------------+        +--------------------+
                                         |                             |
                                         v                             v
                              +---------------------+        +--------------------+
                              |  Realtime Analytics |        | Outbox Sync Worker |
                              | (Footfall/Queue/ROI)|        | (Store & Forward)  |
                              +---------------------+        +--------------------+
                                         |                             |
                                         v                             v
                              +---------------------+        +--------------------+
                              | FastAPI Local Server|        | Central Cloud API  |
                              |   (WebSocket/REST)  |        | (Multi-Store Agg.) |
                              +---------------------+        +--------------------+
                                         |
                                         v
                              +---------------------+
                              |   React Dashboard   |
                              +---------------------+
```

## 2. Core Components
1. **Video Ingestion & Preprocessing (`edge/pipeline.py`)**:
   - Camera decoding via OpenCV.
   - Frame skipping and resolution scaling to match target inference frame rate on CPU hardware.
2. **Object Detection (`edge/detect`)**:
   - YOLO-nano exported to ONNX format.
   - High-throughput execution using ONNX Runtime CPU EP.
3. **Multi-Object Tracking (`edge/track`)**:
   - Stable anonymous tracking IDs across frames (ByteTrack / centroid Kalman filtering).
4. **Spatial Analytics Engine (`edge/analytics`)**:
   - Virtual line crossing for directional footfall (In / Out).
   - Polygon ROI testing for dwell time and congestion.
   - Queue wait-time prediction and service-time estimation.
   - Shelf stock level / empty slot evaluation.
5. **Offline Store & Outbox (`edge/store`)**:
   - Local SQLite database operating in WAL (Write-Ahead Logging) mode.
   - Outbox pattern for reliable, idempotent sync during intermittent network availability.
