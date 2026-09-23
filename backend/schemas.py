"""
Pydantic schemas for data validation and API contract definition.
"""

from datetime import datetime
from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field


class CheckInCreate(BaseModel):
    mood_score: int = Field(..., ge=1, le=6, description="Mood score from 1 (Frustrated) to 6 (Joyful)")
    mood_label: Optional[str] = Field(None, description="Optional label, e.g., '😄 Joyful'")
    sleep_hours: float = Field(..., ge=0.0, le=24.0, description="Hours of sleep last night")
    screen_time: float = Field(..., ge=0.0, le=24.0, description="Hours of recreational screen time")
    physical_play: float = Field(..., ge=0.0, le=24.0, description="Hours of physical play/exercise")
    school_stress: int = Field(..., ge=1, le=5, description="School stress level 1-5")
    journal_text: Optional[str] = Field("", description="Optional reflective journal entry (analyzed in-memory, never persisted)")


class CheckInRead(BaseModel):
    id: int
    timestamp: datetime
    mood_label: str
    mood_score: int
    sleep_hours: float
    screen_time: float
    physical_play: float
    school_stress: int
    sentiment_compound: float
    sentiment_tone: str
    risk_tier: int
    risk_label: str

    class Config:
        from_attributes = True


class CheckInAssessmentResponse(BaseModel):
    checkin: CheckInRead
    risk_tier: int
    risk_label: str
    risk_color: str
    risk_bg: str
    risk_emoji: str
    description: str
    action: str
    probabilities: Dict[str, float]
    confidence: float
    factor_explanation: str
    sentiment: Dict[str, Any]
    affirmation: str


class DashboardMetrics(BaseModel):
    total_checkins: int
    avg_mood: float
    avg_sleep: float
    avg_screen_time: float
    avg_physical_play: float
    avg_school_stress: float
    elevated_risk_days: int
    distress_alert: bool
    consecutive_elevated: int
    tier_distribution: Dict[str, int]
    history: List[CheckInRead]


class DemoSeedRequest(BaseModel):
    scenario: str = Field("balanced", description="'balanced' for general mix, 'distress' to demonstrate distress alert trigger")
    days: int = Field(14, ge=3, le=30, description="Number of days to simulate")


class SentimentSandboxRequest(BaseModel):
    text: str = Field(..., description="Text string to evaluate using VADER NLP")


class SentimentSandboxResponse(BaseModel):
    text: str
    compound: float
    pos: float
    neu: float
    neg: float
    tone_tag: str
    tone_emoji: str
    tone_color: str


class DiagnosticsResponse(BaseModel):
    model_name: str
    pipeline_steps: List[str]
    cv_mean_accuracy: float
    cv_std_accuracy: float
    weighted_f1: float
    elevated_recall: float
    feature_importances: Dict[str, float]
    confusion_matrix: List[List[int]]
    dataset_records: int


# ---------------------------------------------------------------------------
# Standardized Child Assessment (PSC-17) Schemas
# ---------------------------------------------------------------------------

class AssessmentQuestionItem(BaseModel):
    id: int
    text: str
    category: str  # "internalizing" | "attention" | "externalizing" | "social"
    category_title: str
    help_text: Optional[str] = None


class AssessmentSubmitRequest(BaseModel):
    child_age: Optional[int] = Field(11, ge=4, le=18, description="Child age in years")
    answers: Dict[str, int] = Field(..., description="Map of question_id (string) to score (0=Never, 1=Sometimes, 2=Often)")


class SubscaleResult(BaseModel):
    name: str
    score: int
    max_score: int
    cutoff: int
    flagged: bool
    interpretation: str


class AssessmentResponse(BaseModel):
    id: int
    timestamp: datetime
    child_age: Optional[int]
    total_score: int
    max_total_score: int
    clinical_cutoff_met: bool
    risk_tier: int
    risk_label: str
    risk_color: str
    summary: str
    subscales: Dict[str, SubscaleResult]
    recommendations: List[str]
