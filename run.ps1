# PowerShell helper to run edge pipeline on sample video
python -m edge.pipeline --config configs/store_default.yaml --source data/sample_queue_checkout.mp4 --headless --max-frames 60
