"""
Abhishek M R - Personal Project Viva & Defense Handbook Generator.
Produces a publication-quality PDF specifically tailored to Abhishek's role:
Frontend Engineering & Full-Stack System Integration.
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
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
            self.drawString(54, 11 * inch - 36, "Abhishek M R — Frontend & System Integration Defense Handbook")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(54, 11 * inch - 42, 8.5 * inch - 54, 11 * inch - 42)
        
        # Footer
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * inch - 54, 36, page_text)
        self.drawString(54, 36, "Presidency University • B.Tech CSE • Academic Year 2026–2027")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 46, 8.5 * inch - 54, 46)
        self.restoreState()

def generate_pdf(output_filename="Abhishek_MR_Viva_Defense_Guide.pdf"):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    PRIMARY = colors.HexColor("#0f172a") # Slate 900
    SECONDARY = colors.HexColor("#334155") # Slate 700
    ACCENT = colors.HexColor("#0369a1") # Sky 700
    BG_LIGHT = colors.HexColor("#f8fafc")
    BORDER_COLOR = colors.HexColor("#e2e8f0")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
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
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=PRIMARY,
        spaceBefore=12,
        spaceAfter=5,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=ACCENT,
        spaceBefore=8,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=SECONDARY,
        spaceAfter=5
    )

    qa_q = ParagraphStyle(
        'QA_Q',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=PRIMARY,
        spaceBefore=7,
        spaceAfter=2,
        keepWithNext=True
    )

    qa_a = ParagraphStyle(
        'QA_A',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.8,
        leading=12.5,
        textColor=SECONDARY,
        spaceAfter=7
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

    # ==================== HEADER / PROFILE ====================
    story.append(Paragraph("Abhishek M R — Personal Viva Defense Handbook", title_style))
    story.append(Paragraph("Role: Frontend Architecture, Clinical UI Design &amp; Full-Stack System Integration", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceAfter=10))

    profile_data = [
        [
            Paragraph("<b>Student Name:</b> Abhishek M R", body_style),
            Paragraph("<b>University Seat No (USN):</b> 20231CSE0268", body_style)
        ],
        [
            Paragraph("<b>Assigned Role:</b> Frontend &amp; System Integration", body_style),
            Paragraph("<b>Project Guide:</b> Mr. Jetti Satya Sai Kumar", body_style)
        ],
        [
            Paragraph("<b>Project Title:</b> MindBridge: Child Mental Health Surveillance", body_style),
            Paragraph("<b>Institution:</b> Presidency University, Bengaluru (2026–2027)", body_style)
        ]
    ]
    profile_table = Table(profile_data, colWidths=[3.6 * inch, 3.4 * inch])
    profile_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(profile_table)
    story.append(Spacer(1, 8))

    # ==================== 30-SECOND OPENING PITCH ====================
    story.append(Paragraph("1. Your 30-Second Opening Statement to the Examiners", h1_style))
    story.append(Paragraph(
        "<i>\"Good morning, respected examiners. My name is <b>Abhishek M R</b>, and my core contribution to MindBridge was <b>Frontend Engineering &amp; Full-Stack System Integration</b>. I built the responsive single-page React architecture, designed the child-friendly daily check-in and standardized PSC-17 pediatric assessment interfaces, engineered the dual-mode API integration layer with FastAPI, and optimized the client performance to achieve a <b>92/100 Lighthouse Performance score</b> and <b>0 ms Total Blocking Time</b>.\"</i>",
        body_style
    ))
    story.append(Spacer(1, 6))

    # ==================== 5 CORE AREAS BREAKDOWN ====================
    story.append(Paragraph("2. Deep-Dive Breakdown of Your Assigned Areas", h1_style))

    # Area 1
    story.append(Paragraph("A. React Frontend Architecture &amp; Route Code-Splitting", h2_style))
    story.append(Paragraph(
        "• <b>Framework &amp; Bundler:</b> Developed using <b>React 19</b> with <b>Vite 8</b> (Rolldown engine) for sub-second development builds and optimized production tree-shaking.<br/>"
        "• <b>Design System:</b> Engineered a bespoke, institutional flat design system with Tailwind CSS (1px crisp borders, zero glow effects, high contrast).<br/>"
        "• <b>Dynamic Code-Splitting:</b> Implemented <code>React.lazy()</code> and <code>Suspense</code> on all major views (ChildAssessment, GuardianDashboard, Diagnostics, CopingToolkit, CrisisResources, Auth). Reduced initial JavaScript bundle from <b>774 KB down to 283 KB</b> (85.7 KB gzipped) with a <b>1.4s First Contentful Paint</b>.",
        body_style
    ))

    # Area 2
    story.append(Paragraph("B. Child Daily Mood &amp; Lifestyle Check-in Interface (CheckIn.jsx)", h2_style))
    story.append(Paragraph(
        "• <b>Cognitive Load Reduction:</b> Implemented 6 single-tap affective emoji anchors with descriptive helper subtitles (Joyful = 6, Calm = 5, Neutral = 4, Worried = 3, Sad = 2, Frustrated = 1).<br/>"
        "• <b>Lifestyle Sliders:</b> Built 4 interactive range sliders with real-time numeric readouts and health benchmarks: Sleep (4–12h, 9–11h ideal), Screen Exposure (0–8h, &le;2h recommended), Physical Play (0–4h, &ge;1h recommended), and School Stress (1–5 scale).<br/>"
        "• <b>In-Memory Journal (DPDP Act 2023 Section 9):</b> Configured volatile RAM-only sentiment processing—journal reflections are scored for VADER compound valence in-memory and <b>never persisted to database disk</b>.<br/>"
        "• <b>Diagnostic Card:</b> Renders real-time Random Forest risk tier (0/1/2), Gini factor attribution explanation, VADER sentiment valence, and supportive affirmations.",
        body_style
    ))

    # Area 3
    story.append(Paragraph("C. Standardized Pediatric Assessment Interface (ChildAssessment.jsx)", h2_style))
    story.append(Paragraph(
        "• <b>Clinical Pedigree (PSC-17):</b> Built the validated 17-item Pediatric Symptom Checklist screener (Gardner et al., 1999) using a 3-point Likert scale (Never = 0, Sometimes = 1, Often = 2).<br/>"
        "• <b>Subscale Tab Filtering:</b> Category filters for Internalizing (Q1–Q5), Attention (Q6–Q10), Externalizing (Q11–Q14), and Social Connectedness (Q15–Q17).<br/>"
        "• <b>Clinical Cutoff Scoring Logic:</b> Automatically computes total score (max 34) and evaluates against the clinical cutoff (&ge; 15). Flags subscale elevations: Internalizing &ge; 5/10, Attention &ge; 7/10, Externalizing &ge; 7/8.<br/>"
        "• <b>Evaluator Presets &amp; History:</b> Integrated 1-click test fillers (Normative Low, Elevated Distress, Focus Strain), printable clinical summary report, and SQLite longitudinal history drawer.",
        body_style
    ))

    # Area 4
    story.append(Paragraph("D. Frontend-to-Backend API System Integration (api.js)", h2_style))
    story.append(Paragraph(
        "• <b>RESTful Gateway:</b> Structured async <code>fetch</code> API client communicating with FastAPI endpoints over HTTP/JSON with CORS middleware headers.<br/>"
        "• <b>Dual-Mode Standalone Fallback:</b> Engineered client-side machine learning rules (<code>evaluateClientCheckin</code>) and psychometric scoring (<code>evaluateClientAssessment</code>) with <code>localStorage</code> persistence. Ensures 100% functionality on static cloud hosts (Vercel) even when the backend is offline.<br/>"
        "• <b>Health Heartbeat:</b> Background polling (15s interval) controlling a live API status dot in the navigation header.",
        body_style
    ))

    # Area 5
    story.append(Paragraph("E. UI/UX Polishing, Performance Optimization &amp; Debugging", h2_style))
    story.append(Paragraph(
        "• <b>Lighthouse Audit Score:</b> <b>Performance: 92/100</b> | <b>Best Practices: 100/100</b> | <b>SEO: 100/100</b> | <b>Total Blocking Time: 0 ms</b>.<br/>"
        "• <b>Font Optimization:</b> Replaced blocking CSS <code>@import</code> with preconnected, preloaded asynchronous font headers in <code>index.html</code>.<br/>"
        "• <b>Persona Hub:</b> Standardized state management for pre-configured roles: <b>Ashrith</b> (Child, Age 11), <b>Nitiz</b> (Guardian / Parent), and <b>Dr. Arjun Cement</b> (Clinician / Counselor).",
        body_style
    ))

    # ==================== QUICK REFERENCE METRICS TABLE ====================
    story.append(Spacer(1, 4))
    story.append(Paragraph("3. Abhishek's Quick Reference Technical Cheat Sheet", h1_style))

    cheat_data = [
        [Paragraph("Parameter / Component", table_header_style), Paragraph("Value / Implementation", table_header_style), Paragraph("Technical &amp; Academic Details", table_header_style)],
        [Paragraph("<b>Frontend Framework</b>", table_cell_style), Paragraph("React 19 + Vite 8", table_cell_style), Paragraph("Single-Page Application (SPA) with declarative component architecture", table_cell_style)],
        [Paragraph("<b>Lighthouse Metrics</b>", table_cell_style), Paragraph("Perf: 92, SEO: 100, TBT: 0ms", table_cell_style), Paragraph("FCP: 1.4s, LCP: 1.5s, Speed Index: 1.4s (Production build)", table_cell_style)],
        [Paragraph("<b>Bundle Optimization</b>", table_cell_style), Paragraph("283 KB (85.7 KB gzip)", table_cell_style), Paragraph("Route-level lazy loading via React.lazy and Suspense", table_cell_style)],
        [Paragraph("<b>PSC-17 Total Cutoff</b>", table_cell_style), Paragraph("Total Score &ge; 15 / 34", table_cell_style), Paragraph("Gardner et al. (1999) clinical threshold for psychosocial consultation", table_cell_style)],
        [Paragraph("<b>PSC-17 Subscale Cutoffs</b>", table_cell_style), Paragraph("Int &ge; 5/10, Att &ge; 7/10, Ext &ge; 7/8", table_cell_style), Paragraph("Internalizing (Emotional), Attention (ADHD), Externalizing (Conduct)", table_cell_style)],
        [Paragraph("<b>Privacy Baseline</b>", table_cell_style), Paragraph("DPDP Act 2023 (Section 9)", table_cell_style), Paragraph("Child reflections analyzed in-memory only; raw text never written to disk", table_cell_style)],
        [Paragraph("<b>API Client Mode</b>", table_cell_style), Paragraph("Dual-Mode (Online / Fallback)", table_cell_style), Paragraph("FastAPI REST over HTTP with seamless LocalStorage client fallback", table_cell_style)],
        [Paragraph("<b>Demo Personas</b>", table_cell_style), Paragraph("Ashrith, Nitiz, Dr. Arjun Cement", table_cell_style), Paragraph("Pre-seeded role catalog for instant 1-click evaluator demonstrations", table_cell_style)],
    ]
    cheat_table = Table(cheat_data, colWidths=[1.7 * inch, 1.8 * inch, 3.5 * inch])
    cheat_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
    ]))
    story.append(cheat_table)

    # ==================== TOP 10 REVIEWER QUESTIONS & VERBATIM ANSWERS ====================
    story.append(PageBreak())
    story.append(Paragraph("4. Master Reviewer Q&amp;A Defense (Top 10 Questions for Abhishek)", h1_style))
    story.append(Paragraph("Here are the exact questions examiners will ask you regarding frontend and system integration, with model answers:", body_style))

    qa_list = [
        (
            "Q1: What was your specific, individual contribution to this project?",
            "Ans: I was responsible for Frontend Engineering and Full-Stack System Integration. I built the entire React web application, created the Child Mood Check-in and PSC-17 Pediatric Assessment interfaces, integrated the client with the FastAPI REST backend via asynchronous API endpoints, implemented the dual-mode client fallback logic, and optimized performance to achieve a 92/100 Lighthouse score."
        ),
        (
            "Q2: Why did you choose React and Vite instead of vanilla HTML or Next.js?",
            "Ans: We chose React for its component reusability and declarative state management, which is essential for dynamic UI elements like multi-slider lifestyle inputs, dynamic charting, and questionnaire scoring. We used Vite because its native ES-module dev server and Rolldown production bundler build our entire application in under 750ms with automatic tree-shaking."
        ),
        (
            "Q3: How does the Child Check-in interface minimize cognitive load for young children?",
            "Ans: Children aged 6–17 cannot be expected to fill long clinical forms. In CheckIn.jsx, I implemented single-tap affective emoji anchors with descriptive subtitles and intuitive horizontal range sliders with health guidelines (e.g., '9-11h ideal sleep'). The child can complete a full self-report in under 30 seconds."
        ),
        (
            "Q4: How does the frontend handle clinical cutoff scoring for PSC-17?",
            "Ans: In ChildAssessment.jsx, 17 questions are mapped across 4 subscales. Each question is scored on a 3-point Likert scale (0 for Never, 1 for Sometimes, 2 for Often). When submitted, the system computes the total score (max 34). If total score is >= 15, or if the internalizing subscale is >= 5, or attention >= 7, it flags the respective domain and displays targeted psychoeducational recommendations."
        ),
        (
            "Q5: How does your frontend ensure data privacy under the DPDP Act 2023?",
            "Ans: Under Section 9 of the DPDP Act, children's personal reflections cannot be stored detrimentally. In the frontend, the reflection journal is explicitly marked as 'in-memory only'. When sent to the backend, it is evaluated for sentiment compound in volatile RAM and immediately discarded—it is never written to disk or displayed on the Guardian Dashboard."
        ),
        (
            "Q6: How did you connect the React frontend with the FastAPI backend?",
            "Ans: In frontend/src/api.js, I created modular async wrapper functions using standard fetch. The backend is configured with FastAPI CORS middleware to accept requests from our client. We pass structured JSON payloads validated against Pydantic schemas on the server and receive strongly-typed JSON responses."
        ),
        (
            "Q7: What happens if the Python backend goes down during a live demo?",
            "Ans: I built a dual-mode client fallback in api.js. If fetch fails or the backend is offline, the client automatically catches the error and runs client-side psychometric scoring (evaluateClientAssessment) and lifestyle risk estimation using localStorage. The user experiences zero crashes or blank screens."
        ),
        (
            "Q8: How did you optimize the frontend performance for Google Lighthouse?",
            "Ans: I did three key things: (1) Implemented route-level code splitting using React.lazy and Suspense, dropping initial JS payload from 774 KB to 283 KB; (2) Removed render-blocking @import CSS font calls and replaced them with preconnected DNS prefetch headers in index.html; (3) Added standard robots.txt and semantic metadata, bringing our SEO to 100/100 and Performance to 92/100 with 0 ms Total Blocking Time."
        ),
        (
            "Q9: How are the longitudinal charts rendered on the Guardian Dashboard?",
            "Ans: We use Recharts, a composable React charting library built on SVG. It renders an AreaChart for daily mood trajectories, a LineChart for the 7-day rolling average, a PieChart for risk tier distribution, and a multi-line chart correlating sleep, screen time, physical play, and school stress."
        ),
        (
            "Q10: How is user authentication and persona switching managed in the UI?",
            "Ans: In Auth.jsx and Navbar.jsx, we maintain active user state using React state synced with localStorage. Users can switch between 3 pre-seeded demo personas (Ashrith for Child, Nitiz for Guardian, Dr. Arjun Cement for Clinician) or register a custom account with role-specific views."
        ),
    ]

    for q, a in qa_list:
        story.append(Paragraph(f"<b>{q}</b>", qa_q))
        story.append(Paragraph(a, qa_a))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[SUCCESS] Generated Abhishek Viva Guide PDF: {output_filename}")

if __name__ == "__main__":
    generate_pdf()
