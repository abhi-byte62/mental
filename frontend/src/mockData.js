/**
 * MindBridge Embedded Demonstration Dataset & Client Intelligence Engine.
 * Enables zero-dependency standalone operation on static hosting platforms like Vercel.
 */

export const DEMO_USERS_LIST = [
  {
    username: "child_demo",
    name: "Ashrith",
    email: "ashrith.demo@mindbridge.org",
    role: "child",
    child_age: 11,
    grade: "Grade 6",
    avatar: "🧒",
    badge: "Child Profile",
    description: "Child self-reporting check-in, mood journals & interactive coping exercises."
  },
  {
    username: "guardian_demo",
    name: "Nitiz (Parent)",
    email: "nitiz.guardian@mindbridge.org",
    role: "guardian",
    child_age: 11,
    grade: "Parent / Primary Caregiver",
    avatar: "👨‍👩‍👧",
    badge: "Guardian Dashboard",
    description: "Caregiver overview of longitudinal lifestyle trends, risk tier flags & Section 9 DPDP data consent."
  },
  {
    username: "teacher_demo",
    name: "Dr. Arjun Cement",
    email: "arjun.cement@mindbridge.org",
    role: "clinician",
    child_age: null,
    grade: "School Counselor / Clinical Psychologist",
    avatar: "🩺",
    badge: "Clinical & School Surveillance",
    description: "Multi-child surveillance, standardized PSC-17 evaluation review & verified crisis escalations."
  }
];

export const INITIAL_DEMO_CHECKINS = [
  { id: 1, timestamp: new Date(Date.now() - 13 * 86400000).toISOString(), mood_score: 5, mood_label: "😄 Joyful", sleep_hours: 8.5, screen_time: 2.0, physical_play: 2.5, school_stress: 1, sentiment_compound: 0.65, sentiment_tone: "Positive", risk_tier: 0, risk_label: "Low Risk / Healthy" },
  { id: 2, timestamp: new Date(Date.now() - 12 * 86400000).toISOString(), mood_score: 5, mood_label: "😄 Joyful", sleep_hours: 8.0, screen_time: 2.5, physical_play: 2.0, school_stress: 2, sentiment_compound: 0.45, sentiment_tone: "Positive", risk_tier: 0, risk_label: "Low Risk / Healthy" },
  { id: 3, timestamp: new Date(Date.now() - 11 * 86400000).toISOString(), mood_score: 4, mood_label: "😌 Calm", sleep_hours: 7.5, screen_time: 3.0, physical_play: 1.5, school_stress: 2, sentiment_compound: 0.20, sentiment_tone: "Positive", risk_tier: 0, risk_label: "Low Risk / Healthy" },
  { id: 4, timestamp: new Date(Date.now() - 10 * 86400000).toISOString(), mood_score: 4, mood_label: "😌 Calm", sleep_hours: 8.0, screen_time: 2.0, physical_play: 2.0, school_stress: 2, sentiment_compound: 0.10, sentiment_tone: "Positive", risk_tier: 0, risk_label: "Low Risk / Healthy" },
  { id: 5, timestamp: new Date(Date.now() - 9 * 86400000).toISOString(), mood_score: 3, mood_label: "😐 Neutral", sleep_hours: 6.5, screen_time: 4.5, physical_play: 1.0, school_stress: 3, sentiment_compound: -0.05, sentiment_tone: "Neutral", risk_tier: 1, risk_label: "Moderate Risk / Monitoring" },
  { id: 6, timestamp: new Date(Date.now() - 8 * 86400000).toISOString(), mood_score: 4, mood_label: "😌 Calm", sleep_hours: 7.5, screen_time: 3.0, physical_play: 1.5, school_stress: 2, sentiment_compound: 0.35, sentiment_tone: "Positive", risk_tier: 0, risk_label: "Low Risk / Healthy" },
  { id: 7, timestamp: new Date(Date.now() - 7 * 86400000).toISOString(), mood_score: 5, mood_label: "😄 Joyful", sleep_hours: 9.0, screen_time: 1.5, physical_play: 3.0, school_stress: 1, sentiment_compound: 0.72, sentiment_tone: "Positive", risk_tier: 0, risk_label: "Low Risk / Healthy" },
  { id: 8, timestamp: new Date(Date.now() - 6 * 86400000).toISOString(), mood_score: 4, mood_label: "😌 Calm", sleep_hours: 8.0, screen_time: 2.5, physical_play: 2.0, school_stress: 2, sentiment_compound: 0.40, sentiment_tone: "Positive", risk_tier: 0, risk_label: "Low Risk / Healthy" },
  { id: 9, timestamp: new Date(Date.now() - 5 * 86400000).toISOString(), mood_score: 3, mood_label: "😐 Neutral", sleep_hours: 6.5, screen_time: 4.0, physical_play: 1.0, school_stress: 3, sentiment_compound: 0.00, sentiment_tone: "Neutral", risk_tier: 1, risk_label: "Moderate Risk / Monitoring" },
  { id: 10, timestamp: new Date(Date.now() - 4 * 86400000).toISOString(), mood_score: 4, mood_label: "😌 Calm", sleep_hours: 7.5, screen_time: 3.0, physical_play: 1.5, school_stress: 2, sentiment_compound: 0.25, sentiment_tone: "Positive", risk_tier: 0, risk_label: "Low Risk / Healthy" },
  { id: 11, timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), mood_score: 5, mood_label: "😄 Joyful", sleep_hours: 8.5, screen_time: 2.0, physical_play: 2.5, school_stress: 1, sentiment_compound: 0.58, sentiment_tone: "Positive", risk_tier: 0, risk_label: "Low Risk / Healthy" },
  { id: 12, timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), mood_score: 4, mood_label: "😌 Calm", sleep_hours: 8.0, screen_time: 2.5, physical_play: 2.0, school_stress: 2, sentiment_compound: 0.30, sentiment_tone: "Positive", risk_tier: 0, risk_label: "Low Risk / Healthy" },
  { id: 13, timestamp: new Date(Date.now() - 1 * 86400000).toISOString(), mood_score: 4, mood_label: "😌 Calm", sleep_hours: 7.5, screen_time: 3.0, physical_play: 1.5, school_stress: 2, sentiment_compound: 0.45, sentiment_tone: "Positive", risk_tier: 0, risk_label: "Low Risk / Healthy" },
  { id: 14, timestamp: new Date().toISOString(), mood_score: 5, mood_label: "😄 Joyful", sleep_hours: 8.5, screen_time: 2.0, physical_play: 2.5, school_stress: 1, sentiment_compound: 0.68, sentiment_tone: "Positive", risk_tier: 0, risk_label: "Low Risk / Healthy" }
];

export const INITIAL_DEMO_ASSESSMENTS = [
  {
    id: 1,
    timestamp: new Date(Date.now() - 5 * 86400000).toISOString(),
    child_age: 10,
    total_score: 4,
    max_total_score: 34,
    clinical_cutoff_met: false,
    risk_tier: 0,
    risk_label: "Low Risk / Healthy Psychosocial Functioning",
    risk_color: "#059669",
    summary: "Total score (4/34) is within normative pediatric thresholds. No clinical subscale flags detected.",
    subscales: {
      internalizing: { name: "Emotional Well-being (Internalizing)", score: 1, max_score: 10, cutoff: 5, flagged: false, interpretation: "Within normative emotional thresholds (Score 1/10)." },
      attention: { name: "Focus & Attention (Attention)", score: 2, max_score: 10, cutoff: 7, flagged: false, interpretation: "Within normative attention and focus thresholds (Score 2/10)." },
      externalizing: { name: "Behavior & Conduct (Externalizing)", score: 1, max_score: 8, cutoff: 7, flagged: false, interpretation: "Within normative conduct and behavioral thresholds (Score 1/8)." },
      social: { name: "Social Connectedness (Adaptive)", score: 0, max_score: 6, cutoff: 4, flagged: false, interpretation: "Healthy social bonding and peer connectedness reported." }
    },
    recommendations: [
      "Maintain supportive daily lifestyle rhythms with adequate sleep and outdoor play.",
      "Continue positive reinforcement for academic engagement and peer friendships."
    ]
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
    child_age: 12,
    total_score: 14,
    max_total_score: 34,
    clinical_cutoff_met: false,
    risk_tier: 2,
    risk_label: "Elevated Risk / Clinical Consultation Advised",
    risk_color: "#dc2626",
    summary: "Elevated internalizing symptoms detected (Score 9/10). Clinical consultation with a child psychologist or pediatrician recommended.",
    subscales: {
      internalizing: { name: "Emotional Well-being (Internalizing)", score: 9, max_score: 10, cutoff: 5, flagged: true, interpretation: "Elevated internalizing score (9/10, cutoff ≥ 5) indicates persistent sadness, worry, or self-criticism." },
      attention: { name: "Focus & Attention (Attention)", score: 3, max_score: 10, cutoff: 7, flagged: false, interpretation: "Within normative attention and focus thresholds (Score 3/10)." },
      externalizing: { name: "Behavior & Conduct (Externalizing)", score: 0, max_score: 8, cutoff: 7, flagged: false, interpretation: "Within normative conduct and behavioral thresholds (Score 0/8)." },
      social: { name: "Social Connectedness (Adaptive)", score: 2, max_score: 6, cutoff: 4, flagged: false, interpretation: "Mild social withdrawal or feeling misunderstood." }
    },
    recommendations: [
      "Clinical consultation recommended with a licensed child psychologist or pediatrician for emotional support.",
      "Encourage open, non-judgmental conversations at home about feelings and school stress.",
      "Explore structured calming exercises such as the 4-7-8 breathing pacer in the Coping Toolkit."
    ]
  },
  {
    id: 3,
    timestamp: new Date().toISOString(),
    child_age: 8,
    total_score: 14,
    max_total_score: 34,
    clinical_cutoff_met: false,
    risk_tier: 1,
    risk_label: "Moderate Risk / Monitoring & Psychoeducation Recommended",
    risk_color: "#d97706",
    summary: "Elevated attention subscale score detected (Score 9/10). Structured classroom and homework accommodations recommended.",
    subscales: {
      internalizing: { name: "Emotional Well-being (Internalizing)", score: 1, max_score: 10, cutoff: 5, flagged: false, interpretation: "Within normative emotional thresholds (Score 1/10)." },
      attention: { name: "Focus & Attention (Attention)", score: 9, max_score: 10, cutoff: 7, flagged: true, interpretation: "Elevated attention score (9/10, cutoff ≥ 7) indicates frequent distractibility, restlessness, or task disorganization." },
      externalizing: { name: "Behavior & Conduct (Externalizing)", score: 2, max_score: 8, cutoff: 7, flagged: false, interpretation: "Within normative conduct and behavioral thresholds (Score 2/8)." },
      social: { name: "Social Connectedness (Adaptive)", score: 2, max_score: 6, cutoff: 4, flagged: false, interpretation: "Moderate social activity." }
    },
    recommendations: [
      "Introduce short study intervals (Pomodoro 15-20 min) with frequent physical movement breaks.",
      "Coordinate with teachers to provide structured seating and written assignment checklists.",
      "Monitor focus and sleep quality over the next 14 days."
    ]
  }
];

export const CRISIS_RESOURCES_DATA = [
  {
    name: "Childline / Child Helpline India",
    number: "1098",
    description: "24/7, free, nationwide emergency phone and outreach service for children in distress or in need of care and protection.",
    emoji: "🛡️",
    color: "#e74c3c",
    available: "24/7 Nationwide"
  },
  {
    name: "Tele-MANAS",
    number: "14416",
    description: "National Tele Mental Health Programme of India (Ministry of Health & Family Welfare). 24/7 toll-free multilingual psychological counseling.",
    emoji: "📞",
    color: "#2980b9",
    available: "24/7 (20+ Languages)"
  },
  {
    name: "NIMHANS Child Guidance Clinic",
    number: "+91-80-46110007",
    description: "Specialized child and adolescent mental health consultation, psychotherapy, and psychiatric support services based in Bengaluru.",
    emoji: "🏥",
    color: "#8e44ad",
    available: "Mon–Sat, 9 AM – 5 PM"
  },
  {
    name: "iCall (TISS)",
    number: "9152987821",
    description: "Psychosocial helpline operated by the Tata Institute of Social Sciences (TISS). Professional counseling by qualified psychologists.",
    emoji: "💬",
    color: "#16a085",
    available: "Mon–Sat, 8 AM – 10 PM"
  }
];
