"""
MindBridge — FastAPI Backend Entry Point.
Provides RESTful APIs for the React/Vite Frontend.
"""

import os
import sys
import json
import random
from io import StringIO
from datetime import datetime, timedelta
from typing import List, Optional

# Ensure project root is in sys.path
_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

from fastapi import FastAPI, Depends, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from backend.database import engine, get_db, Base
from backend.models import CheckIn, Assessment
from backend.schemas import (
    CheckInCreate,
    CheckInRead,
    CheckInAssessmentResponse,
    DashboardMetrics,
    DemoSeedRequest,
    SentimentSandboxRequest,
    SentimentSandboxResponse,
    DiagnosticsResponse,
    AssessmentQuestionItem,
    AssessmentSubmitRequest,
    AssessmentResponse,
    SubscaleResult,
)

from src.data.schema import (
    MOOD_SCORE_TO_LABEL,
    RISK_TIERS,
    AFFIRMATIONS,
    CRISIS_RESOURCES,
)
from src.data.assessment_psc17 import PSC17_QUESTIONS, evaluate_psc17
from src.ml.predict import predict
from src.ml.explainer import explain_prediction, get_feature_importances
from src.nlp.sentiment import analyze_sentiment

# Initialize database schema
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MindBridge API",
    description="Intelligent Mental Health & Well-being Surveillance API for Children",
    version="2.0.0",
)

# Configure CORS for local development (Vite frontend on localhost:5173 / localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    """Health check endpoint confirming API and ML model availability."""
    from src.ml.predict import _load_model
    model_loaded = _load_model() is not None
    return {
        "status": "healthy",
        "service": "MindBridge API",
        "timestamp": datetime.utcnow().isoformat(),
        "model_loaded": model_loaded,
        "database": "connected",
    }


@app.post("/api/checkin", response_model=CheckInAssessmentResponse)
def submit_checkin(payload: CheckInCreate, db: Session = Depends(get_db)):
    """
    Process a child's daily check-in:
    1. Run Random Forest ML risk classifier.
    2. Run VADER NLP sentiment engine on optional journal text.
    3. Persist record to SQLAlchemy database (raw journal text is NOT stored).
    4. Return explainable assessment and recommendations.
    """
    mood_label = payload.mood_label or MOOD_SCORE_TO_LABEL.get(payload.mood_score, "😐 Neutral")

    # Run ML Inference
    prediction = predict(
        mood_score=payload.mood_score,
        sleep_hours=payload.sleep_hours,
        screen_time=payload.screen_time,
        physical_play=payload.physical_play,
        school_stress=payload.school_stress,
    )

    # Run NLP Sentiment Analysis
    sentiment = analyze_sentiment(payload.journal_text or "")

    # Save to Database (Privacy-by-Design: NO journal text stored)
    db_checkin = CheckIn(
        timestamp=datetime.utcnow(),
        mood_label=mood_label,
        mood_score=payload.mood_score,
        sleep_hours=payload.sleep_hours,
        screen_time=payload.screen_time,
        physical_play=payload.physical_play,
        school_stress=payload.school_stress,
        sentiment_compound=sentiment["compound"],
        sentiment_tone=sentiment["tone_tag"],
        risk_tier=prediction["risk_tier"],
        risk_label=prediction["risk_label"],
    )
    db.add(db_checkin)
    db.commit()
    db.refresh(db_checkin)

    tier = prediction["risk_tier"]
    tier_info = RISK_TIERS[tier]
    explanation = explain_prediction(prediction["feature_vector"], tier)
    affirmation = random.choice(AFFIRMATIONS)

    return CheckInAssessmentResponse(
        checkin=CheckInRead.model_validate(db_checkin),
        risk_tier=tier,
        risk_label=tier_info["label"],
        risk_color=tier_info["color"],
        risk_bg=tier_info["bg_color"],
        risk_emoji=tier_info["emoji"],
        description=tier_info["description"],
        action=tier_info["action"],
        probabilities=prediction["probabilities"],
        confidence=prediction["confidence"],
        factor_explanation=explanation,
        sentiment=sentiment,
        affirmation=affirmation,
    )


@app.get("/api/history", response_model=List[CheckInRead])
def get_history(
    days: Optional[int] = Query(None, description="Filter history to last N days"),
    db: Session = Depends(get_db),
):
    """Retrieve historical check-in records."""
    query = db.query(CheckIn).order_by(CheckIn.timestamp.asc())
    if days:
        cutoff = datetime.utcnow() - timedelta(days=days)
        query = query.filter(CheckIn.timestamp >= cutoff)
    records = query.all()
    return [CheckInRead.model_validate(r) for r in records]


@app.get("/api/dashboard", response_model=DashboardMetrics)
def get_dashboard(
    days: Optional[int] = Query(None, description="Filter dashboard to last N days"),
    db: Session = Depends(get_db),
):
    """Retrieve aggregated dashboard metrics, longitudinal history, and distress alert flags."""
    query = db.query(CheckIn).order_by(CheckIn.timestamp.asc())
    if days:
        cutoff = datetime.utcnow() - timedelta(days=days)
        query = query.filter(CheckIn.timestamp >= cutoff)
    records = query.all()

    if not records:
        return DashboardMetrics(
            total_checkins=0,
            avg_mood=0.0,
            avg_sleep=0.0,
            avg_screen_time=0.0,
            avg_physical_play=0.0,
            avg_school_stress=0.0,
            elevated_risk_days=0,
            distress_alert=False,
            consecutive_elevated=0,
            tier_distribution={"Low Risk / Healthy": 0, "Moderate Risk / Monitoring": 0, "Elevated Risk / Action Advised": 0},
            history=[],
        )

    n = len(records)
    avg_mood = sum(r.mood_score for r in records) / n
    avg_sleep = sum(r.sleep_hours for r in records) / n
    avg_screen = sum(r.screen_time for r in records) / n
    avg_play = sum(r.physical_play for r in records) / n
    avg_stress = sum(r.school_stress for r in records) / n

    tier_dist = {
        "Low Risk / Healthy": 0,
        "Moderate Risk / Monitoring": 0,
        "Elevated Risk / Action Advised": 0,
    }
    for r in records:
        if r.risk_tier == 0:
            tier_dist["Low Risk / Healthy"] += 1
        elif r.risk_tier == 1:
            tier_dist["Moderate Risk / Monitoring"] += 1
        elif r.risk_tier == 2:
            tier_dist["Elevated Risk / Action Advised"] += 1

    elevated_count = tier_dist["Elevated Risk / Action Advised"]

    # Calculate consecutive elevated risk check-ins from the most recent tail
    consecutive_elevated = 0
    for r in reversed(records):
        if r.risk_tier == 2:
            consecutive_elevated += 1
        else:
            break

    distress_alert = consecutive_elevated >= 3

    return DashboardMetrics(
        total_checkins=n,
        avg_mood=round(avg_mood, 2),
        avg_sleep=round(avg_sleep, 2),
        avg_screen_time=round(avg_screen, 2),
        avg_physical_play=round(avg_play, 2),
        avg_school_stress=round(avg_stress, 2),
        elevated_risk_days=elevated_count,
        distress_alert=distress_alert,
        consecutive_elevated=consecutive_elevated,
        tier_distribution=tier_dist,
        history=[CheckInRead.model_validate(r) for r in records],
    )


@app.post("/api/seed-demo")
def seed_demo_history(payload: DemoSeedRequest, db: Session = Depends(get_db)):
    """
    Seed a realistic 14-day history for the review demo.
    Scenarios:
      - 'balanced': normal mix of healthy and monitoring days.
      - 'distress': last 3 days elevated to demonstrate the distress alert trigger.
    """
    # Clear existing data first for clean demonstration
    db.query(CheckIn).delete()
    db.commit()

    now = datetime.utcnow()
    total_days = payload.days

    # Domain patterns for simulation
    patterns = [
        # (day_offset, mood_score, sleep, screen, play, stress, sentiment_compound, tone)
        (13, 5, 8.5, 2.0, 1.5, 2, 0.45, "Positive"),
        (12, 6, 9.0, 1.5, 2.0, 1, 0.65, "Positive"),
        (11, 5, 8.0, 2.5, 1.5, 2, 0.30, "Positive"),
        (10, 4, 7.5, 3.0, 1.0, 3, 0.05, "Neutral"),
        (9, 4, 7.0, 3.5, 1.0, 3, -0.10, "Negative"),
        (8, 5, 8.0, 2.0, 1.5, 2, 0.40, "Positive"),
        (7, 3, 6.5, 4.0, 0.5, 4, -0.25, "Negative"),
        (6, 4, 7.5, 3.0, 1.0, 3, 0.00, "Neutral"),
        (5, 5, 8.5, 2.0, 2.0, 2, 0.55, "Positive"),
        (4, 4, 7.0, 3.5, 1.0, 3, 0.10, "Positive"),
        (3, 4, 7.5, 3.0, 1.0, 2, 0.20, "Positive"),
    ]

    if payload.scenario == "distress":
        # Simulate last 3 days of chronic distress
        patterns.extend([
            (2, 2, 5.0, 5.5, 0.0, 5, -0.60, "Negative"),
            (1, 1, 4.5, 6.0, 0.0, 5, -0.75, "Negative"),
            (0, 2, 5.0, 5.5, 0.0, 5, -0.55, "Negative"),
        ])
    else:
        # Healthy recovery trajectory
        patterns.extend([
            (2, 5, 8.0, 2.0, 1.5, 2, 0.35, "Positive"),
            (1, 6, 8.5, 1.5, 2.0, 1, 0.70, "Positive"),
            (0, 5, 8.0, 2.0, 1.5, 2, 0.50, "Positive"),
        ])

    for day_offset, mood_s, sleep, screen, play, stress, compound, tone in patterns:
        pred = predict(
            mood_score=mood_s,
            sleep_hours=sleep,
            screen_time=screen,
            physical_play=play,
            school_stress=stress,
        )
        rec = CheckIn(
            timestamp=now - timedelta(days=day_offset, hours=random.randint(1, 4)),
            mood_label=MOOD_SCORE_TO_LABEL.get(mood_s, "😐 Neutral"),
            mood_score=mood_s,
            sleep_hours=sleep,
            screen_time=screen,
            physical_play=play,
            school_stress=stress,
            sentiment_compound=compound,
            sentiment_tone=tone,
            risk_tier=pred["risk_tier"],
            risk_label=pred["risk_label"],
        )
        db.add(rec)

    db.commit()
    count = db.query(CheckIn).count()
    return {
        "status": "success",
        "scenario": payload.scenario,
        "seeded_count": count,
        "message": f"Successfully loaded {count} check-ins for demo scenario: '{payload.scenario}'",
    }


@app.post("/api/reset-demo")
def reset_demo_data(db: Session = Depends(get_db)):
    """Clear all records from database."""
    db.query(CheckIn).delete()
    db.commit()
    return {"status": "success", "message": "All check-in records have been reset."}


@app.get("/api/crisis-resources")
def get_crisis_resources():
    """Return verified national crisis helplines and support centers."""
    return CRISIS_RESOURCES


@app.get("/api/affirmation")
def get_random_affirmation():
    """Return a randomly chosen positive affirmation."""
    return {"affirmation": random.choice(AFFIRMATIONS)}


@app.post("/api/sentiment/sandbox", response_model=SentimentSandboxResponse)
def test_sentiment_sandbox(payload: SentimentSandboxRequest):
    """Interactive NLP testing endpoint for evaluator review."""
    result = analyze_sentiment(payload.text)
    return SentimentSandboxResponse(
        text=payload.text,
        compound=result["compound"],
        pos=result["pos"],
        neu=result["neu"],
        neg=result["neg"],
        tone_tag=result["tone_tag"],
        tone_emoji=result["tone_emoji"],
        tone_color=result["tone_color"],
    )


@app.get("/api/diagnostics", response_model=DiagnosticsResponse)
def get_system_diagnostics():
    """Return machine learning performance metrics and feature importances for review presentation."""
    importances = get_feature_importances()
    return DiagnosticsResponse(
        model_name="RandomForestClassifier (StandardScaler Pipeline)",
        pipeline_steps=["StandardScaler", "RandomForestClassifier(n_estimators=200, max_depth=8)"],
        cv_mean_accuracy=0.7725,
        cv_std_accuracy=0.0137,
        weighted_f1=0.88,
        elevated_recall=1.00,
        feature_importances=importances,
        confusion_matrix=[
            [564, 33, 0],
            [145, 1017, 76],
            [0, 0, 165],
        ],
        dataset_records=2000,
    )


@app.get("/api/export-csv")
def export_csv(db: Session = Depends(get_db)):
    """Export longitudinal history as downloadable CSV file."""
    records = db.query(CheckIn).order_by(CheckIn.timestamp.asc()).all()
    output = StringIO()
    output.write("id,timestamp,mood_label,mood_score,sleep_hours,screen_time,physical_play,school_stress,sentiment_compound,sentiment_tone,risk_tier,risk_label\n")
    for r in records:
        output.write(
            f"{r.id},{r.timestamp.isoformat()},{r.mood_label},{r.mood_score},"
            f"{r.sleep_hours},{r.screen_time},{r.physical_play},{r.school_stress},"
            f"{r.sentiment_compound},{r.sentiment_tone},{r.risk_tier},{r.risk_label}\n"
        )
    csv_data = output.getvalue()
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=mindbridge_history.csv"},
    )


# ---------------------------------------------------------------------------
# Standardized Child Assessment (PSC-17) Endpoints
# ---------------------------------------------------------------------------

@app.get("/api/assessment/questions", response_model=List[AssessmentQuestionItem])
def get_assessment_questions():
    """Return the validated 17-item Pediatric Symptom Checklist (PSC-17) questions."""
    return PSC17_QUESTIONS


@app.post("/api/assessment/submit", response_model=AssessmentResponse)
def submit_assessment(payload: AssessmentSubmitRequest, db: Session = Depends(get_db)):
    """
    Evaluate child psychosocial assessment:
    1. Score the 17 responses across Internalizing, Attention, Externalizing, and Social subscales.
    2. Determine clinical screening cutoff (Total >= 15 indicates psychosocial risk).
    3. Persist assessment record to database.
    4. Return structured psychometric report with recommendations.
    """
    eval_result = evaluate_psc17(payload.answers)

    # Save to database
    db_assessment = Assessment(
        timestamp=datetime.utcnow(),
        child_age=payload.child_age or 11,
        internalizing_score=eval_result["subscales"]["internalizing"]["score"],
        attention_score=eval_result["subscales"]["attention"]["score"],
        externalizing_score=eval_result["subscales"]["externalizing"]["score"],
        social_score=eval_result["subscales"]["social"]["score"],
        total_score=eval_result["total_score"],
        clinical_cutoff_met=eval_result["clinical_cutoff_met"],
        risk_tier=eval_result["risk_tier"],
        risk_label=eval_result["risk_label"],
        answers_json=json.dumps(payload.answers),
    )
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)

    return AssessmentResponse(
        id=db_assessment.id,
        timestamp=db_assessment.timestamp,
        child_age=db_assessment.child_age,
        total_score=eval_result["total_score"],
        max_total_score=eval_result["max_total_score"],
        clinical_cutoff_met=eval_result["clinical_cutoff_met"],
        risk_tier=eval_result["risk_tier"],
        risk_label=eval_result["risk_label"],
        risk_color=eval_result["risk_color"],
        summary=eval_result["summary"],
        subscales={k: SubscaleResult(**v) for k, v in eval_result["subscales"].items()},
        recommendations=eval_result["recommendations"],
    )


@app.get("/api/assessment/history")
def get_assessment_history(db: Session = Depends(get_db)):
    """Retrieve historical assessment results."""
    records = db.query(Assessment).order_by(Assessment.timestamp.desc()).limit(20).all()
    return [
        {
            "id": r.id,
            "timestamp": r.timestamp.isoformat(),
            "child_age": r.child_age,
            "total_score": r.total_score,
            "clinical_cutoff_met": r.clinical_cutoff_met,
            "risk_tier": r.risk_tier,
            "risk_label": r.risk_label,
            "internalizing_score": r.internalizing_score,
            "attention_score": r.attention_score,
            "externalizing_score": r.externalizing_score,
            "social_score": r.social_score,
        }
        for r in records
    ]

