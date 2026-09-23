"""
MindBridge — Mental Health and Well-being Surveillance,
Assessment and Tracking Solution Among Children.

Main Streamlit Application Entry Point.

Academic Prototype | Presidency University, Bengaluru
Students  : Harsha R (20231CSE0261)
            Arjun M (20231CSE0277)
            Abhishek MR (20231CSE0268)
Guide     : Mr. Jetti Satya Sai Kumar
Academic Year: 2026–2027

MEDICAL DISCLAIMER:
    This is a non-clinical academic research prototype for early well-being
    surveillance, longitudinal tracking, and psychoeducational decision support.
    It does NOT provide medical diagnoses, psychiatric evaluations, or clinical
    therapies.  All generated outputs are computational approximations based on
    self-reported inputs.  Consult qualified healthcare professionals for all
    clinical concerns.

Run:
    streamlit run app.py
"""

import os
import sys

# Ensure the project root is on the Python path so that `src.*` imports work
# regardless of the working directory from which the app is launched.
_ROOT = os.path.dirname(os.path.abspath(__file__))
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

import streamlit as st

from src.utils.session import init_session_state
from src.ui            import checkin, coping, dashboard, crisis, assessment

# ---------------------------------------------------------------------------
# Navigation Options
# ---------------------------------------------------------------------------
_PAGES = {
    "🏠 Home":              "home",
    "😊 Daily Check-in":   "checkin",
    "📋 Child Assessment": "assessment",
    "🌬️ Coping Tools":    "coping",
    "📊 Guardian Dashboard": "dashboard",
    "🆘 Crisis Resources": "crisis",
}


# ---------------------------------------------------------------------------
# Page Configuration
# ---------------------------------------------------------------------------

def _configure_page() -> None:
    st.set_page_config(
        page_title     = "MindBridge | Child Well-being Tracker",
        page_icon      = "🧠",
        layout         = "wide",
        initial_sidebar_state = "expanded",
        menu_items     = {
            "About": (
                "**MindBridge** — Academic prototype for child well-being surveillance.\n\n"
                "Student: Harsha R (20231CSE0261) | Presidency University, Bengaluru."
            ),
        },
    )


# ---------------------------------------------------------------------------
# Sidebar
# ---------------------------------------------------------------------------

def _render_sidebar() -> str:
    """Render the navigation sidebar and return the selected page key."""
    with st.sidebar:
        st.markdown(
            """
            <div style="text-align:center; padding: 8px 0 20px 0;">
                <span style="font-size:38px;">🧠</span>
                <h2 style="margin: 4px 0 2px 0; color:#2c3e50;">MindBridge</h2>
                <p style="margin:0; color:#7f8c8d; font-size:13px;">
                    Child Well-being Tracker
                </p>
            </div>
            """,
            unsafe_allow_html=True,
        )

        st.divider()

        selected = st.radio(
            "Navigate",
            options=list(_PAGES.keys()),
            label_visibility="collapsed",
        )

        st.divider()

        # Last check-in status indicator
        if st.session_state.last_risk_tier is not None:
            from src.data.schema import RISK_TIERS
            tier      = st.session_state.last_risk_tier
            tier_info = RISK_TIERS[tier]
            st.markdown("**Last Check-in Status:**")
            st.markdown(
                f"<span style='color:{tier_info['color']};font-weight:700;font-size:15px;'>"
                f"{tier_info['emoji']} {tier_info['label']}</span>",
                unsafe_allow_html=True,
            )
            st.divider()

        # Quick crisis card
        st.markdown(
            """
            <div style="
                background:#c0392b0d;
                border:1px solid #c0392b33;
                border-radius:10px;
                padding:11px 12px;
                text-align:center;
            ">
                <p style="margin:0; font-size:13px; color:#922b21; line-height:1.6;">
                    🆘 <strong>Emergency?</strong><br>
                    Childline &nbsp;<strong>1098</strong><br>
                    Tele-MANAS &nbsp;<strong>14416</strong>
                </p>
            </div>
            """,
            unsafe_allow_html=True,
        )

        st.divider()

        st.caption(
            "⚕️ *Non-clinical academic prototype.*\n\n"
            "Presidency University, Bengaluru\n\n"
            "Harsha R · Arjun M · Abhishek MR"
        )

    return selected


# ---------------------------------------------------------------------------
# Home Page
# ---------------------------------------------------------------------------

def _render_home() -> None:
    st.markdown(
        """
        <div style="text-align:center; padding: 30px 0 10px 0;">
            <span style="font-size:64px;">🧠</span>
            <h1 style="font-size:2.6rem; margin:10px 0 4px 0;">MindBridge</h1>
            <h3 style="color:#7f8c8d; font-weight:400; margin:0;">
                Mental Health &amp; Well-being Surveillance for Children
            </h3>
            <p style="color:#95a5a6; margin-top:8px; font-size:14px;">
                Presidency University, Bengaluru &nbsp;|&nbsp;
                Harsha R (20231CSE0261) &nbsp;·&nbsp;
                Arjun M (20231CSE0277) &nbsp;·&nbsp;
                Abhishek MR (20231CSE0268)
            </p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    st.warning(
        "⚕️ **Medical Disclaimer:** This is a non-clinical academic prototype for "
        "well-being surveillance and does **NOT** provide medical diagnoses. "
        "Consult qualified healthcare professionals for all clinical concerns."
    )

    st.markdown("---")

    # Feature cards
    features = [
        ("😊", "Daily Check-in",     "Emoji mood picker + lifestyle sliders for daily assessment"),
        ("🤖", "AI Risk Assessment", "Random Forest ML classifier → Low / Moderate / Elevated tier"),
        ("📝", "Sentiment Analysis", "VADER NLP scoring on optional reflective journal entries"),
        ("🌬️", "Coping Toolkit",   "4-7-8 breathing pacer, grounding exercise & affirmations"),
        ("📊", "Guardian Dashboard","Longitudinal trend charts with privacy-preserving design"),
        ("🆘", "Crisis Referral",   "Verified Indian helplines — Childline 1098, Tele-MANAS 14416"),
    ]

    cols = st.columns(3)
    for i, (emoji, title, desc) in enumerate(features):
        with cols[i % 3]:
            st.markdown(
                f"""
                <div style="
                    border:1px solid #ecf0f1;
                    border-radius:14px;
                    padding:20px 18px;
                    text-align:center;
                    min-height:145px;
                    background:#f8f9fa;
                    margin-bottom:12px;
                ">
                    <div style="font-size:34px; margin-bottom:8px;">{emoji}</div>
                    <h4 style="margin:0 0 6px 0; font-size:15px;">{title}</h4>
                    <p style="font-size:13px; color:#7f8c8d; margin:0; line-height:1.5;">{desc}</p>
                </div>
                """,
                unsafe_allow_html=True,
            )

    st.markdown("---")

    col_child, col_guardian = st.columns(2)

    with col_child:
        st.markdown("### 👦 For Children")
        st.markdown("""
        - 😊 **Check in** daily using emoji mood picker
        - 📊 Track **sleep, screen time, play & stress**
        - ✏️ Write in your **private journal** *(optional)*
        - 🌬️ Use **breathing & grounding** tools when worried
        - 💙 Read **affirmations** to boost your mood
        """)
        if st.button("😊 Start My Daily Check-in", type="primary", use_container_width=True):
            st.session_state.current_page = "😊 Daily Check-in"
            st.rerun()

    with col_guardian:
        st.markdown("### 👨‍👩‍👧 For Parents & Educators")
        st.markdown("""
        - 📈 View **mood trend** charts and rolling averages
        - 🔍 Monitor **lifestyle patterns** over time
        - 🚨 Receive **distress alerts** for persistent concerns
        - 🔒 Child's **journal is never shown** — privacy protected
        - 📞 Instant access to **verified crisis helplines**
        """)
        if st.button("📊 Open Guardian Dashboard", type="secondary", use_container_width=True):
            st.session_state.current_page = "📊 Guardian Dashboard"
            st.rerun()

    st.markdown("---")

    with st.expander("ℹ️ Technical Architecture (Phase 2 Implementation)"):
        st.markdown("""
        **MindBridge** implements the 5-tier architecture designed in Phase 1:

        | Tier | Component | Technology |
        |---|---|---|
        | 1 — Presentation | Child Portal + Guardian Dashboard | Streamlit ≥ 1.35 |
        | 2 — Application Logic | Input validation, routing, session management | Python 3.11 |
        | 3 — ML Intelligence | Risk stratification (3-class) | Random Forest + StandardScaler |
        | 4 — NLP Intelligence | Journal sentiment analysis | VADER SentimentIntensityAnalyzer |
        | 5 — Data Persistence | Session-scoped anonymised check-in history | Local CSV (no PII) |

        **Team:**

        | Name | USN |
        |---|---|
        | Harsha R | 20231CSE0261 |
        | Arjun M | 20231CSE0277 |
        | Abhishek MR | 20231CSE0268 |

        **Guide:** Mr. Jetti Satya Sai Kumar | Presidency University, Bengaluru

        **Privacy-by-Design (DPDP Act 2023, Section 9):**
        - No personally identifiable information (PII) collected or stored
        - Journal text processed in-memory only — **never** persisted
        - Guardian dashboard displays only aggregate trends
        - ML and NLP inference runs fully locally — no external API calls
        """)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    _configure_page()
    init_session_state()

    # Resolve session-state page override (from in-page navigation buttons)
    override = st.session_state.get("current_page")
    if override:
        selected = override
        st.session_state.current_page = None          # consume the override
    else:
        selected = _render_sidebar()

    # Ensure sidebar reflects current selection when rendering after override
    if override:
        selected = _render_sidebar()

    # Route
    page_key = _PAGES.get(selected, "home")

    if page_key == "home":
        _render_home()
    elif page_key == "checkin":
        checkin.render()
    elif page_key == "assessment":
        assessment.render()
    elif page_key == "coping":
        coping.render()
    elif page_key == "dashboard":
        dashboard.render()
    elif page_key == "crisis":
        crisis.render()


if __name__ == "__main__":
    main()
