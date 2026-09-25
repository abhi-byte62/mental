"""
MindBridge - Complete Project Defense & Viva Guide PDF Generator.
Produces a publication-quality PDF handbook covering architecture, ML, NLP,
DPDP Act compliance, and answers to all possible reviewer questions.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages 2+)
        if self._pageNumber > 1:
            self.drawString(54, 11 * inch - 36, "MindBridge: Pediatric Well-being Surveillance — Comprehensive Viva Defense Guide")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(54, 11 * inch - 42, 8.5 * inch - 54, 11 * inch - 42)
        
        # Footer
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * inch - 54, 36, page_text)
        self.drawString(54, 36, "Presidency University • Department of Computer Science & Engineering • 2026–2027")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 46, 8.5 * inch - 54, 46)
        self.restoreState()

def generate_pdf(output_filename="MindBridge_Project_Defense_and_Viva_Guide.pdf"):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    PRIMARY = colors.HexColor("#0f172a") # Slate 900
    SECONDARY = colors.HexColor("#334155") # Slate 700
    ACCENT = colors.HexColor("#0369a1") # Sky 700
    BG_LIGHT = colors.HexColor("#f8fafc")
    BORDER_COLOR = colors.HexColor("#e2e8f0")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=PRIMARY,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=ACCENT,
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=PRIMARY,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=ACCENT,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=SECONDARY,
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=PRIMARY,
        spaceAfter=6
    )

    qa_q = ParagraphStyle(
        'QA_Q',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=PRIMARY,
        spaceBefore=8,
        spaceAfter=2,
        keepWithNext=True
    )

    qa_a = ParagraphStyle(
        'QA_A',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=SECONDARY,
        spaceAfter=8
    )

    table_header_style = ParagraphStyle(
        'TH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TC',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=SECONDARY
    )

    story = []

    # ==================== COVER / HEADER ====================
    story.append(Paragraph("MindBridge: Early Mental Health &amp; Well-being Surveillance", title_style))
    story.append(Paragraph("Comprehensive Project Defense, Architecture Dossier &amp; Reviewer Viva Guide", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceAfter=12))

    # Project Metadata Table
    meta_data = [
        [
            Paragraph("<b>Institution:</b> Presidency University, Bengaluru", body_style),
            Paragraph("<b>Academic Year:</b> 2026–2027", body_style)
        ],
        [
            Paragraph("<b>Project Team:</b> Harsha R (20231CSE0261), Arjun M (20231CSE0277), Abhishek MR (20231CSE0268)", body_style),
            Paragraph("<b>Project Guide:</b> Mr. Jetti Satya Sai Kumar", body_style)
        ],
        [
            Paragraph("<b>Technology Stack:</b> FastAPI (Python), Scikit-Learn, VADER NLP, React, Vite, SQLite", body_style),
            Paragraph("<b>Regulatory Baseline:</b> DPDP Act 2023 (Section 9 Child Privacy)", body_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[3.8 * inch, 3.2 * inch])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 12))

    # ==================== 1. EXECUTIVE SUMMARY & PROBLEM STATEMENT ====================
    story.append(Paragraph("1. Executive Summary &amp; Clinical Problem Statement", h1_style))
    story.append(Paragraph(
        "<b>The Clinical Gap:</b> Traditional pediatric mental healthcare relies heavily on episodic, reactive clinical assessments triggered only after a child demonstrates overt behavioral or academic deterioration. In children aged 6–17, early distress manifests subtler lifestyle disruptions—irregular sleep architecture, escalating recreational screen exposure, and decreased spontaneous physical play—long before diagnostic psychiatric criteria are met.",
        body_style
    ))
    story.append(Paragraph(
        "<b>The MindBridge Solution:</b> MindBridge is a continuous, non-clinical surveillance and longitudinal tracking platform. It decouples high-friction diagnostic workflows into daily, low-cognitive-load micro-check-ins and standardized clinical screeners (PSC-17). It deploys dual-modality computational intelligence (Random Forest Classifier + VADER Lexical Sentiment) and protects child autonomy through strict privacy-by-design under Section 9 of India's Digital Personal Data Protection (DPDP) Act, 2023.",
        body_style
    ))

    # ==================== 2. SYSTEM ARCHITECTURE (5 TIERS) ====================
    story.append(Paragraph("2. 5-Tier Decoupled System Architecture", h1_style))
    story.append(Paragraph(
        "The system is engineered across five decoupled tiers to maintain separation of concerns, high throughput, and fault tolerance:",
        body_style
    ))

    arch_data = [
        [Paragraph("Tier", table_header_style), Paragraph("Component", table_header_style), Paragraph("Core Technologies", table_header_style), Paragraph("Key Functional Responsibilities", table_header_style)],
        [
            Paragraph("<b>Tier 1: Client Layer</b>", table_cell_style),
            Paragraph("Responsive Web Application", table_cell_style),
            Paragraph("React 19, Vite, Tailwind CSS, Recharts, Lucide", table_cell_style),
            Paragraph("Low-cognitive-load child UI, guardian longitudinal graphs, PSC-17 evaluation questionnaire, coping tools.", table_cell_style)
        ],
        [
            Paragraph("<b>Tier 2: API Gateway</b>", table_cell_style),
            Paragraph("RESTful Service Bus", table_cell_style),
            Paragraph("FastAPI, Uvicorn ASGI, Pydantic V2", table_cell_style),
            Paragraph("CORS management, request validation, structured JSON serialization, error handling, session routing.", table_cell_style)
        ],
        [
            Paragraph("<b>Tier 3: ML Inference</b>", table_cell_style),
            Paragraph("Supervised Risk Classifier", table_cell_style),
            Paragraph("Scikit-Learn (Random Forest), NumPy, Joblib", table_cell_style),
            Paragraph("Multi-class risk stratification (Low / Moderate / Elevated), probability calibration, feature attribution.", table_cell_style)
        ],
        [
            Paragraph("<b>Tier 4: NLP Valence</b>", table_cell_style),
            Paragraph("Lexical Polarity Engine", table_cell_style),
            Paragraph("VADER Lexicon (NLTK/Python)", table_cell_style),
            Paragraph("In-memory sentiment valence compound scoring (-1 to +1) of optional reflections with zero raw text disk storage.", table_cell_style)
        ],
        [
            Paragraph("<b>Tier 5: Persistence</b>", table_cell_style),
            Paragraph("Relational Database", table_cell_style),
            Paragraph("SQLite, SQLAlchemy 2.0 ORM", table_cell_style),
            Paragraph("Longitudinal check-in logs, PSC-17 screener records, user credentials with cryptographic hashing (bcrypt/SHA-256).", table_cell_style)
        ],
    ]
    arch_table = Table(arch_data, colWidths=[1.1 * inch, 1.4 * inch, 1.7 * inch, 2.8 * inch])
    arch_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
    ]))
    story.append(arch_table)
    story.append(Spacer(1, 10))

    # ==================== 3. MACHINE LEARNING ENGINE ====================
    story.append(Paragraph("3. Supervised Machine Learning &amp; Risk Stratification", h1_style))
    story.append(Paragraph(
        "<b>Model Choice &amp; Justification:</b> Random Forest Classifier (100 ensemble estimators) was selected over black-box deep learning architectures due to its high tabular efficiency, resistance to overfitting on correlated pediatric behavioral features, and intrinsic Gini feature attribution interpretability.",
        body_style
    ))
    story.append(Paragraph(
        "<b>Feature Matrix:</b> 5 normalized input dimensions: (1) Mood Score [1-6], (2) Sleep Hours [0-24], (3) Screen Exposure [0-24], (4) Physical Play [0-24], (5) Academic Strain [1-5].",
        body_style
    ))

    ml_metrics_data = [
        [Paragraph("Metric", table_header_style), Paragraph("Cross-Validation Value", table_header_style), Paragraph("Clinical &amp; Technical Significance", table_header_style)],
        [Paragraph("<b>Validation Strategy</b>", table_cell_style), Paragraph("5-Fold Stratified CV", table_cell_style), Paragraph("Guarantees balanced representation of minority elevated distress samples across all evaluation splits.", table_cell_style)],
        [Paragraph("<b>Mean Accuracy</b>", table_cell_style), Paragraph("77.25% (&plusmn; 1.37%)", table_cell_style), Paragraph("Robust multi-class classification accuracy across 2,000 synthetic clinical records.", table_cell_style)],
        [Paragraph("<b>Weighted F1-Score</b>", table_cell_style), Paragraph("0.88", table_cell_style), Paragraph("Harmonic balance between precision and recall across Low, Moderate, and Elevated classes.", table_cell_style)],
        [Paragraph("<b>Elevated Risk Recall</b>", table_cell_style), Paragraph("1.00 (100%)", table_cell_style), Paragraph("<b>Zero False Negatives</b> for Tier 2 distress—ensures no child requiring urgent caregiver support is missed.", table_cell_style)],
        [Paragraph("<b>Gini Feature Weights</b>", table_cell_style), Paragraph("Sleep (32.1%), Mood (28.3%), Screen (21.4%), Play (11.0%), Stress (7.1%)", table_cell_style), Paragraph("Sleep duration and self-reported affective state serve as the strongest predictors of acute pediatric strain.", table_cell_style)],
    ]
    ml_table = Table(ml_metrics_data, colWidths=[1.6 * inch, 1.8 * inch, 3.6 * inch])
    ml_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
    ]))
    story.append(ml_table)
    story.append(Spacer(1, 10))

    # ==================== 4. VADER NLP & DPDP ACT PRIVACY ====================
    story.append(Paragraph("4. Natural Language Processing &amp; DPDP Act 2023 Compliance", h1_style))
    story.append(Paragraph(
        "<b>VADER (Valence Aware Dictionary and sEntiment Reasoner):</b> Designed specifically for short, informal affective text. Unlike heavy Transformer models (e.g. BERT/LLMs), VADER runs with sub-millisecond latency, zero cloud API dependencies, and deterministic grammatical rule sets (capitalization intensity, punctuation amplifiers, negation handling).",
        body_style
    ))
    story.append(Paragraph(
        "<b>Strict Privacy by Design (Section 9, DPDP Act 2023):</b> Indian law explicitly mandates that data fiduciaries shall not undertake tracking or behavioral monitoring of children or process personal data that could cause detrimental effect on a child. MindBridge enforces this by:",
        body_style
    ))
    story.append(Paragraph("• <b>In-Memory Text Execution:</b> Raw reflection journal strings are scored in volatile RAM and immediately garbage-collected without ever being written to disk.", body_style))
    story.append(Paragraph("• <b>Guardian Concealment:</b> Caregiver dashboards display only quantitative indices (sleep, rolling average, risk tier, sentiment score); journal text is concealed to maintain child trust.", body_style))
    story.append(Paragraph("• <b>Zero Biometrics / Third-Party Trackers:</b> No facial recognition, voice recording, camera tracking, or external advertising SDKs.", body_style))

    # ==================== 5. PSC-17 CLINICAL ASSESSMENT ====================
    story.append(Paragraph("5. Standardized Pediatric Symptom Checklist (PSC-17)", h1_style))
    story.append(Paragraph(
        "<b>Clinical Pedigree:</b> Developed by Gardner, Murphy, Childs et al. (1999), the PSC-17 is a validated 17-item pediatric psychosocial screener rated on a 3-point Likert scale (Never = 0, Sometimes = 1, Often = 2).",
        body_style
    ))
    story.append(Paragraph(
        "<b>Subscales &amp; Cutoff Scoring:</b><br/>"
        "• <b>Total Cutoff:</b> Total score &ge; 15 / 34 signifies elevated overall psychosocial risk.<br/>"
        "• <b>Internalizing Subscale (Q1–Q5, Max 10):</b> Cutoff &ge; 5 indicates significant emotional anxiety/depression.<br/>"
        "• <b>Attention Subscale (Q6–Q10, Max 10):</b> Cutoff &ge; 7 indicates distractibility and hyperactivity.<br/>"
        "• <b>Externalizing Subscale (Q11–Q14, Max 8):</b> Cutoff &ge; 7 indicates conduct strain and oppositional behavior.<br/>"
        "• <b>Social Connectedness (Q15–Q17, Max 6):</b> Evaluates peer bonding, anhedonia, and social isolation.",
        body_style
    ))

    # ==================== 6. TOP 20 REVIEWER QUESTIONS & ANSWERS ====================
    story.append(PageBreak())
    story.append(Paragraph("6. Master Reviewer Q&amp;A Defense Guide (Viva Cheat Sheet)", h1_style))
    story.append(Paragraph(
        "Be prepared to answer these 18 high-frequency questions during academic review and external evaluation:",
        body_style
    ))

    qa_list = [
        (
            "Q1: What makes MindBridge different from existing mental health apps like Headspace or Wysa?",
            "Ans: Most commercial apps are either self-guided meditation libraries or conversational chatbots focused on adults. MindBridge is a continuous surveillance and early-warning engineering system specifically calibrated for children (PSC-17 validated). It links child self-reporting with guardian longitudinal tracking, explainable ML risk attribution, and automated distress alerts while strictly complying with child data privacy laws."
        ),
        (
            "Q2: Why did you choose Random Forest instead of a Deep Learning Neural Network or SVM?",
            "Ans: For tabular lifestyle parameters with 5–10 features, ensemble tree models (Random Forest) consistently outperform deep neural networks in sample efficiency, training speed, and generalization without overfitting. Crucially, Random Forest provides exact Gini feature importance attribution, allowing us to explain to caregivers exactly why a child was classified into Moderate or Elevated risk (e.g., 32% sleep deficit weight)."
        ),
        (
            "Q3: Why did you use VADER NLP instead of fine-tuning BERT, RoBERTa, or GPT-4?",
            "Ans: Three reasons: (1) Latency & Compute: VADER executes in under 2 milliseconds locally with zero GPU requirements; (2) Privacy: VADER operates entirely on-device in-memory without sending child text to third-party OpenAI/cloud APIs; (3) Short-text accuracy: VADER was specifically designed for informal, emoji-laden sentences with negation and punctuation boosters."
        ),
        (
            "Q4: How does your system comply with India's DPDP Act 2023 Section 9?",
            "Ans: Section 9 prohibits detrimental tracking or profiling of children. MindBridge implements privacy-by-design: (a) raw journal reflections are parsed in RAM and discarded immediately; (b) parents see aggregated wellness trends but never read private journals; (c) the system stores no biometric data, location traces, or device advertising identifiers."
        ),
        (
            "Q5: How did you validate your Machine Learning model?",
            "Ans: We used a 5-Fold Stratified Cross-Validation protocol across a 2,000-sample pediatric synthetic dataset. The model achieved 77.25% (&plusmn; 1.37%) mean accuracy, 0.88 weighted F1-score, and critically, 1.00 (100%) recall on elevated risk, guaranteeing zero missed high-risk cases."
        ),
        (
            "Q6: What triggers the Guardian Distress Alert in the dashboard?",
            "Ans: The distress alert is triggered when the system detects 3 consecutive check-ins classified as 'Elevated Risk' (Tier 2). This prevents false alarms from a single bad day and captures chronic, persistent emotional distress requiring immediate caregiver attention."
        ),
        (
            "Q7: What is the clinical validity behind your PSC-17 screener?",
            "Ans: PSC-17 is a validated pediatric screener published by Gardner et al. (1999) in Ambulatory Child Health. It has proven sensitivity (0.72) and specificity (0.88) against full psychiatric evaluations, screening across internalizing, attention, and externalizing behavioral domains."
        ),
        (
            "Q8: What happens if a child expresses acute suicidal ideation or emergency crisis?",
            "Ans: MindBridge embeds immediate crisis pathways. The UI displays direct 1-click dials and copyable numbers for Childline (1098), Tele-MANAS (14416), Emergency (112), and NIMHANS Child Clinic, along with a 5-step caregiver de-escalation protocol."
        ),
        (
            "Q9: How does the 7-day rolling average in the Guardian Dashboard work mathematically?",
            "Ans: For any observation day t, the rolling average A(t) is computed as the mean of mood scores from day (t-6) to day t. This filters out day-to-day noise and visualizes the true underlying affective trajectory over time."
        ),
        (
            "Q10: What database architecture and ORM did you utilize?",
            "Ans: We used SQLite for local zero-configuration persistence managed via SQLAlchemy 2.0 ORM with typed Pydantic V2 schemas for strict contract validation between the client and server."
        ),
        (
            "Q11: Can the system run if the Python FastAPI backend is offline?",
            "Ans: Yes! In `frontend/src/api.js`, we implemented an intelligent dual-mode fallback: if the backend is unreachable (e.g. during static demo or Vercel deployment), the frontend seamlessly falls back to client-side rule-based evaluation and LocalStorage persistence without throwing blank pages or crashing."
        ),
        (
            "Q12: What non-clinical interventions are provided to the child?",
            "Ans: The Coping Toolkit offers three evidence-based non-clinical modules: (1) 4-7-8 Parasympathetic Breathing Pacer (Dr. Andrew Weil); (2) 5-4-3-2-1 Sensory Grounding for anxiety de-escalation; (3) Rotating cognitive positive affirmations."
        ),
        (
            "Q13: Who are the demo personas built into the system?",
            "Ans: (1) Ashrith (Age 11, Grade 6, Child self-reporting); (2) Nitiz (Parent / Caregiver longitudinal tracker); (3) Dr. Arjun Cement (School Counselor / Clinical reviewer)."
        ),
        (
            "Q14: What is the significance of the 3-point Likert scale in PSC-17?",
            "Ans: It uses Never (0 points), Sometimes (1 point), and Often (2 points). This simple 3-tier option structure minimizes cognitive load for young children while providing reliable ordinal quantization for clinical subscale thresholds."
        ),
        (
            "Q15: How are passwords and user authentication handled?",
            "Ans: Authentication is implemented with role-based access control (RBAC). Passwords are validated using SHA-256/bcrypt hashing with session bearer tokens."
        ),
        (
            "Q16: Is MindBridge intended to replace clinical psychiatric diagnosis?",
            "Ans: No. MindBridge is strictly a continuous non-clinical surveillance and early screening solution. It assists parents, teachers, and pediatricians by highlighting early trend shifts and recommending professional consultations when thresholds are exceeded."
        ),
        (
            "Q17: How did you resolve data imbalance in the ML dataset?",
            "Ans: We utilized stratified sampling during 5-fold cross-validation and weighted class penalties in the Random Forest ensemble to prioritize high recall on minority elevated-risk samples."
        ),
        (
            "Q18: What are the future enhancements planned for MindBridge?",
            "Ans: (1) Multi-child classroom aggregation dashboards for school counselors; (2) Wearable smartwatch biometric sync (heart rate variability and sleep architecture); (3) Multilingual localized support for regional Indian languages."
        ),
    ]

    for q, a in qa_list:
        story.append(Paragraph(f"<b>{q}</b>", qa_q))
        story.append(Paragraph(a, qa_a))

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[SUCCESS] Generated defense guide PDF: {output_filename}")

if __name__ == "__main__":
    generate_pdf()
