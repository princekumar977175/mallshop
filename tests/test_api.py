from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)


def test_health_check():
    """Verify health endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "edge-retail-intelligence"}


def test_status_endpoint():
    """Verify system status endpoint."""
    response = client.get("/api/status")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert data["mode"] == "offline-first"


def test_config_endpoint():
    """Verify config retrieval endpoint."""
    response = client.get("/api/config")
    assert response.status_code == 200
    data = response.json()
    assert data["store_id"] == "store_001"
