PYTHON = python

.PHONY: help install samples test run clean

help:
	@echo "Edge AI Retail Intelligence Platform"
	@echo "Commands:"
	@echo "  make install  - Install requirements"
	@echo "  make samples  - Generate sample videos"
	@echo "  make test     - Run pytest suite"
	@echo "  make run      - Run pipeline on sample video"

install:
	$(PYTHON) -m pip install -r requirements.txt

samples:
	$(PYTHON) -m sim.video_generator

test:
	$(PYTHON) -m pytest tests/ -v

run:
	$(PYTHON) -m edge.pipeline --config configs/store_default.yaml --source data/sample_queue_checkout.mp4 --headless --max-frames 45
