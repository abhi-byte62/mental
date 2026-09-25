"""
Authentication and Authorization Module for MindBridge.
Provides password hashing, JWT/token management, and pre-seeded demo user catalogs.
"""

import hashlib
import hmac
import secrets
from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Session
from backend.models import User

# Secret key for signature generation
AUTH_SECRET = "mindbridge-secret-key-pediatric-surveillance-2026"


def hash_password(password: str, salt: Optional[str] = None) -> str:
    """Generate PBKDF2 HMAC-SHA256 salted password hash."""
    if not salt:
        salt = secrets.token_hex(16)
    key = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        iterations=100000,
    )
    return f"{salt}${key.hex()}"


def verify_password(plain_password: str, password_hash: str) -> bool:
    """Verify plain password against stored salted hash."""
    try:
        salt, expected_hex = password_hash.split("$", 1)
        key = hashlib.pbkdf2_hmac(
            "sha256",
            plain_password.encode("utf-8"),
            salt.encode("utf-8"),
            iterations=100000,
        )
        return hmac.compare_digest(key.hex(), expected_hex)
    except Exception:
        return False


def generate_token(user_id: int, username: str, role: str) -> str:
    """Generate simple session token."""
    raw = f"{user_id}:{username}:{role}:{secrets.token_hex(16)}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


# Pre-defined Demo Accounts
DEMO_ACCOUNTS = [
    {
        "username": "child_demo",
        "name": "Ashrith",
        "email": "ashrith.demo@mindbridge.org",
        "role": "child",
        "child_age": 11,
        "grade": "Grade 6",
        "avatar": "🧒",
        "password": "demo",
        "badge": "Child Profile",
        "description": "Child self-reporting check-in, mood journals & interactive coping exercises."
    },
    {
        "username": "guardian_demo",
        "name": "Nitiz (Parent)",
        "email": "nitiz.guardian@mindbridge.org",
        "role": "guardian",
        "child_age": 11,
        "grade": "Parent / Primary Caregiver",
        "avatar": "👨‍👩‍👧",
        "password": "demo",
        "badge": "Guardian Dashboard",
        "description": "Caregiver overview of longitudinal lifestyle trends, risk tier flags & Section 9 DPDP data consent."
    },
    {
        "username": "teacher_demo",
        "name": "Dr. Arjun Cement",
        "email": "arjun.cement@mindbridge.org",
        "role": "clinician",
        "child_age": None,
        "grade": "School Counselor / Clinical Psychologist",
        "avatar": "🩺",
        "password": "demo",
        "badge": "Clinical & School Surveillance",
        "description": "Multi-child surveillance, standardized PSC-17 evaluation review & verified crisis escalations."
    }
]


def seed_demo_users(db: Session):
    """Ensure standard demo users are always present in the database."""
    for demo in DEMO_ACCOUNTS:
        existing = db.query(User).filter(User.username == demo["username"]).first()
        if not existing:
            user = User(
                username=demo["username"],
                name=demo["name"],
                email=demo["email"],
                role=demo["role"],
                child_age=demo["child_age"],
                grade=demo["grade"],
                avatar=demo["avatar"],
                password_hash=hash_password(demo["password"]),
            )
            db.add(user)
        else:
            existing.name = demo["name"]
            existing.email = demo["email"]
            existing.avatar = demo["avatar"]
            existing.grade = demo["grade"]
    db.commit()
