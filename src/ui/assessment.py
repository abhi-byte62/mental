"""
Pediatric Symptom Checklist (PSC-17) Streamlit UI Page.

Provides a child and caregiver standardized screening interface based on
Gardner et al. (1999) with subscale scoring, real-time evaluation, and clinical feedback.
"""

import streamlit as st
from src.data.assessment_psc17 import PSC17_QUESTIONS, evaluate_psc17


def render() -> None:
    st.markdown("## 📋 Child Standardized Assessment (PSC-17)")
    st.markdown(
        "*Pediatric Symptom Checklist — Validated 17-item psychosocial screener (Gardner et al., 1999). "
        "Measures emotional, attention, and conduct well-being.*"
    )
    
    st.info(
        "ℹ️ **Caregiver/Educator Guidance:** Choose Never (0), Sometimes (1), or Often (2) for how much each statement describes the child's thoughts, feelings, or behaviors recently."
    )
    st.divider()

    child_age = st.slider("Child's Age (years)", min_value=4, max_value=18, value=11, step=1)
    
    # Preset testing buttons
    col_p1, col_p2, col_p3 = st.columns(3)
    with col_p1:
        if st.button("🌱 Load Healthy Preset"):
            st.session_state["psc_preset"] = "healthy"
    with col_p2:
        if st.button("⚠️ Load Elevated Preset"):
            st.session_state["psc_preset"] = "elevated"
    with col_p3:
        if st.button("🎯 Load Focus Preset"):
            st.session_state["psc_preset"] = "attention"

    preset = st.session_state.get("psc_preset", None)

    # Question map
    options_map = {"Never (0 pts)": 0, "Sometimes (1 pt)": 1, "Often (2 pts)": 2}

    answers = {}

    # Category grouping
    categories = [
        ("internalizing", "💙 Emotional Well-being (Internalizing)"),
        ("attention", "🎯 Focus & Attention (Attention)"),
        ("externalizing", "🤝 Behavior & Conduct (Externalizing)"),
        ("social", "👥 Social Connectedness (Adaptive)"),
    ]

    for cat_key, cat_label in categories:
        cat_questions = [q for q in PSC17_QUESTIONS if q["category"] == cat_key]
        if not cat_questions:
            continue

        with st.expander(f"{cat_label} ({len(cat_questions)} items)", expanded=True):
            for q in cat_questions:
                # Default selection based on preset
                default_idx = 0
                if preset == "healthy":
                    default_idx = 1 if (q["id"] % 4 == 0) else 0
                elif preset == "elevated":
                    if q["category"] == "internalizing":
                        default_idx = 2
                    elif q["category"] in ("attention", "social"):
                        default_idx = 1
                elif preset == "attention":
                    if q["category"] == "attention":
                        default_idx = 2

                val_str = st.radio(
                    f"**{q['id']}. {q['text']}**",
                    options=list(options_map.keys()),
                    index=default_idx,
                    key=f"psc_q_{q['id']}",
                    help=q.get("help_text", "")
                )
                answers[str(q["id"])] = options_map[val_str]

    st.divider()

    if st.button("📊 Evaluate Assessment & Generate Report", type="primary", use_container_width=True):
        res = evaluate_psc17(answers, child_age=child_age)
        
        st.markdown("### 📋 Clinical Diagnostic Summary")
        
        # Risk Badge
        risk_color = res["risk_color"]
        st.markdown(
            f"""
            <div style="padding:14px; border-radius:8px; border:2px solid {risk_color}; background-color:{risk_color}15; margin-bottom:16px;">
                <h3 style="margin:0; color:{risk_color};">{res['risk_label']} (Tier {res['risk_tier']})</h3>
                <p style="margin:4px 0 0 0; font-size:14px; color:#333;">{res['summary']}</p>
                <p style="margin:4px 0 0 0; font-weight:bold; font-size:15px; color:#111;">
                    Total Score: {res['total_score']} / {res['max_total_score']} 
                    (Clinical cutoff: ≥ 15 — {'MET' if res['clinical_cutoff_met'] else 'NOT MET'})
                </p>
            </div>
            """,
            unsafe_allow_html=True
        )

        # Subscales
        st.markdown("#### 🔬 Subscale Breakdown")
        sub_cols = st.columns(len(res["subscales"]))
        for idx, (sub_k, sub_v) in enumerate(res["subscales"].items()):
            with sub_cols[idx]:
                badge = "⚠️ FLAGGED" if sub_v["flagged"] else "✅ NORMATIVE"
                st.metric(
                    label=f"{sub_v['name']}",
                    value=f"{sub_v['score']} / {sub_v['max_score']}",
                    delta=f"Cutoff ≥ {sub_v['cutoff']} ({badge})"
                )
                st.caption(sub_v["interpretation"])

        # Recommendations
        st.markdown("#### 💡 Actionable Guidance & Recommendations")
        for rec in res["recommendations"]:
            st.markdown(f"- {rec}")
