"""
End-to-End System Integration Verification Script for MindBridge.
Tests all endpoints, ML risk predictions, VADER NLP sentiment, PSC-17 screener evaluations,
and database persistence.
"""

import json
import urllib.request

BASE_URL = "http://127.0.0.1:8000/api"


def request(endpoint: str, method: str = "GET", data: dict = None) -> dict:
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(url, method=method)
    if data:
        req.add_header("Content-Type", "application/json")
        body = json.dumps(data).encode("utf-8")
    else:
        body = None

    resp = urllib.request.urlopen(req, data=body, timeout=5)
    return json.loads(resp.read().decode("utf-8"))


def run_checks():
    print("=================================================================")
    print("      MINDBRIDGE FULL SYSTEM & PIPELINE VERIFICATION REPORT      ")
    print("=================================================================\n")

    # 1. Health
    health = request("/health")
    print(f"[1] Backend Health & ML Loader:")
    print(f"    Status: {health.get('status')} | ML Pipeline Loaded: {health.get('model_loaded')} | DB: {health.get('database')}")
    assert health.get("status") == "healthy"
    assert health.get("model_loaded") is True

    # 2. PSC-17 Questionnaire
    questions = request("/assessment/questions")
    print(f"\n[2] Standardized PSC-17 Catalog:")
    print(f"    Total items: {len(questions)} (Gardner et al., 1999 validated screener)")
    assert len(questions) == 17

    # 3. PSC-17 Submission & Scoring
    answers = {str(i): 2 if i <= 5 else (1 if 6 <= i <= 10 else 0) for i in range(1, 18)}
    assess_eval = request("/assessment/submit", method="POST", data={"child_age": 11, "answers": answers})
    print(f"\n[3] PSC-17 Diagnostic Evaluation:")
    print(f"    Total Score: {assess_eval['total_score']}/{assess_eval['max_total_score']}")
    print(f"    Clinical Cutoff Met: {assess_eval['clinical_cutoff_met']}")
    print(f"    Risk Classification: {assess_eval['risk_label']} (Tier {assess_eval['risk_tier']})")
    print(f"    Internalizing Flagged: {assess_eval['subscales']['internalizing']['flagged']} ({assess_eval['subscales']['internalizing']['score']}/10)")
    print(f"    Attention Flagged: {assess_eval['subscales']['attention']['flagged']} ({assess_eval['subscales']['attention']['score']}/10)")
    print(f"    Recommendations Count: {len(assess_eval['recommendations'])}")
    assert assess_eval["subscales"]["internalizing"]["flagged"] is True

    # 4. Daily Check-in & Random Forest Inference
    checkin_data = {
        "mood_score": 1,
        "sleep_hours": 5.0,
        "screen_time": 6.5,
        "physical_play": 0.5,
        "school_stress": 5,
        "journal_text": "I feel completely exhausted and lonely today."
    }
    checkin_res = request("/checkin", method="POST", data=checkin_data)
    print(f"\n[4] Daily Check-in ML & NLP Inference:")
    print(f"    Predicted Tier: {checkin_res['risk_tier']} ({checkin_res['risk_label']})")
    print(f"    Model Confidence: {round(checkin_res['confidence'] * 100, 1)}%")
    print(f"    NLP Sentiment Tone: {checkin_res['sentiment']['tone_tag']} (Compound: {checkin_res['sentiment']['compound']})")
    print(f"    Factor Explanations: {checkin_res['factor_explanation'][:80].encode('ascii', 'ignore').decode()}...")
    assert checkin_res["risk_tier"] == 2

    # 5. Demo Seeding
    seed = request("/seed-demo", method="POST", data={"scenario": "balanced", "n_days": 14})
    print(f"\n[5] Synthetic Longitudinal Seeding:")
    print(f"    Result: {seed.get('message')}")

    # 6. Guardian Dashboard
    dashboard = request("/dashboard")
    print(f"\n[6] Guardian Analytics & Surveillance Dashboard:")
    print(f"    Total Check-ins Logged: {dashboard['total_checkins']}")
    print(f"    Average Mood: {dashboard['avg_mood']} | Avg Sleep: {dashboard['avg_sleep']} hrs | Avg Screen: {dashboard['avg_screen_time']} hrs")
    print(f"    Risk Stratification Breakdown: {dashboard['tier_distribution']}")
    assert dashboard["total_checkins"] >= 14

    # 7. Crisis Helplines Directory
    crisis = request("/crisis-resources")
    print(f"\n[7] Crisis Helplines & Verified Support Directory:")
    for c in crisis:
        print(f"    - {c['name']} (Hotline: {c['number']})")
    assert len(crisis) >= 4

    print("\n=================================================================")
    print("     ALL VERIFICATION CHECKS PASSED SUCCESSFULLY WITH 100%       ")
    print("=================================================================")


if __name__ == "__main__":
    run_checks()
