# Mental Health and Well-being Surveillance, Assessment and Tracking Solution Among Children

## Project Overview

This project focuses on the design and full implementation of **MindBridge** — an intelligent, child-centered digital platform for early mental health and well-being surveillance, assessment, longitudinal tracking, and verified support referral among children and adolescents.

The platform combines a low-cognitive-load interface (single-tap emoji mood check-ins and an optional reflective journal) with a dual-modality intelligence pipeline: (1) supervised machine learning classification for non-diagnostic lifestyle risk stratification (*Low / Healthy*, *Moderate / Monitoring*, *Elevated / Action Advised*), and (2) natural language processing (NLP) for emotional valence and affective tone scoring. Caregivers receive explainable longitudinal trend dashboards alongside verified emergency crisis referral pathways.

## Students

| Name | USN |
|---|---|
| Harsha R | 20231CSE0261 |
| Arjun M | 20231CSE0277 |
| Abhishek MR | 20231CSE0268 |

## Guide

Mr. Jetti Satya Sai Kumar

## University

Presidency University, Bengaluru

## Degree

B.Tech – Computer Science and Engineering

## Academic Year

2026–2027

---

## Phase 1 — Design & Literature Defense (Complete ✅)

- **Literature Review:** Critical survey of 10 peer-reviewed papers and epidemiological surveillance frameworks (WHO, CDC MMWR, JCPP, JMIR, CMPB).
- **Research Gap Analysis:** Formulation of 4 distinct opportunities spanning age-appropriate interaction, multi-modal synthesis, continuous tracking, and crisis integration.
- **Problem Statement & Scope:** Clear boundaries distinguishing non-clinical surveillance from medical diagnosis.
- **System Architecture:** 5-tier architecture design (Presentation, Application Logic, ML/NLP Intelligence, Data Persistence, External Referral).
- **Data Flow Design:** Comprehensive Level 0 and Level 1 DFDs mapping child check-in to role-based analytics.
- **Privacy & Ethics:** Privacy-by-design framework aligned with Section 9 of India's Digital Personal Data Protection Act, 2023 (DPDP Act 2023).

## Phase 2 — Full Application Implementation (Complete ✅)

- **Role-Based Authentication & Persona Hub:** Sign In and Sign Up portals for **Child** (custom avatars & grade/age), **Guardian** (caregiver email & child oversight), and **Clinician/Counselor**, along with 1-click instant demo persona switching.
- **Child Interactive Portal:** Emoji mood picker + lifestyle sliders + optional reflective journal (no PII retained).
- **Standardized Pediatric Assessment (PSC-17):** Clinically validated 17-item Pediatric Symptom Checklist (Gardner et al., 1999) measuring internalizing, attention, and conduct subscales.
- **ML Risk Classifier:** Random Forest (200 trees, StandardScaler, 5-fold CV) — 77.25% CV accuracy, 0.88 weighted F1, perfect recall on Elevated Risk tier.
- **NLP Sentiment Engine:** VADER SentimentIntensityAnalyzer — local processing, zero data transmission.
- **Coping Toolkit:** Interactive 4-7-8 breathing pacer with dynamic animation, 5-4-3-2-1 sensory grounding exercise, positive affirmation deck.
- **Guardian Dashboard:** Longitudinal trend charts, rolling averages, subscale risk breakdown, distress alerts — privacy-preserving (Section 9 DPDP Act compliant).
- **Dual Interface Deployments:** Modern full-stack Web App (FastAPI + React 18 + Tailwind/Lucide/Recharts) and standalone Streamlit application.
- **Crisis Referral:** Childline 1098, Tele-MANAS 14416, NIMHANS, iCall TISS.
- **Automated Test Suite:** 15 comprehensive unit tests covering endpoints, authentication, ML inference, and assessment evaluation.

---

## How to Run

### Option A: Modern Full-Stack Web App (FastAPI + React)

```bash
# 1. Start the FastAPI backend
uvicorn backend.main:app --reload --port 8000

# 2. In a separate terminal, start the React frontend
cd frontend
npm install
npm run dev
```
Open **http://localhost:5173** in your browser.

---

### Option B: 1-Click Cloud Deployment (Vercel)

This repository is pre-configured with `vercel.json` and dual-mode client intelligence:
1. Push this repository to your GitHub account.
2. Import the repository in [Vercel](https://vercel.com).
3. Vercel automatically detects `vercel.json`, executes the build, and deploys the live web application!
4. *(Optional)* Set `VITE_API_BASE_URL` in Vercel Environment Variables if connecting to an external FastAPI backend instance.

---

### Option C: Standalone Streamlit Application

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Launch the Streamlit application
streamlit run app.py
```
Open **http://localhost:8501** in your browser.

---

## Running Test Suite

```bash
python -m unittest discover -s tests
```

---

## Repository Structure

```
/
├── README.md
├── requirements.txt                               # Python dependencies
├── app.py                                         # Streamlit UI entry point
│
├── backend/
│   ├── main.py                                    # FastAPI REST API endpoints
│   ├── models.py                                  # SQLite / SQLAlchemy persistence models
│   └── schemas.py                                 # Pydantic request/response schemas
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx                           # Overview & quick launch
│   │   │   ├── CheckIn.jsx                        # Child daily mood & lifestyle check-in
│   │   │   ├── ChildAssessment.jsx                # Validated PSC-17 pediatric screener
│   │   │   ├── CopingToolkit.jsx                  # Breathing pacer & grounding tools
│   │   │   ├── GuardianDashboard.jsx              # Caregiver analytics & assessment tracking
│   │   │   └── CrisisResources.jsx                # Verified emergency referral directory
│   │   ├── components/                            # Navbar, Footer, etc.
│   │   └── api.js                                 # Centralized API client
│
├── src/
│   ├── data/
│   │   ├── schema.py                              # Feature definitions, mood labels, risk tiers
│   │   ├── assessment_psc17.py                    # PSC-17 items, scoring, & clinical cutoffs
│   │   └── generate_dataset.py                   # Synthetic 2000-record training data generator
│   ├── ml/
│   │   ├── train.py                               # Random Forest training + 5-fold CV + serialization
│   │   ├── predict.py                             # Inference wrapper (singleton model loading)
│   │   └── explainer.py                           # Feature importance plots + plain-English explanations
│   ├── nlp/
│   │   └── sentiment.py                           # VADER sentiment wrapper
│   ├── ui/
│   │   ├── checkin.py                             # Child check-in page
│   │   ├── assessment.py                          # Streamlit PSC-17 assessment page
│   │   ├── coping.py                              # Coping toolkit (breathing + grounding + affirmations)
│   │   ├── dashboard.py                           # Guardian longitudinal dashboard
│   │   └── crisis.py                              # Crisis referral resources page
│   └── utils/
│       ├── storage.py                             # CSV-based check-in history (no PII)
│       └── session.py                             # Streamlit session state management
│
├── models/
│   └── risk_classifier.pkl                       # Serialized sklearn Pipeline (trained)
│
├── data/
│   └── synthetic_checkins.csv                    # Synthetic training dataset (2000 records)
│
├── tests/
│   └── test_api.py                                # Comprehensive backend test suite
│
├── docs/
│   └── Review_1_Mini_Project_Presentation.pptx  # Phase 1 review presentation
│
├── report/
│   ├── Phase_1_Project_Report.md                 # Complete Phase 1 academic report
│   └── Phase_2_Research_Paper_Draft.md           # IEEE-format research paper draft
│
└── diagrams/
    ├── system_architecture.png                   # 5-tier system architecture diagram
    ├── data_flow_diagram.png                     # End-to-end data flow diagram
    └── mental_health_project_gantt_chart.png     # Phase 1 Gantt chart
```

## Technology Stack

| Component | Technology |
|---|---|
| Frontend Web App | React 18, Vite, Lucide React, Recharts, Vanilla CSS Design System |
| Backend REST API | FastAPI, Uvicorn, SQLite, SQLAlchemy, Pydantic |
| Streamlit App | Streamlit ≥ 1.35 |
| ML Library | scikit-learn ≥ 1.4 (Random Forest + StandardScaler) |
| NLP Library | vaderSentiment ≥ 3.3.2 (VADER) |
| Data Processing | pandas ≥ 2.1, NumPy ≥ 1.26 |
| Model Serialization | joblib ≥ 1.3 |
| Language | Python 3.11+ / JavaScript ES2022 |

## Disclaimer

This is an academic engineering prototype and is **NOT** a medical diagnostic system. Machine learning (ML) and natural language processing (NLP) outputs are non-clinical computational estimates and do not replace professional medical or psychiatric evaluation. If a child exhibits persistent distress or acute crisis, consultation with a qualified pediatrician, licensed child psychologist, or verified emergency child helpline is required.

**Emergency Helplines (India):** Childline **1098** | Tele-MANAS **14416** | Emergency **112**

