"""Generate synthetic retail video clips for offline CV pipeline testing."""
import math
from pathlib import Path
import numpy as np


def generate_retail_entry_video(output_path: str = "data/sample_retail_entry.mp4", num_frames: int = 150, fps: int = 15) -> str:
    """Generate a synthetic retail entrance video with shoppers crossing a doorway."""
    import cv2

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    width, height = 1280, 720
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    # Define customers: (start_x, start_y, target_x, target_y, start_frame, end_frame, color)
    customers = [
        {"x0": 550, "y0": 100, "x1": 580, "y1": 680, "f_start": 10, "f_end": 100, "color": (220, 100, 50)},
        {"x0": 700, "y0": 680, "x1": 670, "y1": 120, "f_start": 35, "f_end": 125, "color": (50, 180, 80)},
        {"x0": 600, "y0": 80, "x1": 620, "y1": 690, "f_start": 60, "f_end": 145, "color": (80, 80, 230)},
    ]

    for frame_idx in range(num_frames):
        # Background: Store entryway
        img = np.ones((height, width, 3), dtype=np.uint8) * 235
        # Floor pattern
        for y in range(0, height, 80):
            cv2.line(img, (0, y), (width, y), (215, 215, 215), 1)
        for x in range(0, width, 80):
            cv2.line(img, (x, 0), (x, height), (215, 215, 215), 1)

        # Draw Entrance door frame
        cv2.rectangle(img, (400, 50), (880, 680), (180, 180, 180), 3)
        cv2.putText(img, "STORE ENTRANCE", (520, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (80, 80, 80), 2)

        # Virtual Crossing Line (Entry / Exit detection line)
        cv2.line(img, (450, 620), (830, 620), (0, 140, 255), 3)
        cv2.putText(img, "ENTRY / EXIT COUNTING LINE", (470, 645), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 120, 220), 1)

        # Draw customers
        for cust in customers:
            if cust["f_start"] <= frame_idx <= cust["f_end"]:
                alpha = (frame_idx - cust["f_start"]) / (cust["f_end"] - cust["f_start"])
                cx = int(cust["x0"] + alpha * (cust["x1"] - cust["x0"]))
                cy = int(cust["y0"] + alpha * (cust["y1"] - cust["y0"]))

                # Draw body (pedestrian representation)
                cv2.circle(img, (cx, cy - 35), 18, cust["color"], -1)  # Head
                cv2.circle(img, (cx, cy - 35), 18, (40, 40, 40), 2)
                cv2.ellipse(img, (cx, cy + 10), (26, 40), 0, 0, 360, cust["color"], -1)  # Torso
                cv2.ellipse(img, (cx, cy + 10), (26, 40), 0, 0, 360, (40, 40, 40), 2)

        # Info HUD
        cv2.putText(img, f"Frame: {frame_idx + 1}/{num_frames} | Retail Entry Demo", (20, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (40, 40, 40), 2)
        out.write(img)

    out.release()
    return output_path


def generate_queue_checkout_video(output_path: str = "data/sample_queue_checkout.mp4", num_frames: int = 180, fps: int = 15) -> str:
    """Generate a synthetic checkout counter video with customers queuing up."""
    import cv2

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    width, height = 1280, 720
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    # Counters
    counters = [
        {"name": "Counter 1 (Express)", "box": (480, 160, 640, 240), "color": (0, 150, 0)},
        {"name": "Counter 2 (Standard)", "box": (680, 160, 840, 240), "color": (0, 150, 0)},
    ]

    for frame_idx in range(num_frames):
        img = np.ones((height, width, 3), dtype=np.uint8) * 240

        # Draw Counter Desks
        for c in counters:
            bx1, by1, bx2, by2 = c["box"]
            cv2.rectangle(img, (bx1, by1), (bx2, by2), (200, 210, 200), -1)
            cv2.rectangle(img, (bx1, by1), (bx2, by2), (80, 130, 80), 2)
            cv2.putText(img, c["name"], (bx1 - 20, by1 - 15), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (50, 100, 50), 2)

            # Cashier icon
            cashier_x = (bx1 + bx2) // 2
            cv2.circle(img, (cashier_x, by1 - 20), 12, (100, 100, 100), -1)

            # Queue lane guide
            cv2.rectangle(img, (bx1, by2 + 10), (bx2, by2 + 380), (220, 230, 245), 2)

        # Queuing people in Counter 1
        # Slot 1: (560, 280), Slot 2: (560, 360), Slot 3: (560, 440), Slot 4: (560, 520)
        c1_positions = [(560, 280), (560, 360)]
        if frame_idx > 30:
            c1_positions.append((560, 440))
        if frame_idx > 70:
            c1_positions.append((560, 520))

        # Counter 2 positions
        c2_positions = [(760, 280)]
        if frame_idx > 40:
            c2_positions.append((760, 360))

        # Draw people in Counter 1
        for px, py in c1_positions:
            wobble = int(math.sin(frame_idx * 0.2 + px) * 2)
            cv2.circle(img, (px + wobble, py - 30), 16, (200, 80, 50), -1)
            cv2.circle(img, (px + wobble, py - 30), 16, (40, 40, 40), 2)
            cv2.ellipse(img, (px + wobble, py + 10), (22, 35), 0, 0, 360, (200, 80, 50), -1)
            cv2.ellipse(img, (px + wobble, py + 10), (22, 35), 0, 0, 360, (40, 40, 40), 2)

        # Draw people in Counter 2
        for px, py in c2_positions:
            wobble = int(math.cos(frame_idx * 0.2 + py) * 2)
            cv2.circle(img, (px + wobble, py - 30), 16, (50, 120, 220), -1)
            cv2.circle(img, (px + wobble, py - 30), 16, (40, 40, 40), 2)
            cv2.ellipse(img, (px + wobble, py + 10), (22, 35), 0, 0, 360, (50, 120, 220), -1)
            cv2.ellipse(img, (px + wobble, py + 10), (22, 35), 0, 0, 360, (40, 40, 40), 2)

        cv2.putText(img, f"Frame: {frame_idx + 1}/{num_frames} | Queue Prediction Demo (C1: {len(c1_positions)} waiting)",
                    (20, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (40, 40, 40), 2)
        out.write(img)

    out.release()
    return output_path


def generate_shelf_aisle_video(output_path: str = "data/sample_shelf_aisle.mp4", num_frames: int = 150, fps: int = 15) -> str:
    """Generate a synthetic retail aisle video with shelves and browsing customers."""
    import cv2

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    width, height = 1280, 720
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    for frame_idx in range(num_frames):
        img = np.ones((height, width, 3), dtype=np.uint8) * 238

        # Left shelf (Beverages)
        cv2.rectangle(img, (120, 150), (360, 450), (210, 220, 230), -1)
        cv2.rectangle(img, (120, 150), (360, 450), (80, 80, 120), 2)
        cv2.putText(img, "SHELF A: BEVERAGES", (130, 140), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (50, 50, 100), 2)

        # Draw beverage bottles on shelf
        stock_count = 10 if frame_idx < 80 else 3  # Depletes halfway!
        for i in range(stock_count):
            bx = 140 + (i % 5) * 40
            by = 220 + (i // 5) * 80
            cv2.rectangle(img, (bx, by), (bx + 25, by + 50), (60, 160, 230), -1)

        # Right shelf (Snacks)
        cv2.rectangle(img, (880, 150), (1120, 450), (230, 220, 210), -1)
        cv2.rectangle(img, (880, 150), (1120, 450), (120, 80, 80), 2)
        cv2.putText(img, "SHELF B: SNACKS", (890, 140), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (100, 50, 50), 2)

        # Draw snack boxes
        for i in range(8):
            bx = 900 + (i % 4) * 50
            by = 220 + (i // 4) * 80
            cv2.rectangle(img, (bx, by), (bx + 35, by + 45), (230, 140, 50), -1)

        # Customer walking down aisle
        cust_x = int(600 + math.sin(frame_idx * 0.05) * 150)
        cust_y = int(350 + (frame_idx / num_frames) * 200)
        cv2.circle(img, (cust_x, cust_y - 30), 16, (100, 180, 80), -1)
        cv2.circle(img, (cust_x, cust_y - 30), 16, (40, 40, 40), 2)
        cv2.ellipse(img, (cust_x, cust_y + 10), (22, 35), 0, 0, 360, (100, 180, 80), -1)
        cv2.ellipse(img, (cust_x, cust_y + 10), (22, 35), 0, 0, 360, (40, 40, 40), 2)

        cv2.putText(img, f"Frame: {frame_idx + 1}/{num_frames} | Shelf Stock Monitoring Demo",
                    (20, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (40, 40, 40), 2)
        out.write(img)

    out.release()
    return output_path


def generate_all_samples():
    """Generate all 3 sample retail/queue development videos."""
    print("Generating sample 1: retail entrance video...")
    p1 = generate_retail_entry_video()
    print(f"Generated {p1}")

    print("Generating sample 2: checkout queue video...")
    p2 = generate_queue_checkout_video()
    print(f"Generated {p2}")

    print("Generating sample 3: shelf aisle video...")
    p3 = generate_shelf_aisle_video()
    print(f"Generated {p3}")


if __name__ == "__main__":
    generate_all_samples()
