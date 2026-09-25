import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  AlertOctagon, 
  Download, 
  Database, 
  RotateCcw, 
  ShieldCheck, 
  TrendingUp, 
  PhoneCall,
  Info,
  ClipboardCheck,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { getDashboard, seedDemo, resetDemo, getExportCsvUrl, getAssessmentHistory } from '../api';

const TIER_COLORS = {
  "Low Risk / Healthy": "#059669",
  "Moderate Risk / Monitoring": "#d97706",
  "Elevated Risk / Action Advised": "#dc2626",
};

export default function GuardianDashboard({ setActiveTab, onDemoSeeded, currentUser }) {
  const [metrics, setMetrics] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDays, setFilterDays] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [dashData, assessData] = await Promise.all([
        getDashboard(filterDays),
        getAssessmentHistory().catch(() => [])
      ]);
      setMetrics(dashData);
      setAssessments(assessData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [filterDays]);

  const handleSeed = async (scenario) => {
    setLoading(true);
    try {
      const res = await seedDemo(scenario, 14);
      setActionMessage(res.message);
      if (onDemoSeeded) onDemoSeeded();
      await fetchDashboardData();
      setTimeout(() => setActionMessage(null), 4000);
    } catch (err) {
      alert("Failed to populate demo data");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Clear all recorded check-ins?")) return;
    setLoading(true);
    try {
      await resetDemo();
      await fetchDashboardData();
    } catch (err) {
      alert("Failed to reset");
    } finally {
      setLoading(false);
    }
  };

  const chartData = metrics?.history?.map((item, index, arr) => {
    const windowStart = Math.max(0, index - 6);
    const windowSlice = arr.slice(windowStart, index + 1);
    const rollingAvg = windowSlice.reduce((sum, curr) => sum + curr.mood_score, 0) / windowSlice.length;

    const dateObj = new Date(item.timestamp);
    const dateLabel = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return {
      date: dateLabel,
      timestamp: item.timestamp,
      mood: item.mood_score,
      rollingAvg: parseFloat(rollingAvg.toFixed(2)),
      sleep: item.sleep_hours,
      screen: item.screen_time,
      play: item.physical_play,
      stress: item.school_stress,
      sentiment: item.sentiment_compound,
      tier: item.risk_tier,
      tierLabel: item.risk_label,
    };
  }) || [];

  const pieData = metrics?.tier_distribution ? [
    { name: "Low Risk / Healthy", value: metrics.tier_distribution["Low Risk / Healthy"] || 0, color: "#059669" },
    { name: "Moderate Risk / Monitoring", value: metrics.tier_distribution["Moderate Risk / Monitoring"] || 0, color: "#d97706" },
    { name: "Elevated Risk / Action Advised", value: metrics.tier_distribution["Elevated Risk / Action Advised"] || 0, color: "#dc2626" },
  ].filter(d => d.value > 0) : [];

  return (
    <div className="max-w-6xl mx-auto py-4 space-y-6">
      
      {/* Caregiver Oversight Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-white rounded-xl border border-emerald-200/80">
            {currentUser?.avatar || "👨‍👩‍👧"}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                {currentUser?.role === 'guardian' ? `Caregiver: ${currentUser.name}` : currentUser?.role === 'clinician' ? `Clinical Review: ${currentUser.name}` : `Guardian Analytics`}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                Active Monitoring
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Observing longitudinal records for: <span className="font-bold text-slate-700">Ashrith (Grade 6, Age 11)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('auth')}
            className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 transition-colors"
          >
            Switch Profile
          </button>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
            <span>Caregiver &amp; Educator Oversight</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
            Longitudinal Trend Analytics
          </h1>
          <p className="text-xs text-slate-500">
            Aggregated behavioral indicators over time. Section 9 DPDP Act compliant.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleSeed("balanced")}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1.5"
          >
            <Database className="w-3.5 h-3.5 text-slate-500" />
            <span>Seed 14-Day History</span>
          </button>

          <button
            onClick={() => handleSeed("distress")}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors flex items-center gap-1.5"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            <span>Simulate Distress Alert</span>
          </button>

          <a
            href={getExportCsvUrl()}
            download
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </a>

          <button
            onClick={handleReset}
            className="p-1.5 text-xs font-medium rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
            title="Reset Database Records"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium">
          {actionMessage}
        </div>
      )}

      {/* Distress Alert Banner */}
      {metrics?.distress_alert && (
        <div className="p-5 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h3 className="font-bold text-sm text-rose-900">
                DISTRESS ALERT: {metrics.consecutive_elevated} Consecutive Elevated Risk Assessments
              </h3>
              <p className="text-xs text-rose-700 leading-relaxed">
                Persistent elevated indicators suggest chronic emotional or lifestyle strain. 
                Immediate supportive discussion and professional consultation are advised.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('crisis')}
            className="px-4 py-2 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-medium text-xs transition-colors shrink-0 flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Crisis Pathways</span>
          </button>
        </div>
      )}

      {/* Privacy Notice Banner */}
      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5">
        <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0" />
        <span>
          <strong>Privacy by Design (DPDP Act 2023, Section 9):</strong> Child journal reflections are processed strictly in-memory and are never stored or displayed on this dashboard.
        </span>
      </div>

      {/* Empty State */}
      {(!metrics || metrics.total_checkins === 0) ? (
        <div className="card-surface p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xl font-bold">
            0
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">No Check-in Data Available</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Once check-in submissions are recorded, longitudinal graphs and trend analytics will render here.
            </p>
          </div>
          <button
            onClick={() => handleSeed("balanced")}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-colors inline-flex items-center gap-1.5"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Populate 14-Day Sample History for Viva</span>
          </button>
        </div>
      ) : (
        /* Populated Dashboard Content */
        <div className="space-y-6">
          
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            <div className="card-surface p-4 space-y-1">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Check-ins</span>
              <div className="text-2xl font-bold text-slate-900 font-mono">{metrics.total_checkins}</div>
              <div className="text-[10px] text-slate-400">Total days recorded</div>
            </div>

            <div className="card-surface p-4 space-y-1">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Mean Mood Score</span>
              <div className="text-2xl font-bold text-slate-900 font-mono">{metrics.avg_mood}</div>
              <div className="text-[10px] text-slate-500">1 (Frustrated) to 6 (Joyful)</div>
            </div>

            <div className="card-surface p-4 space-y-1">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Mean Sleep</span>
              <div className="text-2xl font-bold text-slate-900 font-mono">{metrics.avg_sleep}h</div>
              <div className="text-[10px] text-slate-500">Per night average</div>
            </div>

            <div className="card-surface p-4 space-y-1">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Elevated Risk Days</span>
              <div className="text-2xl font-bold text-rose-700 font-mono">{metrics.elevated_risk_days}</div>
              <div className="text-[10px] text-slate-400">
                {((metrics.elevated_risk_days / metrics.total_checkins) * 100).toFixed(0)}% of total cohort
              </div>
            </div>

            <div className="card-surface p-4 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Current Status</span>
              <div className="text-sm font-bold text-slate-900 line-clamp-1 mt-1">
                {chartData[chartData.length - 1]?.tierLabel.split('/')[0]}
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                Tier {chartData[chartData.length - 1]?.tier}
              </div>
            </div>
          </div>

          {/* Chart 1: Longitudinal Mood Trajectory */}
          <div className="card-surface p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Longitudinal Mood Trajectory &amp; 7-Day Rolling Average
                </h3>
                <p className="text-xs text-slate-500">
                  Continuous tracking of self-reported affective scores against baseline monitoring bands.
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600" /> Healthy &ge; 4.5</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Monitoring 2.5–4.5</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-600" /> Elevated &lt; 2.5</span>
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                  <YAxis domain={[1, 6]} ticks={[1, 2, 3, 4, 5, 6]} tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }} />
                  <ReferenceLine y={4.5} stroke="#059669" strokeDasharray="3 3" />
                  <ReferenceLine y={2.5} stroke="#d97706" strokeDasharray="3 3" />
                  <Area 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#0284c7" 
                    strokeWidth={2}
                    fill="#f0f9ff" 
                    name="Daily Mood"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rollingAvg" 
                    stroke="#0f172a" 
                    strokeWidth={2.5} 
                    dot={false}
                    name="7-Day Rolling Avg" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row: Risk Stratification & Lifestyle Trends */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Donut Chart */}
            <div className="card-surface p-6 space-y-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Risk Tier Distribution
                </h3>
                <p className="text-xs text-slate-500">
                  Proportion of observations stratified by the Random Forest classifier.
                </p>
              </div>

              <div className="h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-wrap justify-center gap-3 text-xs">
                {pieData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 font-medium text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span>{d.name}: {d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lifestyle Behavioral Trends */}
            <div className="card-surface p-6 space-y-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  Lifestyle Parameter Correlation
                </h3>
                <p className="text-xs text-slate-500">
                  Simultaneous tracking of sleep, screen hours, physical play, and stress.
                </p>
              </div>

              <div className="h-56 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }} />
                    <Line type="monotone" dataKey="sleep" stroke="#0284c7" strokeWidth={1.5} name="Sleep (h)" />
                    <Line type="monotone" dataKey="screen" stroke="#e11d48" strokeWidth={1.5} name="Screen (h)" />
                    <Line type="monotone" dataKey="play" stroke="#059669" strokeWidth={1.5} name="Play (h)" />
                    <Line type="monotone" dataKey="stress" stroke="#d97706" strokeWidth={1.5} strokeDasharray="3 3" name="Stress (1-5)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-wrap justify-center gap-3 text-[11px] font-medium text-slate-500">
                <span className="text-sky-700">● Sleep</span>
                <span className="text-rose-700">● Screen Time</span>
                <span className="text-emerald-700">● Physical Play</span>
                <span className="text-amber-700">● School Stress</span>
              </div>
            </div>

          </div>

          {/* Clean History Log Table */}
          <div className="card-surface p-6 space-y-3">
            <h3 className="font-bold text-sm text-slate-900">
              Longitudinal Observation Log
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Timestamp</th>
                    <th className="p-2.5">Mood</th>
                    <th className="p-2.5">Sleep</th>
                    <th className="p-2.5">Screen</th>
                    <th className="p-2.5">Play</th>
                    <th className="p-2.5">Stress</th>
                    <th className="p-2.5">NLP Valence</th>
                    <th className="p-2.5">Risk Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {metrics.history.slice(-8).reverse().map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-2.5 font-mono text-slate-500 text-[11px]">
                        {new Date(r.timestamp).toLocaleDateString()} {new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-2.5 font-medium">{r.mood_label}</td>
                      <td className="p-2.5">{r.sleep_hours}h</td>
                      <td className="p-2.5">{r.screen_time}h</td>
                      <td className="p-2.5">{r.physical_play}h</td>
                      <td className="p-2.5">{r.school_stress}/5</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                          r.sentiment_tone === 'Positive' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : r.sentiment_tone === 'Negative' 
                            ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {r.sentiment_tone} ({r.sentiment_compound})
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          r.risk_tier === 0 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                            : r.risk_tier === 1 
                            ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          Tier {r.risk_tier} • {r.risk_label.split('/')[0]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Standardized Pediatric Clinical Assessment History (PSC-17) */}
          <div className="card-surface p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <ClipboardCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Standardized Clinical Screeners</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                  Pediatric Symptom Checklist (PSC-17) Reports
                </h3>
              </div>
              <button
                onClick={() => setActiveTab && setActiveTab('assessment')}
                className="self-start sm:self-auto px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Take PSC-17 Assessment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {assessments.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
                <ClipboardCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="font-semibold text-slate-700">No Standardized Clinical Assessments Recorded Yet</p>
                <p className="mt-1 text-slate-500 max-w-sm mx-auto">
                  Take the standardized 17-item pediatric screener to generate clinical subscale analyses for emotional, attention, and conduct health.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Date &amp; Time</th>
                      <th className="p-2.5">Child Age</th>
                      <th className="p-2.5">Total Score</th>
                      <th className="p-2.5">Internalizing</th>
                      <th className="p-2.5">Attention</th>
                      <th className="p-2.5">Externalizing</th>
                      <th className="p-2.5">Clinical Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {assessments.slice(-5).reverse().map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-2.5 font-mono text-slate-500 text-[11px]">
                          {new Date(a.timestamp).toLocaleDateString()} {new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-2.5 font-medium">{a.child_age} yrs</td>
                        <td className="p-2.5 font-bold text-slate-900">
                          {a.total_score} <span className="text-slate-400 font-normal">/ {a.max_total_score}</span>
                        </td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            a.subscales?.internalizing?.flagged 
                              ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {a.subscales?.internalizing?.score ?? '-'}/10 {a.subscales?.internalizing?.flagged && '⚠'}
                          </span>
                        </td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            a.subscales?.attention?.flagged 
                              ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {a.subscales?.attention?.score ?? '-'}/10 {a.subscales?.attention?.flagged && '⚠'}
                          </span>
                        </td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            a.subscales?.externalizing?.flagged 
                              ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {a.subscales?.externalizing?.score ?? '-'}/14 {a.subscales?.externalizing?.flagged && '⚠'}
                          </span>
                        </td>
                        <td className="p-2.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            a.risk_tier === 0
                              ? 'bg-emerald-100 text-emerald-800'
                              : a.risk_tier === 1
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {a.risk_label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
