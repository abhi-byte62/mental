/**
 * MindBridge API Client.
 * Handles all REST communication with the FastAPI backend.
 */

const API_BASE = "http://localhost:8000/api";

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
  const res = await fetch(`${API_BASE}/assessment/questions`);
  if (!res.ok) throw new Error("Failed to load assessment questionnaire");
  return res.json();
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
