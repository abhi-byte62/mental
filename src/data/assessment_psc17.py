"""
Pediatric Symptom Checklist (PSC-17) Assessment Module.
Based on the validated 17-item psychosocial screener (Gardner et al., 1999).

Reference:
    Gardner, W., Murphy, M., Childs, G., Kelleher, K., Pagano, M., Jellinek, M., et al. (1999).
    The PSC-17: a brief pediatric symptom checklist with psychosocial subscales.
    Ambulatory Child Health, 5(3), 225-236.
"""

from typing import List, Dict, Any

# Standard 17 Questions structured for child/adolescent self-report & caregiver evaluation
PSC17_QUESTIONS: List[Dict[str, Any]] = [
    # --- Internalizing Subscale (Emotional State) ---
    {
        "id": 1,
        "category": "internalizing",
        "category_title": "Emotional Well-being",
        "text": "Do you often feel sad, down, or unhappy?",
        "help_text": "Feeling low or tearful during ordinary daily activities.",
    },
    {
        "id": 2,
        "category": "internalizing",
        "category_title": "Emotional Well-being",
        "text": "Do you feel hopeless, like things will not get better?",
        "help_text": "Pessimistic thoughts about school, friends, or future days.",
    },
    {
        "id": 3,
        "category": "internalizing",
        "category_title": "Emotional Well-being",
        "text": "Do you worry a lot about family, grades, or things going wrong?",
        "help_text": "Persistent apprehension or nervousness even when things are fine.",
    },
    {
        "id": 4,
        "category": "internalizing",
        "category_title": "Emotional Well-being",
        "text": "Do you feel bad or excessively hard on yourself?",
        "help_text": "Excessive self-criticism or guilt over small mistakes.",
    },
    {
        "id": 5,
        "category": "internalizing",
        "category_title": "Emotional Well-being",
        "text": "Do you feel afraid, tense, or anxious for no clear reason?",
        "help_text": "Sudden bodily feelings of dread or fear.",
    },

    # --- Attention Subscale (Cognitive & Focus) ---
    {
        "id": 6,
        "category": "attention",
        "category_title": "Focus & Attention",
        "text": "Do you feel fidgety or have trouble staying seated comfortably?",
        "help_text": "Constant physical restlessness during classes or quiet study.",
    },
    {
        "id": 7,
        "category": "attention",
        "category_title": "Focus & Attention",
        "text": "Do you daydream or get easily distracted from what you are doing?",
        "help_text": "Losing track of conversations, lessons, or reading assignments.",
    },
    {
        "id": 8,
        "category": "attention",
        "category_title": "Focus & Attention",
        "text": "Do you have trouble finishing tasks or homework you start?",
        "help_text": "Difficulty completing projects or chores without constant reminders.",
    },
    {
        "id": 9,
        "category": "attention",
        "category_title": "Focus & Attention",
        "text": "Do you act quickly without thinking about what might happen?",
        "help_text": "Impulsive choices or blurting out answers prematurely.",
    },
    {
        "id": 10,
        "category": "attention",
        "category_title": "Focus & Attention",
        "text": "Do you find it difficult to organize tasks and manage time?",
        "help_text": "Misplacing school materials, forgetting homework, or disorganization.",
    },

    # --- Externalizing Subscale (Behavioral Conduct) ---
    {
        "id": 11,
        "category": "externalizing",
        "category_title": "Behavior & Conduct",
        "text": "Do you get into frequent arguments or fights with peers or family?",
        "help_text": "Verbal clashes, physical disagreements, or persistent opposition.",
    },
    {
        "id": 12,
        "category": "externalizing",
        "category_title": "Behavior & Conduct",
        "text": "Do you find it difficult to listen to teachers or follow house rules?",
        "help_text": "Resistance to adult instructions or disciplinary guidance.",
    },
    {
        "id": 13,
        "category": "externalizing",
        "category_title": "Behavior & Conduct",
        "text": "Do you experience sudden bursts of anger or extreme irritability?",
        "help_text": "Intense temper flares disproportionate to the trigger.",
    },
    {
        "id": 14,
        "category": "externalizing",
        "category_title": "Behavior & Conduct",
        "text": "Do you blame others when things go wrong instead of accepting fault?",
        "help_text": "Difficulty taking responsibility for missteps or conflicts.",
    },

    # --- Social & Relational Subscale ---
    {
        "id": 15,
        "category": "social",
        "category_title": "Social Connectedness",
        "text": "Do you feel lonely or like nobody understands you?",
        "help_text": "Sense of social alienation or emotional withdrawal.",
    },
    {
        "id": 16,
        "category": "social",
        "category_title": "Social Connectedness",
        "text": "Have you lost interest in activities, sports, or games you used to enjoy?",
        "help_text": "Anhedonia or general apathy towards past hobbies.",
    },
    {
        "id": 17,
        "category": "social",
        "category_title": "Social Connectedness",
        "text": "Do you find it challenging to connect with or keep close friends?",
        "help_text": "Struggles with peer bonding, mutual trust, or social exclusion.",
    },
]


def evaluate_psc17(answers: Dict[str, int]) -> Dict[str, Any]:
    """
    Score the 17 PSC responses and calculate subscale and total risk.
    
    Parameters:
        answers: Map of question_id (as str or int) to int score:
                 0 = Never (0 pts)
                 1 = Sometimes (1 pt)
                 2 = Often (2 pts)
                 
    Returns:
        Structured evaluation dictionary with subscale breakdowns, clinical cutoff,
        risk tiers, and recommendations.
    """
    # Normalize keys to int
    clean_answers = {}
    for k, v in answers.items():
        try:
            clean_answers[int(k)] = max(0, min(2, int(v)))
        except (ValueError, TypeError):
            continue

    # Initialize subscale scores
    internalizing = sum(clean_answers.get(q_id, 0) for q_id in [1, 2, 3, 4, 5])
    attention = sum(clean_answers.get(q_id, 0) for q_id in [6, 7, 8, 9, 10])
    externalizing = sum(clean_answers.get(q_id, 0) for q_id in [11, 12, 13, 14])
    social = sum(clean_answers.get(q_id, 0) for q_id in [15, 16, 17])
    total_score = internalizing + attention + externalizing + social

    # Clinical Cutoffs from Gardner et al. (1999):
    # Total Score Cutoff: >= 15 indicates overall psychosocial risk
    # Internalizing Cutoff: >= 5 (out of 10)
    # Attention Cutoff: >= 7 (out of 10)
    # Externalizing Cutoff: >= 7 (out of 8)
    # Social Cutoff: >= 4 (out of 6)
    flag_internalizing = internalizing >= 5
    flag_attention = attention >= 7
    flag_externalizing = externalizing >= 7
    flag_social = social >= 4
    total_cutoff_met = total_score >= 15

    # Determine Overall Risk Tier
    if total_score >= 15 or flag_internalizing or flag_externalizing:
        risk_tier = 2
        risk_label = "Elevated Risk / Clinical Consultation Advised"
        risk_color = "#dc2626"
        summary = (
            "The assessment results cross the clinical screening cutoff threshold (PSC-17 Total ≥ 15 "
            "or elevated subscale score), suggesting significant psychosocial or emotional strain. "
            "A structured evaluation with a licensed child psychologist, school counselor, or pediatrician is recommended."
        )
    elif total_score >= 10 or attention >= 5 or internalizing >= 3:
        risk_tier = 1
        risk_label = "Moderate Risk / Monitoring & Psychoeducation Recommended"
        risk_color = "#d97706"
        summary = (
            "The assessment indicates mild to moderate strain in specific behavioral or affective domains. "
            "Targeted psychoeducational coping tools, structured sleep hygiene, and close parental monitoring are suggested."
        )
    else:
        risk_tier = 0
        risk_label = "Low Risk / Healthy Psychosocial Functioning"
        risk_color = "#059669"
        summary = (
            "The assessment scores remain well within normative healthy parameters. "
            "Continue fostering supportive open communication and balanced daily lifestyle routines."
        )

    # Recommendations
    recommendations = []
    if flag_internalizing:
        recommendations.append("Practice daily 4-7-8 breathing exercises and gentle grounding to alleviate emotional worry.")
        recommendations.append("Establish a 15-minute daily check-in with a parent or caregiver to discuss emotional feelings.")
    if flag_attention:
        recommendations.append("Break study sessions into 20-minute chunks with 5-minute movement breaks.")
        recommendations.append("Minimize visual and mobile device distractions in the study environment.")
    if flag_externalizing:
        recommendations.append("Encourage regular structured physical exercise or team sports to channel energetic impulses.")
        recommendations.append("Use calm cool-down time-outs rather than punitive reactions when frustrations occur.")
    if flag_social:
        recommendations.append("Facilitate structured, low-pressure shared activities with 1–2 close peers.")
    if not recommendations:
        recommendations.append("Maintain healthy daily routines: 9+ hours of sleep, balanced screen limits, and daily outdoor activity.")
        recommendations.append("Continue regular check-ins using the Daily Mood tracker.")

    subscales = {
        "internalizing": {
            "name": "Emotional Symptoms (Internalizing)",
            "score": internalizing,
            "max_score": 10,
            "cutoff": 5,
            "flagged": flag_internalizing,
            "interpretation": "Elevated emotional strain / anxiety" if flag_internalizing else "Healthy emotional range",
        },
        "attention": {
            "name": "Attention & Executive Focus",
            "score": attention,
            "max_score": 10,
            "cutoff": 7,
            "flagged": flag_attention,
            "interpretation": "Elevated distractibility / restlessness" if flag_attention else "Healthy attentional focus",
        },
        "externalizing": {
            "name": "Behavioral Conduct (Externalizing)",
            "score": externalizing,
            "max_score": 8,
            "cutoff": 7,
            "flagged": flag_externalizing,
            "interpretation": "Elevated behavioral conflict" if flag_externalizing else "Adaptive behavioral regulation",
        },
        "social": {
            "name": "Social Connectedness & Engagement",
            "score": social,
            "max_score": 6,
            "cutoff": 4,
            "flagged": flag_social,
            "interpretation": "Potential peer withdrawal" if flag_social else "Positive social involvement",
        },
    }

    return {
        "total_score": total_score,
        "max_total_score": 34,
        "clinical_cutoff_met": total_cutoff_met,
        "risk_tier": risk_tier,
        "risk_label": risk_label,
        "risk_color": risk_color,
        "summary": summary,
        "subscales": subscales,
        "recommendations": recommendations,
    }
