"""Utility to download public domain / benchmark retail & queue videos."""
import urllib.request
from pathlib import Path

# Sample public CC0/benchmark video URLs (lightweight clips)
SAMPLE_URLS = {
    "retail_surveillance_1.mp4": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
}


def download_sample_videos(target_dir: str = "data") -> None:
    """Download sample video clips to target directory if reachable."""
    dest_path = Path(target_dir)
    dest_path.mkdir(parents=True, exist_ok=True)

    for filename, url in SAMPLE_URLS.items():
        out_file = dest_path / filename
        if out_file.exists():
            print(f"Sample already exists: {out_file}")
            continue
        try:
            print(f"Downloading {filename} from {url}...")
            urllib.request.urlretrieve(url, str(out_file))
            print(f"Successfully saved {out_file}")
        except Exception as e:
            print(f"Could not download {filename} (offline mode active): {e}")


if __name__ == "__main__":
    download_sample_videos()
