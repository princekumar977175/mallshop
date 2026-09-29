"""FastAPI service for local edge metrics and central sync."""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, List
from edge.config import load_config

app = FastAPI(
    title="Edge AI Retail Intelligence API",
    version="0.1.0",
    description="Offline-first retail intelligence system API",
)


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "edge-retail-intelligence"}


@app.get("/api/config")
def get_store_config():
    """Return active store configuration."""
    try:
        cfg = load_config()
        return cfg.model_dump()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/status")
def get_pipeline_status():
    """Return pipeline operating status."""
    return {
        "status": "online",
        "mode": "offline-first",
        "inference_engine": "ONNX Runtime / CPU",
        "privacy": "Strict (no faces, no raw video stored)",
    }
