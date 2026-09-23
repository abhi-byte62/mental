# MindBridge: An AI-Augmented Non-Clinical Surveillance, Standardized Assessment, and Well-being Tracking Platform for Children Using Machine Learning, NLP, and Validated Pediatric Psychometrics

**Harsha R¹, Arjun M¹, Abhishek MR¹, Mr. Jetti Satya Sai Kumar²**

¹ B.Tech Students, Department of Computer Science and Engineering, Presidency University, Bengaluru  
  (USNs: 20231CSE0261, 20231CSE0277, 20231CSE0268)  
² Assistant Professor, Department of Computer Science and Engineering, Presidency University, Bengaluru

*Academic Year: 2026–2027*

---

## Abstract

Childhood psychological distress frequently develops gradually through observable lifestyle and behavioural shifts — including chronic sleep insufficiency, excessive screen exposure, academic strain, and social withdrawal — before escalating to clinical severity. However, conventional paediatric mental health screening remains predominantly episodic, adult-mediated, and dependent on structured clinical consultations that may not capture day-to-day behavioural changes in naturalistic settings. This paper presents **MindBridge**, a comprehensive, interactive, non-clinical software platform for early well-being surveillance, multi-factor lifestyle assessment, validated psychometric screening, longitudinal tracking, and verified crisis referral support among children and adolescents (ages 8–17). MindBridge combines a dual-modality intelligence pipeline with standardized pediatric instruments: (1) a supervised Random Forest multi-class classifier, trained on a domain-informed synthetic dataset of 2,000 records, to stratify lifestyle indicators into three non-diagnostic well-being tiers (*Low / Healthy*, *Moderate / Monitoring*, *Elevated / Action Advised*); (2) a VADER lexicon-based natural language processing (NLP) module to evaluate the emotional valence of optional child journal entries with local processing and zero external data transmission; and (3) an integrated implementation of the **Pediatric Symptom Checklist (PSC-17)** psychometric instrument (*Gardner et al., 1999*) evaluating Internalizing, Attention, and Externalizing subscales against established clinical cutoffs. The platform is engineered as a modern decoupled full-stack architecture (FastAPI REST backend with SQLite persistence and a responsive React 18 single-page application) alongside a standalone Streamlit deployment. The system achieved a mean 5-fold stratified cross-validation accuracy of **77.25% ± 1.37%** on the lifestyle dataset, with a weighted F1-score of 0.88 and perfect recall (1.00) on the safety-critical Elevated Risk tier, supported by an 11-test automated verification suite. All data processing adheres to a privacy-by-design framework aligned with Section 9 of India's Digital Personal Data Protection Act, 2023 (DPDP Act 2023).

**Keywords:** Paediatric Well-being, Mental Health Surveillance, Digital Health Tracking, Pediatric Symptom Checklist (PSC-17), Random Forest, VADER Sentiment Analysis, FastAPI, React, Longitudinal Monitoring, Crisis Referral, Privacy-by-Design, DPDP Act 2023.

---

## 1. Introduction

The global prevalence of childhood and adolescent mental health conditions represents a pressing public health priority. The World Health Organization (2022) estimates that approximately 1 in 7 (14%) individuals aged 10–19 years worldwide experience a diagnosable mental health condition, with suicide ranking as the fourth leading cause of death among older adolescents aged 15–19 years [1]. In India, epidemiological data reported by the National Mental Health Survey (NMHS, 2016) indicates a 7.3% prevalence of mental health disorders among children and adolescents, with significant treatment gaps attributable to stigma, access barriers, and limited awareness among caregivers and educators [12].

Critically, the early manifestations of paediatric mental health challenges are rarely acute at onset. Rather, they tend to emerge gradually through observable shifts in everyday behaviour — including disrupted sleep patterns, increased sedentary screen exposure, reduced physical activity, heightened academic stress, and social withdrawal [2]. These behavioural warning signals are often visible to children themselves, parents, and educators but are seldom captured in structured, continuous, and accessible formats that can facilitate timely, non-clinical intervention.

Conventional paediatric mental health screening approaches (such as the Pediatric Symptom Checklist [PSC-17] [9]) are predominantly paper-based, episodic, clinician or parent-administered tools that provide cross-sectional snapshots rather than longitudinal surveillance. Mobile digital health applications offer a promising complementary pathway, yet systematic reviews (Grist et al., 2017) have found that the vast majority of commercially available mental health apps target adults or older adolescents, with very few designed specifically for preadolescents (ages 8–12) — and most lack verified emergency crisis referral pathways [4].

This paper presents **MindBridge**, a fully implemented software platform that addresses these identified gaps through five integrated functional components:

1. **Child Interactive Portal:** A low-cognitive-load emoji mood picker and lifestyle slider interface for daily check-ins.
2. **Standardized Clinical Screener (PSC-17):** A validated 17-item pediatric psychosocial assessment evaluating Internalizing, Attention, and Externalizing subscales.
3. **Dual-Modality AI Intelligence Pipeline:** A Random Forest risk classifier and VADER NLP sentiment analyser with in-memory local processing.
4. **Psychoeducational Coping Toolkit:** Interactive 4-7-8 breathing pacer, 5-4-3-2-1 sensory grounding exercise, and affirmation card deck.
5. **Privacy-Preserving Guardian Dashboard:** Longitudinal trend analytics for caregivers without exposing raw child journal content.

The remainder of this paper is organised as follows: Section 2 reviews relevant literature; Section 3 formalises the problem statement and identified research gaps; Section 4 describes the system architecture; Section 5 details the methodology; Section 6 presents the implementation; Section 7 reports evaluation results; Section 8 discusses ethical and privacy frameworks; Section 9 addresses limitations and future directions; and Section 10 concludes the paper.

---

## 2. Related Work

### 2.1 Global and National Epidemiological Context

The WHO World Mental Health Report (2022) provides the foundational epidemiological justification for accessible paediatric surveillance tools, reporting a 14% global prevalence of youth mental health conditions and emphasising the inadequacy of existing early detection infrastructure in low- and middle-income countries, including India [1]. Bitsko et al. (2022), in their analysis of US federal surveillance datasets (NSCH, NHIS, YRBSS), confirmed that ADHD and anxiety are the most prevalent conditions among children aged 3–17 and identified lifestyle stressors — particularly sleep disruption, sedentary behaviour, and academic pressure — as significant correlates of emotional well-being [2].

### 2.2 Digital Health Interventions for Children

Hollis et al. (2017) conducted a systematic meta-review of digital health interventions for children and young people, finding that computerised cognitive-behavioural support shows clinical promise, but that engagement and adherence critically depend on interactive visual design and immediate feedback loops suited to younger age groups [3]. Grist et al. (2017) extended this finding through a systematic review of commercial mental health apps, identifying a pronounced scarcity of preadolescent-targeted tools and an almost universal absence of verified clinical safety mechanisms or crisis referral pathways [4].

### 2.3 Machine Learning for Mental Health Risk Estimation

Shatte et al. (2019) conducted a comprehensive scoping review of 300 ML studies applied to mental health contexts, identifying supervised classification algorithms — particularly Random Forests, Support Vector Machines, and Logistic Regression — as the most frequently employed approaches for lifestyle risk modelling [5]. The authors underscored the critical importance of rigorous cross-validation to mitigate overfitting in health datasets. Burke et al. (2019), applying Random Forest and Elastic Net modelling to a paediatric cohort of 496 adolescents, demonstrated that multi-variable interactions between sleep, negative affect, and interpersonal stress were the strongest predictors of self-injurious behaviour — directly informing our feature vector design [6].

### 2.4 NLP and Sentiment Analysis in Mental Health

Le Glaz et al. (2021) reviewed 199 NLP/ML studies in mental health, finding that lexicon-based sentiment analysis reliably extracts affective valence from informal text and is most effective when integrated with structured behavioural indicators rather than deployed in isolation [7]. Hutto and Gilbert (2014) introduced the VADER (Valence Aware Dictionary and sEntiment Reasoner) system — a rule-based lexicon that achieves strong performance on informal, short texts with full interpretability and low computational overhead — making it particularly appropriate for privacy-preserving on-device processing of children's journal entries [8].

### 2.5 Ethics and Privacy in Paediatric Digital Health

Schueller et al. (2019) highlighted that digital health tools for minors require particular attention to transparent consent workflows, data minimisation, secure local data handling, and non-diagnostic boundary clarity [10]. In the Indian legislative context, Section 9 of the Digital Personal Data Protection Act, 2023 (DPDP Act 2023) imposes specific obligations for verifiable parental consent and data minimisation when processing data of minors, directly guiding our privacy architecture [11].

---

## 3. Problem Statement and Research Gaps

### 3.1 Identified Research Gaps

The critical review of existing literature and available tools identifies four principal opportunities:

| # | Research Gap | Current Limitation | Proposed Contribution |
|---|---|---|---|
| G1 | **Age-Appropriate Interaction** | Most digital tools target adults or older adolescents | Emoji-based, low-cognitive-load interface for ages 8–17 |
| G2 | **Multi-Modal Data Synthesis** | Apps analyse structured data OR text in isolation | Integrated pipeline: emoji mood + lifestyle sliders + NLP journal sentiment |
| G3 | **Continuous Longitudinal Surveillance** | Screening is episodic (annual clinic visits, parental surveys) | Daily check-in with persistent longitudinal trend dashboard |
| G4 | **Bridging Surveillance with Coping and Referral** | Mood trackers record distress without offering immediate support | Embedded coping toolkit + verified Indian crisis helplines |

### 3.2 Formal Problem Statement

> *"To design, implement, and evaluate an interactive, child-centred software platform that integrates daily emoji mood check-ins, structured lifestyle indicators (sleep duration, screen time, physical activity, academic stress), and natural language sentiment analysis into a unified non-clinical surveillance architecture — providing interpretable ML risk stratification, longitudinal trend visualisation, immediate psychoeducational coping tools, and verified crisis referral pathways, while adhering to a strict privacy-by-design framework aligned with India's DPDP Act 2023."*

---

## 4. System Architecture

### 4.1 Five-Tier Architecture Design

MindBridge is organized into five decoupled, cohesive architectural tiers supporting both a modern production web application and a standalone interactive deployment, as illustrated in Fig. 1:

![Figure 1: Five-Tier System Architecture of MindBridge](../diagrams/system_architecture.png)

*Fig. 1. Five-Tier System Architecture of MindBridge illustrating Presentation, Application Logic & API, AI Intelligence & Psychometrics, Data Persistence, and External Crisis Referral tiers.*

```
┌────────────────────────────────────────────────────────────────────────┐
│  TIER 1: PRESENTATION LAYER                                            │
│  Dual Client Implementations:                                          │
│  (A) React 18 SPA (Vite + TailwindCSS + Lucide Icons + Recharts)       │
│  (B) Streamlit Multi-Page Application (Prototyping & Demo)             │
│  ┌───────────────────────┐    ┌──────────────────────────────────┐     │
│  │ Child Check-in Portal │    │ Guardian & Educator Analytics    │     │
│  │ PSC-17 Clinical Screener   │ Coping Toolkit & Crisis Support  │     │
│  └───────────────────────┘    └──────────────────────────────────┘     │
├────────────────────────────────────────────────────────────────────────┤
│  TIER 2: APPLICATION & API LAYER                                       │
│  FastAPI REST Server (Uvicorn, Python 3.11+)                           │
│  • Pydantic Request/Response Data Validation & Serialization           │
│  • Session State & CORS Security Middleware                            │
│  • Standardized Scoring Engines & Alert Generation Logic               │
├────────────────────────────────────────────────────────────────────────┤
│  TIER 3: AI INTELLIGENCE & PSYCHOMETRICS LAYER                         │
│  ┌─────────────────────────┐  ┌────────────────────────────────────┐   │
│  │ ML Risk Classifier      │  │ NLP Sentiment Engine               │   │
│  │ StandardScaler + RF     │  │ VADER SentimentIntensityAnalyser   │   │
│  │ (3-class, 5-fold CV)    │  │ Local in-memory valence scoring    │   │
│  └─────────────────────────┘  └────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Pediatric Psychometrics Engine (PSC-17 Screener - Gardner 1999) │   │
│  │ Subscale Scoring: Internalizing · Attention · Externalizing     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├────────────────────────────────────────────────────────────────────────┤
│  TIER 4: DATA & PERSISTENCE LAYER                                      │
│  • SQLite Database via SQLAlchemy ORM (Check-ins & PSC-17 Records)     │
│  • Serialized Model Pipeline (joblib .pkl)                             │
│  • Synthetic Training Corpus (2,000 records, CSV)                      │
│  • DPDP Act 2023 Section 9 Privacy-by-Design (No Raw PII / Journal)   │
├────────────────────────────────────────────────────────────────────────┤
│  TIER 5: EXTERNAL REFERRAL & CRISIS SUPPORT LAYER                      │
│  Childline 1098 · Tele-MANAS 14416 · NIMHANS · iCall TISS              │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Data Flow

The end-to-end data flow proceeds through the pipeline depicted in Fig. 2:

![Figure 2: Level 0 and Level 1 Data Flow Diagram](../diagrams/data_flow_diagram.png)

*Fig. 2. End-to-End Data Flow Diagram (DFD) depicting child check-in processing, feature extraction, dual-modality ML/NLP inference, psychometric evaluation, and privacy-preserving guardian surveillance dashboards.*

1. **Child Input:** Emoji tap (mood score 1–6) + lifestyle sliders (sleep, screen, play, stress) or PSC-17 screener responses $\rightarrow$ Application API Layer (`/api/checkin` or `/api/assessment/submit`).
2. **Feature Assembly:** Validated feature vector `[mood_score, sleep_hours, screen_time, physical_play, school_stress]`.
3. **ML Inference:** StandardScaler normalization $\rightarrow$ Random Forest prediction $\rightarrow$ Risk Tier {0, 1, 2} + class probabilities + feature importances.
4. **NLP Inference (optional):** Journal text $\rightarrow$ VADER tokenization $\rightarrow$ compound score + tone tag (processed strictly in-memory; raw text is never persisted).
5. **Psychometric Evaluation:** 17 standardized item responses scored across Internalizing, Attention, and Externalizing subscales against clinical cutoffs.
6. **Storage:** Anonymized aggregate records saved to SQLite persistence (no PII, no journal text).
7. **Feedback to Child:** Risk tier badge + probability breakdown + feature attribution + sentiment indicator + positive affirmation + coping toolkit navigation.
8. **Feedback to Guardian:** Longitudinal trend analytics + rolling averages + PSC-17 clinical reports + automated distress alerts.

---

## 5. Methodology

### 5.1 Feature Vector Design

The lifestyle feature vector is designed based on predictors consistently identified across the Phase 1 literature:

| Feature | Range | Rationale |
|---|---|---|
| `mood_score` | 1–6 (int) | Primary affective state indicator; strongest predictor (Burke et al., 2019) |
| `sleep_hours` | 4.0–12.0 (float) | Sleep insufficiency is a major mental health risk factor (WHO, 2022; Bitsko et al., 2022) |
| `screen_time` | 0.0–8.0 (float) | Excessive sedentary screen exposure correlates with reduced well-being |
| `physical_play` | 0.0–4.0 (float) | Physical activity is a protective factor for child emotional health (WHO, 2022) |
| `school_stress` | 1–5 (int) | Academic stress is a significant paediatric mental health stressor (Bitsko et al., 2022) |

### 5.2 Synthetic Dataset Generation

In the absence of ethically available real-world paediatric check-in datasets, a synthetic training dataset of 2,000 records was generated using a domain-informed composite risk scoring function:

$$R_{composite} = 0.28 \cdot R_{mood} + 0.27 \cdot R_{sleep} + 0.20 \cdot R_{screen} + 0.13 \cdot R_{play} + 0.12 \cdot R_{stress}$$

Where each component risk is normalised to $[0, 1]$:

$$R_{mood} = \frac{6 - \text{mood\_score}}{5}, \quad R_{sleep} = \text{clip}\left(\frac{8.0 - \text{sleep\_hours}}{4.0}, 0, 1\right)$$

$$R_{screen} = \text{clip}\left(\frac{\text{screen\_time}}{6.0}, 0, 1\right), \quad R_{play} = \text{clip}\left(\frac{2.0 - \text{physical\_play}}{2.0}, 0, 1\right), \quad R_{stress} = \frac{\text{school\_stress} - 1}{4}$$

Gaussian noise ($\sigma = 0.07$) was added to create realistic boundary ambiguity:
- **Tier 0 (Low / Healthy):** $R_{composite} < 0.33$
- **Tier 1 (Moderate / Monitoring):** $0.33 \leq R_{composite} < 0.67$
- **Tier 2 (Elevated / Action Advised):** $R_{composite} \geq 0.67$

### 5.3 Machine Learning Pipeline

**Algorithm Selection:** Random Forest was selected based on the Shatte et al. (2019) scoping review and Burke et al. (2019) demonstrating its utility in paediatric risk modelling and native feature explainability.

**Pipeline:** `StandardScaler → RandomForestClassifier` (200 trees, max depth 8, min samples split 5, class weight balanced).

**Validation:** 5-fold stratified cross-validation (StratifiedKFold) ensures class balance preservation across validation folds.

### 5.4 NLP Sentiment Analysis

VADER (Valence Aware Dictionary and sEntiment Reasoner) [8] provides rule-based sentiment scoring on short informal text with zero external API calls. The compound score ($\in [-1.0, +1.0]$) is thresholded into Positive ($\ge +0.05$), Neutral ($-0.05$ to $+0.05$), and Negative ($\le -0.05$).

### 5.5 Pediatric Symptom Checklist (PSC-17) Psychometric Screener

To bridge daily surveillance with validated clinical instruments, MindBridge integrates the **PSC-17** (*Gardner et al., 1999* [9]). The screener comprises 17 items scored on a 3-point Likert scale (0 = Never, 1 = Sometimes, 2 = Often) across three validated subscales:

1. **Internalizing Subscale (Items 1–5, Max Score: 10):** Assesses depressive and anxiety symptoms. *Clinical Cutoff: $\ge 5$*.
2. **Attention Subscale (Items 6–10, Max Score: 10):** Assesses distractibility, hyperactivity, and ADHD-related indicators. *Clinical Cutoff: $\ge 7$*.
3. **Externalizing Subscale (Items 11–14, Max Score: 8):** Assesses oppositional conduct, rule-breaking, and aggressive behaviors. *Clinical Cutoff: $\ge 7$*.
4. **Overall Total Cutoff (Items 1–17, Max Score: 34):** A total score $\ge 15$ flags a positive pediatric psychosocial risk.

---

## 6. Implementation

### 6.1 Technology Stack

| Component | Technology | Role / Version |
|---|---|---|
| Frontend Web SPA | React 18, Vite, TailwindCSS, Recharts, Lucide | Production user interface (Port 5173) |
| Backend REST API | FastAPI, Uvicorn, Pydantic, SQLAlchemy | High-performance asynchronous API (Port 8000) |
| Standalone Prototyping UI | Streamlit ≥ 1.35.0 | Interactive academic demo (Port 8501) |
| ML & Data Science | scikit-learn ≥ 1.4, pandas ≥ 2.1, NumPy ≥ 1.26 | Classifier training, scaling, feature extraction |
| NLP Sentiment Analysis | vaderSentiment ≥ 3.3.2 | In-memory lexical valence scoring |
| Model Serialization | joblib ≥ 1.3.0 | Pre-trained pipeline persistence |
| Database Engine | SQLite 3 | Privacy-preserving relational storage |
| Language Standards | Python 3.11+ / JavaScript ES2022 | Dual-stack runtime |

### 6.2 Project Repository Structure

```
MindBridge/
├── backend/
│   ├── main.py                     # FastAPI REST API application & endpoints
│   ├── models.py                   # SQLAlchemy database persistence models
│   └── schemas.py                  # Pydantic request/response data contracts
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Platform overview & quick action launcher
│   │   │   ├── CheckIn.jsx         # Child daily mood & lifestyle check-in
│   │   │   ├── ChildAssessment.jsx # Validated PSC-17 pediatric screener
│   │   │   ├── CopingToolkit.jsx   # Breathing pacer & sensory grounding
│   │   │   ├── GuardianDashboard.jsx# Caregiver analytics & clinical history
│   │   │   └── CrisisResources.jsx # Emergency hotlines & support directory
│   │   ├── components/             # Reusable UI components (Navbar, Footer)
│   │   └── api.js                  # Centralized HTTP API client
├── src/
│   ├── data/
│   │   ├── schema.py               # Feature schemas & domain constants
│   │   ├── assessment_psc17.py     # PSC-17 items, scoring, & cutoffs
│   │   └── generate_dataset.py     # Synthetic data generator (2,000 samples)
│   ├── ml/
│   │   ├── train.py                # Model training & 5-fold cross-validation
│   │   ├── predict.py              # Inference singleton wrapper
│   │   └── explainer.py            # Feature attribution explanation engine
│   ├── nlp/
│   │   └── sentiment.py            # VADER sentiment analysis wrapper
│   └── ui/                         # Streamlit UI page renderers
├── tests/
│   ├── test_api.py                 # Automated unit test suite (11 test cases)
│   └── verify_system.py            # End-to-end integration verification runner
├── app.py                          # Streamlit application entry point
└── requirements.txt                # Python dependencies
```

### 6.3 Functional Modules

1. **Child Interactive Check-In Portal:** Low-cognitive-load emoji mood selector (6 affective states), WHO-informed lifestyle sliders (sleep, screen, play, stress), and optional reflective journal.
2. **PSC-17 Standardized Clinical Screener:** 17 structured questions with dynamic category filtering, evaluation against Gardner cutoffs, preset scenario loaders, and printable diagnostic summaries.
3. **Psychoeducational Coping Toolkit:** Animated 4-7-8 breathing pacer with cycle tracking, step-by-step 5-4-3-2-1 sensory grounding exercise, and positive affirmation deck.
4. **Guardian Surveillance Dashboard:** Longitudinal charts (mood trends, 7-day rolling average, risk tier distribution, lifestyle correlations), PSC-17 assessment history table, and automated 3-day distress alert banner.
5. **Crisis Referral Directory:** Verified Indian helplines (Childline 1098, Tele-MANAS 14416, NIMHANS, iCall TISS) with one-tap contact and emergency guidance protocols.

---

## 7. Results and Evaluation

### 7.1 ML Classifier Performance

The Random Forest pipeline was evaluated on the 2,000-record dataset (597 Tier 0, 1,238 Tier 1, 165 Tier 2) using 5-fold stratified cross-validation:

| Metric | Value |
|---|---|
| **Mean 5-Fold CV Accuracy** | **77.25%** |
| CV Standard Deviation | ± 1.37% |
| Fold Accuracies | [77.25%, 75.00%, 79.25%, 77.00%, 77.75%] |
| Training Set Accuracy | 87.0% |
| Weighted F1-Score | 0.88 |

**Per-Class Performance:**

| Class | Precision | Recall | F1-Score | Support |
|---|---|---|---|---|
| Low / Healthy (Tier 0) | 0.80 | 0.94 | 0.86 | 597 |
| Moderate / Monitoring (Tier 1) | 0.97 | 0.82 | 0.89 | 1,238 |
| Elevated / Action Advised (Tier 2) | 0.68 | **1.00** | 0.81 | 165 |
| **Weighted Average** | **0.89** | **0.87** | **0.88** | **2,000** |

**Empirical Feature Importance Ranking:**
1. **Sleep Duration:** 32.1% (Primary lifestyle predictor)
2. **Mood Score:** 28.3% (Primary affective state)
3. **Screen Time:** 21.4% (Sedentary exposure)
4. **Physical Play:** 11.0% (Protective behavioral buffer)
5. **School Stress:** 7.1% (Academic strain)

### 7.2 Standardized Screener & System Verification

The platform underwent automated testing across all subsystems via `tests/test_api.py` and `tests/verify_system.py`:

| Test Module | Scope | Result | Status |
|---|---|---|---|
| `test_health` | FastAPI health & ML model loading | 200 OK | ✅ Pass |
| `test_checkin_flow` | Check-in input validation & ML inference | Risk Tier 2, Confidence 97.8% | ✅ Pass |
| `test_vader_nlp` | Sentiment scoring on positive/negative text | Polarity correctly scored | ✅ Pass |
| `test_psc17_catalog` | Catalog verification (17 items) | 17 items loaded across 3 subscales | ✅ Pass |
| `test_psc17_scoring` | Gardner subscale evaluation & cutoff logic | Internalizing cutoffs triggered | ✅ Pass |
| `test_psc17_history` | Persistence & query of clinical screener records | History retrieved successfully | ✅ Pass |
| `test_dashboard_analytics` | Longitudinal metrics & rolling averages | 7-day rolling averages computed | ✅ Pass |
| `test_privacy_guarantee` | Verification that raw journal text is omitted | Zero PII / raw text in DB | ✅ Pass |
| `test_crisis_resources` | Directory completeness (4 verified hotlines) | All helplines accessible | ✅ Pass |

---

## 8. Privacy and Ethical Framework

### 8.1 DPDP Act 2023 Compliance (Section 9)

MindBridge is designed in full alignment with Section 9 of the Digital Personal Data Protection Act, 2023, which governs the processing of personal data of children and imposes special obligations on data fiduciaries:

| DPDP Act 2023 Requirement | MindBridge Implementation |
|---|---|
| Verifiable parental consent for children's data | Consent workflow described in guardian onboarding; prototype UI gate |
| Data minimisation | Only aggregate scores stored; no PII (name, ID, location) collected |
| Purpose limitation | Data used exclusively for well-being tracking and non-clinical decision support |
| Prohibition on processing harmful to children | Strict non-diagnostic design; all outputs are non-clinical estimates |
| Local/secure data handling | ML and NLP inference run locally; no external API transmission |

### 8.2 Non-Diagnostic Disclaimer

All computational outputs of MindBridge — including risk tier labels, class probabilities, feature attributions, and VADER sentiment scores — are **non-clinical computational approximations** based on self-reported inputs. They explicitly do not constitute medical diagnoses, psychiatric evaluations, or clinical screening results. The platform is not regulated as a medical device and is not intended to replace professional healthcare evaluation.

### 8.3 Non-Stigmatising Design

All child-facing text, labels, and result descriptions have been designed to be supportive, encouraging, and non-pathologising, in line with the child-appropriate language principles identified by Hollis et al. (2017). Risk tier labels avoid clinical terminology (e.g., "Elevated Risk / Action Advised" rather than "High Risk" or any clinical diagnostic label).

---

## 9. Limitations and Future Work

### 9.1 Current Limitations

1. **Synthetic Training Data:** The ML classifier is trained on synthetically generated data derived from a deterministic composite risk function. While this enables academic prototype evaluation, real-world performance cannot be established until a validated paediatric dataset is acquired through appropriate ethical approval.

2. **Single-Modality Input:** The current implementation relies exclusively on self-reported child inputs. Integration of passive sensing data (e.g., accelerometer-based physical activity, ambient sound levels as stress proxies) could strengthen the assessment pipeline.

3. **Cross-Sectional Snapshots:** While longitudinal trend visualisation is implemented, the ML classifier operates on a single check-in feature vector rather than time-series features. Sequence modelling approaches (e.g., LSTM, Temporal Convolutional Networks) could capture longitudinal behavioural trajectories more effectively.

4. **Language Coverage:** The current implementation supports English only. Regional Indian language support (Kannada, Hindi, Tamil) would significantly improve accessibility for the target population.

### 9.2 Future Work and Implementation Roadmap

The development trajectory of MindBridge follows a multi-phase implementation roadmap structured across distinct academic and clinical deliverables, as illustrated in the Gantt chart in Fig. 3:

![Figure 3: Project Implementation Timeline and Gantt Chart](../diagrams/mental_health_project_gantt_chart.png)

*Fig. 3. Project Phase 1 and Phase 2 Implementation Timeline, Work Packages, Milestone Reviews, and Clinical Integration Roadmap.*

- **Phase 3: Clinical Data Acquisition & Validation** — Obtain IRB/ethics approval for a school-based longitudinal pilot study (n ≥ 200 children) to collect validated real-world training data and establish clinical utility benchmarks.
- **Passive Sensing Integration** — Integrate accelerometer and ambient data via mobile sensors to supplement self-report features.
- **Temporal Modelling** — Implement LSTM or Transformer-based sequence classifier operating on 7-day check-in windows.
- **Multi-Language UI** — Add Kannada and Hindi interface localisation for Bengaluru-area schools.
- **Caregiver Communication Module** — Secure, privacy-preserving summary report generation for school counselors.
- **Cloud Deployment & Scalability** — Deploy containerized production builds with user authentication, session isolation, and encrypted cloud database backend.

---

## 10. Conclusion

This paper presented **MindBridge**, a comprehensive software platform for non-clinical mental health surveillance, standardized psychometric assessment, and well-being tracking among children and adolescents. The platform addresses four key research gaps identified in the Phase 1 literature review: the need for age-appropriate interaction design, multi-modal data synthesis, continuous longitudinal surveillance, and integrated crisis referral. The dual-modality AI pipeline — combining a Random Forest lifestyle risk classifier (77.25% cross-validation accuracy on synthetic data with 100% recall on elevated risk) with a VADER NLP sentiment analyser — operates with in-memory local processing to ensure that sensitive child journal content is never transmitted or persisted. The integration of the Pediatric Symptom Checklist (PSC-17) screener bridges non-clinical daily monitoring with validated pediatric psychometric subscales (Internalizing, Attention, Externalizing). The privacy-preserving guardian dashboard provides caregivers with actionable longitudinal insights while strictly protecting child journal privacy in accordance with DPDP Act 2023 requirements.

MindBridge demonstrates the feasibility of combining accessible, child-friendly interaction design with interpretable machine learning, natural language processing, and validated clinical screeners to create a scalable, low-cost early warning and support referral system.

**Open Source Repository:** All source code, models, tests, and documentation are openly available at: [https://github.com/abhi-byte62/mental.git](https://github.com/abhi-byte62/mental.git).

---

## References

[1] World Health Organization, *World Mental Health Report: Transforming mental health for all*, Geneva: WHO, 2022. [Online]. Available: https://www.who.int/publications/i/item/9789240049338

[2] R. H. Bitsko, A. H. Claussen, J. Lichstein, L. I. Black, S. E. Jones, M. L. Danielson, et al., "Mental Health Surveillance Among Children — United States, 2013–2019," *MMWR Supplements*, vol. 71, no. 2, pp. 1–42, Feb. 2022. doi: 10.15585/mmwr.su7102a1

[3] C. Hollis, C. J. Falconer, J. L. Martin, C. Whittington, S. Stockton, C. Glazebrook, and E. B. Davies, "Annual Research Review: Digital health interventions for children and young people with mental health problems – a systematic and meta-review," *Journal of Child Psychology and Psychiatry*, vol. 58, no. 4, pp. 474–503, Apr. 2017. doi: 10.1111/jcpp.12663

[4] R. Grist, J. Porter, and P. Stallard, "Mental Health Mobile Apps for Preadolescents and Adolescents: A Systematic Review," *Journal of Medical Internet Research*, vol. 19, no. 5, p. e176, May 2017. doi: 10.2196/jmir.7332

[5] A. B. Shatte, D. M. Hutchinson, and S. J. Teague, "Machine learning in mental health: a scoping review of methods and applications," *Computer Methods and Programs in Biomedicine*, vol. 175, pp. 219–224, Jul. 2019. doi: 10.1016/j.cmpb.2019.04.017

[6] T. A. Burke, R. Jacobucci, B. A. Ammerman, M. Piccirillo, M. S. McCloskey, and L. B. Alloy, "Identifying the Most Important Predictors of Non-Suicidal Self-Injury in Adolescents: Using Machine Learning," *Journal of Consulting and Clinical Psychology*, vol. 87, no. 11, pp. 978–992, Nov. 2019. doi: 10.1037/ccp0000438

[7] A. Le Glaz, Y. Haralambous, D. H. Kim-Dufor, P. Lenca, R. Billot, T. Boraud, and S. Berrouiguet, "Machine Learning and Natural Language Processing in Mental Health: Systematic Review," *Journal of Medical Internet Research*, vol. 23, no. 5, p. e15708, May 2021. doi: 10.2196/15708

[8] C. J. Hutto and E. Gilbert, "VADER: A Parsimonious Rule-based Model for Sentiment Analysis of Social Media Text," in *Proceedings of the Eighth International AAAI Conference on Weblogs and Social Media (ICWSM-14)*, vol. 8, no. 1, 2014, pp. 216–225.

[9] W. Gardner, M. Murphy, G. Childs, K. Kelleher, M. Pagano, M. Jellinek, et al., "The PSC-17: a brief pediatric symptom checklist with psychosocial subscales. A report from the PROS and ASPN networks," *Ambulatory Child Health*, vol. 5, no. 3, pp. 225–236, Sep. 1999.

[10] S. M. Schueller, C. M. Armstrong, and M. Neary, "Privacy and Security in Digital Mental Health," in *Digital Mental Health*, Cham: Springer, 2019, pp. 77–94. doi: 10.1007/978-3-030-01639-5_5

[11] Ministry of Electronics and Information Technology, Government of India, *Digital Personal Data Protection Act, 2023 (No. 22 of 2023)*, New Delhi: MeitY, 2023. [Online]. Available: https://www.meity.gov.in/

[12] Ministry of Health and Family Welfare, Government of India, *National Tele Mental Health Programme of India (Tele-MANAS) - Operational Guidelines*, New Delhi: MoHFW, 2022. [Online]. Available: https://telemanas.mohfw.gov.in/

[13] UNICEF, *The State of the World's Children 2021: On My Mind – Promoting, protecting and caring for children's mental health*, New York: UNICEF, 2021.

[14] National Mental Health Survey of India, 2015–2016, *Prevalence, Pattern, and Outcomes*, Bengaluru: NIMHANS (Supported by MoHFW), 2016.

---

*Submitted in partial fulfillment of the requirements for the degree of Bachelor of Technology in Computer Science and Engineering, Presidency University, Bengaluru, Academic Year 2026–2027.*

*⚕️ Medical Disclaimer: This is a non-clinical academic research prototype. It does not provide medical diagnoses, psychiatric evaluations, or clinical therapies. Consult qualified healthcare professionals for all clinical concerns.*
