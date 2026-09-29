# Privacy & Compliance Specification

## 1. Privacy-by-Design Principles
1. **Zero Raw Video Retention**:
   - Frames exist only in volatile RAM for inference and are discarded immediately.
   - No camera video or cropped images of individuals are ever saved to disk or transmitted across network interfaces.
2. **Zero Face Recognition or Demographic Profiling**:
   - The computer vision model only detects generic `person` bounding boxes.
   - No facial detection, facial embeddings, age, gender, or biometric identification is performed.
3. **Anonymized Spatial Tokens**:
   - People are tracked solely as temporary integer track IDs (e.g., Track #4) within the active camera session.
   - IDs are destroyed once the individual exits the camera's field of view.
4. **Bandwidth & Data Minimization**:
   - Only anonymized numerical events (timestamp, zone_id, count, dwell_seconds) are queued for sync.
