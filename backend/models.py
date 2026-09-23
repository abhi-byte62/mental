"""
SQLAlchemy ORM models for MindBridge.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, Float, String, DateTime, Boolean, Text
from backend.database import Base


class CheckIn(Base):
    __tablename__ = "checkins"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

    # Mood parameters
    mood_label = Column(String(50), nullable=False)
    mood_score = Column(Integer, nullable=False)

    # Lifestyle indicators
    sleep_hours = Column(Float, nullable=False)
    screen_time = Column(Float, nullable=False)
    physical_play = Column(Float, nullable=False)
    school_stress = Column(Integer, nullable=False)

    # NLP Sentiment metrics (Raw journal text is never persisted)
    sentiment_compound = Column(Float, nullable=False, default=0.0)
    sentiment_tone = Column(String(20), nullable=False, default="Neutral")

    # ML Risk Stratification
    risk_tier = Column(Integer, nullable=False, default=0)
    risk_label = Column(String(60), nullable=False)


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

    child_age = Column(Integer, nullable=True, default=11)
    
    # Subscale scores
    internalizing_score = Column(Integer, nullable=False, default=0)
    attention_score = Column(Integer, nullable=False, default=0)
    externalizing_score = Column(Integer, nullable=False, default=0)
    social_score = Column(Integer, nullable=False, default=0)
    total_score = Column(Integer, nullable=False, default=0)

    # Clinical cutoff & categorization (PSC-17 standard: >= 15 indicates psychosocial risk)
    clinical_cutoff_met = Column(Boolean, nullable=False, default=False)
    risk_tier = Column(Integer, nullable=False, default=0)
    risk_label = Column(String(80), nullable=False)

    # Serialized answers for longitudinal audit
    answers_json = Column(Text, nullable=True)
