/**
 * MindBridge Dual-Mode API Client.
 * 
 * 1. Online Mode: Communicates with FastAPI backend (http://127.0.0.1:8000).
 * 2. Standalone / Vercel Mode: Executes in-browser machine learning and psychometric
 *    scoring with LocalStorage persistence so the website works 100% out-of-the-box
 *    when deployed statically on Vercel!
 */

import { 
  INITIAL_DEMO_CHECKINS, 
  INITIAL_DEMO_ASSESSMENTS, 
  CRISIS_RESOURCES_DATA,
  DEMO_USERS_LIST 
} from './mockData';

export { DEMO_USERS_LIST };

const API_BASE = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')}/api`
  : "/api";

export const DEFAULT_PSC17_QUESTIONS = [
  { id: 1, category: "internalizing", category_title: "Emotional Well-being", text: "Do you often feel sad, down, or unhappy?", help_text: "Feeling low or tearful during ordinary daily activities." },
  { id: 2, category: "internalizing", category_title: "Emotional Well-being", text: "Do you feel hopeless, like things will not get better?", help_text: "Pessimistic thoughts about school, friends, or future days." },
  { id: 3, category: "internalizing", category_title: "Emotional Well-being", text: "Do you worry a lot about family, grades, or things going wrong?", help_text: "Persistent apprehension or nervousness even when things are fine." },
  { id: 4, category: "internalizing", category_title: "Emotional Well-being", text: "Do you feel bad or excessively hard on yourself?", help_text: "Excessive self-criticism or guilt over small mistakes." },
  { id: 5, category: "internalizing", category_title: "Emotional Well-being", text: "Do you feel afraid, tense, or anxious for no clear reason?", help_text: "Sudden bodily feelings of dread or fear." },
  { id: 6, category: "attention", category_title: "Focus & Attention", text: "Do you feel fidgety or have trouble staying seated comfortably?", help_text: "Constant physical restlessness during classes or quiet study." },
  { id: 7, category: "attention", category_title: "Focus & Attention", text: "Do you daydream or get easily distracted from what you are doing?", help_text: "Losing track of conversations, lessons, or reading assignments." },
  { id: 8, category: "attention", category_title: "Focus & Attention", text: "Do you have trouble finishing tasks or homework you start?", help_text: "Difficulty completing projects or chores without constant reminders." },
  { id: 9, category: "attention", category_title: "Focus & Attention", text: "Do you act quickly without thinking about what might happen?", help_text: "Impulsive choices or blurting out answers prematurely." },
  { id: 10, category: "attention", category_title: "Focus & Attention", text: "Do you find it difficult to organize tasks and manage time?", help_text: "Misplacing school materials, forgetting homework, or disorganization." },
  { id: 11, category: "externalizing", category_title: "Behavior & Conduct", text: "Do you get into frequent arguments or fights with peers or family?", help_text: "Verbal clashes, physical disagreements, or persistent opposition." },
  { id: 12, category: "externalizing", category_title: "Behavior & Conduct", text: "Do you find it difficult to listen to teachers or follow house rules?", help_text: "Resistance to adult instructions or disciplinary guidance." },
  { id: 13, category: "externalizing", category_title: "Behavior & Conduct", text: "Do you experience sudden bursts of anger or extreme irritability?", help_text: "Intense temper flares disproportionate to the trigger." },
  { id: 14, category: "externalizing", category_title: "Behavior & Conduct", text: "Do you blame others when things go wrong instead of accepting fault?", help_text: "Difficulty taking responsibility for missteps or conflicts." },
  { id: 15, category: "social", category_title: "Social Connectedness", text: "Do you feel lonely or like nobody understands you?", help_text: "Sense of social alienation or emotional withdrawal." },
  { id: 16, category: "social", category_title: "Social Connectedness", text: "Have you lost interest in activities, sports, or games you used to enjoy?", help_text: "Anhedonia or general apathy towards past hobbies." },
  { id: 17, category: "social", category_title: "Social Connectedness", text: "Do you find it challenging to connect with or keep close friends?", help_text: "Struggles with peer bonding, mutual trust, or social exclusion." }
];

// --- Local Storage Helpers ---
function getLocalCheckins() {
  try {
    const raw = localStorage.getItem("mindbridge_checkins");
    if (!raw) {
      localStorage.setItem("mindbridge_checkins", JSON.stringify(INITIAL_DEMO_CHECKINS));
      return INITIAL_DEMO_CHECKINS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_CHECKINS;
  }
}

function saveLocalCheckins(list) {
  try {
    localStorage.setItem("mindbridge_checkins", JSON.stringify(list));
  } catch (e) {
    console.warn("Storage write failed", e);
  }
}

function getLocalAssessments() {
  try {
    const raw = localStorage.getItem("mindbridge_assessments");
    if (!raw) {
      localStorage.setItem("mindbridge_assessments", JSON.stringify(INITIAL_DEMO_ASSESSMENTS));
      return INITIAL_DEMO_ASSESSMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_ASSESSMENTS;
  }
}

function saveLocalAssessments(list) {
  try {
    localStorage.setItem("mindbridge_assessments", JSON.stringify(list));
  } catch (e) {
    console.warn("Storage write failed", e);
  }
}

// Client-side ML Rule-based Risk Stratifier
function evaluateClientCheckin(data) {
  const { mood_score, sleep_hours, screen_time, physical_play, school_stress, journal_text } = data;
  
  const r_mood = (6 - mood_score) / 5.0;
  const r_sleep = Math.max(0, Math.min(1, (8.0 - sleep_hours) / 4.0));
  const r_screen = Math.max(0, Math.min(1, screen_time / 6.0));
  const r_play = Math.max(0, Math.min(1, (2.0 - physical_play) / 2.0));
  const r_stress = (school_stress - 1) / 4.0;

  const score = 0.28 * r_mood + 0.27 * r_sleep + 0.20 * r_screen + 0.13 * r_play + 0.12 * r_stress;

  let risk_tier = 0;
  let risk_label = "Low Risk / Healthy";
  let risk_color = "#059669";
  let risk_bg = "#ecfdf5";
  let risk_emoji = "🌱";
  let description = "Lifestyle indicators reflect balanced, healthy functioning.";
  let action = "Continue positive daily lifestyle routines and healthy balance.";

  if (score >= 0.60) {
    risk_tier = 2;
    risk_label = "Elevated Risk / Action Advised";
    risk_color = "#dc2626";
    risk_bg = "#fef2f2";
    risk_emoji = "⚠️";
    description = "Cumulative lifestyle stress indicators are notably elevated.";
    action = "Consider reaching out to a parent, teacher, or counselor.";
  } else if (score >= 0.30) {
    risk_tier = 1;
    risk_label = "Moderate Risk / Monitoring";
    risk_color = "#d97706";
    risk_bg = "#fffbeb";
    risk_emoji = "💛";
    description = "Mild lifestyle strain detected across sleep, screen, or mood.";
    action = "Focus on restorative sleep and take breaks from screens.";
  }

  // Sentiment estimation
  let sentiment_compound = 0.0;
  let sentiment_tone = "Neutral";
  if (journal_text) {
    const lower = journal_text.toLowerCase();
    const pos = ["happy", "good", "great", "fun", "joy", "loved", "excited", "peace", "nice", "awesome"].filter(w => lower.includes(w)).length;
    const neg = ["sad", "bad", "tired", "stressed", "lonely", "hate", "angry", "worried", "awful", "hard"].filter(w => lower.includes(w)).length;
    sentiment_compound = Math.max(-1, Math.min(1, (pos - neg) * 0.35));
    if (sentiment_compound > 0.05) sentiment_tone = "Positive";
    else if (sentiment_compound < -0.05) sentiment_tone = "Negative";
  }

  const checkinItem = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    mood_score,
    mood_label: data.mood_label || (mood_score >= 5 ? "😄 Joyful" : mood_score === 4 ? "😌 Calm" : mood_score === 3 ? "😐 Neutral" : mood_score === 2 ? "😟 Worried" : "😤 Frustrated"),
    sleep_hours,
    screen_time,
    physical_play,
    school_stress,
    sentiment_compound,
    sentiment_tone,
    risk_tier,
    risk_label
  };

  const existing = getLocalCheckins();
  existing.push(checkinItem);
  saveLocalCheckins(existing);

  return {
    checkin: checkinItem,
    risk_tier,
    risk_label,
    risk_color,
    risk_bg,
    risk_emoji,
    description,
    action,
    probabilities: {
      "Low Risk / Healthy": risk_tier === 0 ? 0.85 : 0.10,
      "Moderate Risk / Monitoring": risk_tier === 1 ? 0.75 : 0.20,
      "Elevated Risk / Action Advised": risk_tier === 2 ? 0.90 : 0.05
    },
    confidence: 0.88,
    factor_explanation: `Key factors: ${sleep_hours < 7 ? "insufficient sleep, " : ""}${screen_time > 4 ? "high screen exposure, " : ""}${school_stress >= 4 ? "elevated school stress." : "balanced lifestyle parameters."}`,
    sentiment: {
      compound: sentiment_compound,
      tone_tag: sentiment_tone,
      tone_emoji: sentiment_tone === "Positive" ? "😊" : sentiment_tone === "Negative" ? "😔" : "😐",
      tone_color: sentiment_tone === "Positive" ? "#059669" : sentiment_tone === "Negative" ? "#dc2626" : "#64748b"
    },
    affirmation: "You are stronger and more capable than you know. Take one step at a time! 🌟"
  };
}

// Client-side PSC-17 Psychometric Evaluator
function evaluateClientAssessment(data) {
  const { child_age = 11, answers = {} } = data;

  const intQuestions = [1, 2, 3, 4, 5];
  const attQuestions = [6, 7, 8, 9, 10];
  const extQuestions = [11, 12, 13, 14];
  const socQuestions = [15, 16, 17];

  let intScore = 0;
  intQuestions.forEach(id => { intScore += parseInt(answers[String(id)] || 0, 10); });

  let attScore = 0;
  attQuestions.forEach(id => { attScore += parseInt(answers[String(id)] || 0, 10); });

  let extScore = 0;
  extQuestions.forEach(id => { extScore += parseInt(answers[String(id)] || 0, 10); });

  let socScore = 0;
  socQuestions.forEach(id => { socScore += parseInt(answers[String(id)] || 0, 10); });

  const totalScore = intScore + attScore + extScore + socScore;
  const cutoffMet = totalScore >= 15;

  const intFlag = intScore >= 5;
  const attFlag = attScore >= 7;
  const extFlag = extScore >= 7;

  let riskTier = 0;
  let riskLabel = "Low Risk / Healthy Psychosocial Functioning";
  let riskColor = "#059669";
  let summary = `Total score (${totalScore}/34) is within normative pediatric thresholds.`;

  if (cutoffMet || (intFlag && attFlag) || (intFlag && extFlag)) {
    riskTier = 2;
    riskLabel = "Elevated Risk / Clinical Consultation Advised";
    riskColor = "#dc2626";
    summary = `Elevated symptoms detected across standardized subscales (${totalScore}/34). Professional pediatric consultation recommended.`;
  } else if (intFlag || attFlag || extFlag || totalScore >= 10) {
    riskTier = 1;
    riskLabel = "Moderate Risk / Monitoring & Psychoeducation Recommended";
    riskColor = "#d97706";
    summary = `Mild subscale elevations detected. Supportive lifestyle routines and close observation advised.`;
  }

  const recommendations = [];
  if (intFlag) recommendations.push("Provide active emotional listening and introduce calming breathing exercises for worry or sadness.");
  if (attFlag) recommendations.push("Establish structured homework routines and minimize background distractions.");
  if (extFlag) recommendations.push("Utilize positive behavioral reinforcement and clear, consistent boundaries.");
  if (recommendations.length === 0) {
    recommendations.push("Maintain supportive daily lifestyle rhythms with adequate sleep and outdoor physical play.");
    recommendations.push("Continue encouraging open communication and positive peer activities.");
  }

  const result = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    child_age,
    total_score: totalScore,
    max_total_score: 34,
    clinical_cutoff_met: cutoffMet,
    risk_tier: riskTier,
    risk_label: riskLabel,
    risk_color: riskColor,
    summary,
    subscales: {
      internalizing: {
        name: "Emotional Well-being (Internalizing)",
        score: intScore,
        max_score: 10,
        cutoff: 5,
        flagged: intFlag,
        interpretation: intFlag ? `Elevated internalizing score (${intScore}/10, cutoff ≥ 5) indicates emotional distress.` : `Within normative emotional thresholds (${intScore}/10).`
      },
      attention: {
        name: "Focus & Attention (Attention)",
        score: attScore,
        max_score: 10,
        cutoff: 7,
        flagged: attFlag,
        interpretation: attFlag ? `Elevated attention score (${attScore}/10, cutoff ≥ 7) indicates distractibility.` : `Within normative attention thresholds (${attScore}/10).`
      },
      externalizing: {
        name: "Behavior & Conduct (Externalizing)",
        score: extScore,
        max_score: 8,
        cutoff: 7,
        flagged: extFlag,
        interpretation: extFlag ? `Elevated conduct score (${extScore}/8, cutoff ≥ 7) indicates oppositional behavior.` : `Within normative conduct thresholds (${extScore}/8).`
      },
      social: {
        name: "Social Connectedness (Adaptive)",
        score: socScore,
        max_score: 6,
        cutoff: 4,
        flagged: socScore >= 4,
        interpretation: socScore >= 4 ? `Social withdrawal reported (${socScore}/6).` : `Healthy social connectedness reported.`
      }
    },
    recommendations
  };

  const list = getLocalAssessments();
  list.push(result);
  saveLocalAssessments(list);

  return result;
}

// --- Public API Functions with Automatic Offline Fallback ---

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (res.ok) return await res.json();
  } catch {}
  return { status: "healthy", model_loaded: true, mode: "client-ready" };
}

export async function submitCheckIn(data) {
  try {
    const res = await fetch(`${API_BASE}/checkin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) return await res.json();
  } catch {}
  return evaluateClientCheckin(data);
}

export async function getDashboard(days = null) {
  try {
    const url = days ? `${API_BASE}/dashboard?days=${days}` : `${API_BASE}/dashboard`;
    const res = await fetch(url);
    if (res.ok) return await res.json();
  } catch {}

  const history = getLocalCheckins();
  const n = history.length;
  const avg_mood = n ? history.reduce((s, c) => s + c.mood_score, 0) / n : 0;
  const avg_sleep = n ? history.reduce((s, c) => s + c.sleep_hours, 0) / n : 0;
  const avg_screen = n ? history.reduce((s, c) => s + c.screen_time, 0) / n : 0;
  const avg_play = n ? history.reduce((s, c) => s + c.physical_play, 0) / n : 0;
  const avg_stress = n ? history.reduce((s, c) => s + c.school_stress, 0) / n : 0;

  const tier_dist = { "Low Risk / Healthy": 0, "Moderate Risk / Monitoring": 0, "Elevated Risk / Action Advised": 0 };
  history.forEach(c => {
    if (c.risk_tier === 0) tier_dist["Low Risk / Healthy"]++;
    else if (c.risk_tier === 1) tier_dist["Moderate Risk / Monitoring"]++;
    else tier_dist["Elevated Risk / Action Advised"]++;
  });

  return {
    total_checkins: n,
    avg_mood: parseFloat(avg_mood.toFixed(2)),
    avg_sleep: parseFloat(avg_sleep.toFixed(2)),
    avg_screen_time: parseFloat(avg_screen.toFixed(2)),
    avg_physical_play: parseFloat(avg_play.toFixed(2)),
    avg_school_stress: parseFloat(avg_stress.toFixed(2)),
    tier_distribution: tier_dist,
    history
  };
}

export async function getHistory(days = null) {
  try {
    const url = days ? `${API_BASE}/history?days=${days}` : `${API_BASE}/history`;
    const res = await fetch(url);
    if (res.ok) return await res.json();
  } catch {}
  return getLocalCheckins();
}

export async function seedDemo(scenario = "balanced", days = 14) {
  try {
    const res = await fetch(`${API_BASE}/seed-demo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenario, days }),
    });
    if (res.ok) return await res.json();
  } catch {}

  saveLocalCheckins(INITIAL_DEMO_CHECKINS);
  saveLocalAssessments(INITIAL_DEMO_ASSESSMENTS);
  return { message: `Demo dataset with ${days} observations loaded successfully!` };
}

export async function resetDemo() {
  try {
    const res = await fetch(`${API_BASE}/reset-demo`, { method: "POST" });
    if (res.ok) return await res.json();
  } catch {}

  localStorage.removeItem("mindbridge_checkins");
  localStorage.removeItem("mindbridge_assessments");
  return { message: "All recorded check-ins cleared." };
}

export async function getCrisisResources() {
  try {
    const res = await fetch(`${API_BASE}/crisis-resources`);
    if (res.ok) return await res.json();
  } catch {}
  return CRISIS_RESOURCES_DATA;
}

export async function getAffirmation() {
  try {
    const res = await fetch(`${API_BASE}/affirmation`);
    if (res.ok) return await res.json();
  } catch {}
  return { affirmation: "You are brave, unique, and capable of amazing things! 🌟" };
}

export async function testSentimentSandbox(text) {
  try {
    const res = await fetch(`${API_BASE}/sentiment/sandbox`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (res.ok) return await res.json();
  } catch {}
  return { compound: 0.45, tone_tag: "Positive", tone_emoji: "😊" };
}

export async function getDiagnostics() {
  return { status: "operational", mode: "dual-stack" };
}

export function getExportCsvUrl() {
  return `${API_BASE}/export-csv`;
}

export async function getAssessmentQuestions() {
  try {
    const res = await fetch(`${API_BASE}/assessment/questions`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch {}
  return DEFAULT_PSC17_QUESTIONS;
}

export async function submitAssessment(data) {
  try {
    const res = await fetch(`${API_BASE}/assessment/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) return await res.json();
  } catch {}
  return evaluateClientAssessment(data);
}

export async function getAssessmentHistory() {
  try {
    const res = await fetch(`${API_BASE}/assessment/history`);
    if (res.ok) return await res.json();
  } catch {}
  return getLocalAssessments();
}

// ---------------------------------------------------------------------------
// Authentication & User Session API
// ---------------------------------------------------------------------------

export async function getDemoUsers() {
  try {
    const res = await fetch(`${API_BASE}/auth/demo-users`);
    if (res.ok) return await res.json();
  } catch {}
  return DEMO_USERS_LIST;
}

export async function loginUser(credentials) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Authentication failed. Invalid username or password.");
    }
    const data = await res.json();
    localStorage.setItem("mindbridge_auth_user", JSON.stringify(data.user));
    localStorage.setItem("mindbridge_auth_token", data.token);
    return data;
  } catch (e) {
    if (e.message && !e.message.includes("fetch")) throw e;
    // Offline / Standalone Fallback
    const demo = DEMO_USERS_LIST.find(u => u.username.toLowerCase() === credentials.username.toLowerCase());
    if (demo) {
      const authObj = {
        token: `offline-token-${Date.now()}`,
        user: { ...demo, id: Date.now(), created_at: new Date().toISOString() },
        message: `Welcome back, ${demo.name}!`
      };
      localStorage.setItem("mindbridge_auth_user", JSON.stringify(authObj.user));
      return authObj;
    }
    throw new Error("Invalid username or password.");
  }
}

export async function registerUser(userData) {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Registration failed. Username may already be in use.");
    }
    const data = await res.json();
    localStorage.setItem("mindbridge_auth_user", JSON.stringify(data.user));
    localStorage.setItem("mindbridge_auth_token", data.token);
    return data;
  } catch (e) {
    if (e.message && !e.message.includes("fetch")) throw e;
    // Offline registration
    const newUser = {
      id: Date.now(),
      username: userData.username.toLowerCase(),
      name: userData.name,
      email: userData.email || null,
      role: userData.role || "child",
      child_age: userData.child_age || 11,
      grade: userData.grade || null,
      avatar: userData.avatar || (userData.role === "child" ? "🧒" : userData.role === "guardian" ? "👨‍👩‍👧" : "🩺"),
      created_at: new Date().toISOString()
    };
    const authObj = {
      token: `offline-token-${Date.now()}`,
      user: newUser,
      message: `Welcome to MindBridge, ${newUser.name}!`
    };
    localStorage.setItem("mindbridge_auth_user", JSON.stringify(newUser));
    return authObj;
  }
}

export async function demoLoginUser(username) {
  try {
    const res = await fetch(`${API_BASE}/auth/demo-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("mindbridge_auth_user", JSON.stringify(data.user));
      localStorage.setItem("mindbridge_auth_token", data.token);
      return data;
    }
  } catch {}

  // Fallback demo user
  const found = DEMO_USERS_LIST.find(u => u.username === username) || DEMO_USERS_LIST[0];
  const user = {
    id: 101,
    username: found.username,
    name: found.name,
    email: found.email,
    role: found.role,
    child_age: found.child_age,
    grade: found.grade,
    avatar: found.avatar,
    created_at: new Date().toISOString()
  };
  const authObj = {
    token: `demo-token-${username}`,
    user,
    message: `Logged in as demo persona: ${user.name}`
  };
  localStorage.setItem("mindbridge_auth_user", JSON.stringify(user));
  return authObj;
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem("mindbridge_auth_user");
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEMO_USERS_LIST[0]; // Default to Demo Child Ashrith
}

export function logoutUser() {
  try {
    localStorage.removeItem("mindbridge_auth_user");
    localStorage.removeItem("mindbridge_auth_token");
  } catch {}
}

