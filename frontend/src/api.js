/**
 * MindBridge API Client.
 * Handles all REST communication with the FastAPI backend.
 */

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

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error("Backend unavailable");
  return res.json();
}

export async function submitCheckIn(data) {
  const res = await fetch(`${API_BASE}/checkin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to submit check-in");
  }
  return res.json();
}

export async function getDashboard(days = null) {
  const url = days ? `${API_BASE}/dashboard?days=${days}` : `${API_BASE}/dashboard`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load dashboard metrics");
  return res.json();
}

export async function getHistory(days = null) {
  const url = days ? `${API_BASE}/history?days=${days}` : `${API_BASE}/history`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load history");
  return res.json();
}

export async function seedDemo(scenario = "balanced", days = 14) {
  const res = await fetch(`${API_BASE}/seed-demo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scenario, days }),
  });
  if (!res.ok) throw new Error("Failed to seed demo data");
  return res.json();
}

export async function resetDemo() {
  const res = await fetch(`${API_BASE}/reset-demo`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to reset demo data");
  return res.json();
}

export async function getCrisisResources() {
  const res = await fetch(`${API_BASE}/crisis-resources`);
  if (!res.ok) throw new Error("Failed to load crisis resources");
  return res.json();
}

export async function getAffirmation() {
  const res = await fetch(`${API_BASE}/affirmation`);
  if (!res.ok) throw new Error("Failed to load affirmation");
  return res.json();
}

export async function testSentimentSandbox(text) {
  const res = await fetch(`${API_BASE}/sentiment/sandbox`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to analyze sentiment");
  return res.json();
}

export async function getDiagnostics() {
  const res = await fetch(`${API_BASE}/diagnostics`);
  if (!res.ok) throw new Error("Failed to fetch diagnostics");
  return res.json();
}

export function getExportCsvUrl() {
  return `${API_BASE}/export-csv`;
}

export async function getAssessmentQuestions() {
  try {
    const res = await fetch(`${API_BASE}/assessment/questions`);
    if (!res.ok) throw new Error("Failed to load questions from server");
    const data = await res.json();
    return (data && data.length > 0) ? data : DEFAULT_PSC17_QUESTIONS;
  } catch (err) {
    console.warn("Using offline PSC-17 question catalog:", err);
    return DEFAULT_PSC17_QUESTIONS;
  }
}

export async function submitAssessment(data) {
  const res = await fetch(`${API_BASE}/assessment/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to submit assessment");
  }
  return res.json();
}

export async function getAssessmentHistory() {
  const res = await fetch(`${API_BASE}/assessment/history`);
  if (!res.ok) throw new Error("Failed to load assessment history");
  return res.json();
}
