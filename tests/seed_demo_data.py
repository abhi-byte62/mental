"""
Seed demo data into the running MindBridge platform.
"""

import json
import urllib.request

BASE = "http://127.0.0.1:8000/api"


def post(endpoint, data):
    req = urllib.request.Request(
        f"{BASE}{endpoint}",
        data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    res = urllib.request.urlopen(req)
    return json.loads(res.read().decode("utf-8"))


def seed_all():
    print("--- 1. Seeding 14-Day Longitudinal Check-in History ---")
    r1 = post("/seed-demo", {"scenario": "balanced", "n_days": 14})
    print("   ->", r1.get("message"))

    print("\n--- 2. Seeding Standardized PSC-17 Pediatric Clinical Screeners ---")
    
    # 1. Healthy / Low-Risk Child (Age 10)
    a1 = {
        "child_age": 10,
        "answers": {str(i): 1 if (i % 4 == 0) else 0 for i in range(1, 18)}
    }
    r_a1 = post("/assessment/submit", a1)
    print(f"   -> Assessment 1 (Age 10): Score {r_a1['total_score']}/34 | {r_a1['risk_label']}")

    # 2. Elevated Internalizing / Anxiety (Age 12)
    a2 = {
        "child_age": 12,
        "answers": {
            "1": 2, "2": 1, "3": 2, "4": 2, "5": 2,  # High internalizing (score = 9/10)
            "6": 1, "7": 1, "8": 0, "9": 0, "10": 1,
            "11": 0, "12": 0, "13": 0, "14": 0,
            "15": 1, "16": 1, "17": 0
        }
    }
    r_a2 = post("/assessment/submit", a2)
    print(f"   -> Assessment 2 (Age 12): Score {r_a2['total_score']}/34 | {r_a2['risk_label']}")

    # 3. Elevated Attention / ADHD Focus Indicators (Age 8)
    a3 = {
        "child_age": 8,
        "answers": {
            "1": 0, "2": 0, "3": 1, "4": 0, "5": 0,
            "6": 2, "7": 2, "8": 2, "9": 1, "10": 2,  # High attention (score = 9/10)
            "11": 1, "12": 0, "13": 1, "14": 0,
            "15": 1, "16": 0, "17": 1
        }
    }
    r_a3 = post("/assessment/submit", a3)
    print(f"   -> Assessment 3 (Age 8): Score {r_a3['total_score']}/34 | {r_a3['risk_label']}")

    # 4. Dashboard Summary
    dash = json.loads(urllib.request.urlopen(f"{BASE}/dashboard").read().decode("utf-8"))
    print("\n--- 3. Platform Live Status ---")
    print(f"   -> Total Longitudinal Check-ins: {dash['total_checkins']}")
    print(f"   -> Average Mood: {dash['avg_mood']} | Avg Sleep: {dash['avg_sleep']} hrs")
    print(f"   -> Tier Distribution: {dash['tier_distribution']}")
    print("\nDemo data loaded successfully! Open http://localhost:5173/ in your browser.")


if __name__ == "__main__":
    seed_all()
