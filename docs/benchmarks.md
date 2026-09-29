# Performance & Resource Benchmarks

## 1. Target Hardware Specifications
- **Target Platform**: Standard Laptop / Edge Device (x86_64 or ARM64, 4-8 cores, no discrete GPU required).
- **Inference Runtime**: ONNX Runtime (CPU Execution Provider).
- **Target Frame Rate**: $\ge$ 10-15 FPS continuous throughput.
- **Memory Footprint**: < 500 MB RAM for edge pipeline.

## 2. Bandwidth Comparison
| Approach | Stream Specs | Network Throughput |
| :--- | :--- | :--- |
| **Traditional Cloud Video** | 1080p H.264 @ 15 FPS | ~ 2,000 - 4,000 kbps (constant uplink) |
| **Edge AI Event Architecture** | Anonymized JSON Batches | < 1 kbps (~99.9% bandwidth reduction) |

## 3. Storage Efficiency
- Raw 24/7 video: ~ 20-40 GB per camera per day.
- Edge AI Event Store: < 5 MB per camera per day.
