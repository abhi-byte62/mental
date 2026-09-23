import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  RefreshCw, 
  Printer, 
  History, 
  Brain, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Info,
  Calendar,
  Layers,
  ChevronRight,
  Wind,
  PhoneCall
} from 'lucide-react';
import { getAssessmentQuestions, submitAssessment, getAssessmentHistory, DEFAULT_PSC17_QUESTIONS } from '../api';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Items (17)' },
  { id: 'internalizing', label: 'Emotional Well-being (5)' },
  { id: 'attention', label: 'Focus & Attention (5)' },
  { id: 'externalizing', label: 'Behavior & Conduct (4)' },
  { id: 'social', label: 'Social Connectedness (3)' },
];

export default function ChildAssessment({ setActiveTab }) {
  const [questions, setQuestions] = useState(DEFAULT_PSC17_QUESTIONS || []);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [answers, setAnswers] = useState({});
  const [childAge, setChildAge] = useState(11);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Historical assessments
  const [historyList, setHistoryList] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Fetch questions on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoadingQuestions(true);
        const data = await getAssessmentQuestions();
        setQuestions(data);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setError("Could not connect to assessment service. Ensure backend is running.");
      } finally {
        setLoadingQuestions(false);
      }
    }
    loadData();
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const hist = await getAssessmentHistory();
      setHistoryList(hist || []);
    } catch (err) {
      console.warn("Could not load assessment history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSelectOption = (questionId, score) => {
    setAnswers(prev => ({
      ...prev,
      [String(questionId)]: score
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalCount = questions.length || 17;
  const progressPct = Math.round((answeredCount / totalCount) * 100);

  // Viva demo presets for quick evaluator testing
  const loadDemoPreset = (presetType) => {
    const newAnswers = {};
    if (presetType === 'healthy') {
      // Normative low-risk responses
      questions.forEach((q, idx) => {
        newAnswers[String(q.id)] = (idx % 4 === 0) ? 1 : 0;
      });
    } else if (presetType === 'elevated') {
      // Elevated internalizing & attention
      questions.forEach((q) => {
        if (q.category === 'internalizing') newAnswers[String(q.id)] = 2;
        else if (q.category === 'attention') newAnswers[String(q.id)] = 1;
        else if (q.category === 'social') newAnswers[String(q.id)] = 1;
        else newAnswers[String(q.id)] = 0;
      });
    } else if (presetType === 'attention') {
      // High ADHD/distractibility indicators
      questions.forEach((q) => {
        if (q.category === 'attention') newAnswers[String(q.id)] = 2;
        else newAnswers[String(q.id)] = (q.id % 3 === 0) ? 1 : 0;
      });
    }
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answeredCount < totalCount) {
      setError(`Please respond to all 17 items. You have completed ${answeredCount} of ${totalCount}.`);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        child_age: parseInt(childAge, 10),
        answers: answers
      };
      const res = await submitAssessment(payload);
      setResult(res);
      fetchHistory();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to submit assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetAssessment = () => {
    setResult(null);
    setAnswers({});
    setError(null);
  };

  const filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter(q => q.category === selectedCategory);

  return (
    <div className="space-y-8 py-2 max-w-5xl mx-auto">
      
      {/* Page Title & Clinical Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
              <ClipboardCheck className="w-3.5 h-3.5 text-slate-700" />
              <span>Standardized Pediatric Assessment (PSC-17)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Child Psychosocial Screening &amp; Surveillance
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl font-normal leading-relaxed">
              Based on the clinically validated 17-item Pediatric Symptom Checklist (Gardner et al., 1999). 
              Screens for internalizing emotional symptoms, attention difficulties, conduct, and relational well-being.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
            >
              <History className="w-3.5 h-3.5 text-slate-500" />
              <span>{showHistory ? "Hide History" : `History (${historyList.length})`}</span>
            </button>
          </div>
        </div>

        {/* Clinical Disclaimer & Protocol Info */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-500">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Clinical Protocol:</strong> 17 questions rated Never (0), Sometimes (1), or Often (2). Total cutoff ≥ 15 indicates need for consultation.</span>
          </div>
          <div className="flex items-start gap-2">
            <Brain className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            <span><strong>Subscales:</strong> Evaluates Internalizing (Emotional), Attention Focus, Externalizing Conduct, and Social Engagement.</span>
          </div>
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            <span><strong>DPDP Act Compliance:</strong> Anonymous surveillance screener. No personal identifiable information (PII) is stored.</span>
          </div>
        </div>
      </div>

      {/* Historical Assessment Drawer */}
      {showHistory && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">Longitudinal Assessment History (SQLite)</h3>
            </div>
            <span className="text-xs text-slate-500">Showing last {historyList.length} evaluations</span>
          </div>

          {loadingHistory ? (
            <div className="py-6 text-center text-xs text-slate-400">Loading historical records...</div>
          ) : historyList.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs bg-slate-50 rounded-lg border border-dashed border-slate-200">
              No previous formal assessments recorded. Submit an assessment below to establish the baseline.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Age</th>
                    <th className="py-2.5 px-3">Total Score (Max 34)</th>
                    <th className="py-2.5 px-3">Cutoff Status</th>
                    <th className="py-2.5 px-3">Subscales (Int/Att/Ext/Soc)</th>
                    <th className="py-2.5 px-3">Risk Classification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {historyList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                        {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{item.child_age} yrs</td>
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        {item.total_score} <span className="text-slate-400 font-normal">/ 34</span>
                      </td>
                      <td className="py-2.5 px-3">
                        {item.clinical_cutoff_met ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                            Cutoff Met (≥15)
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Normal (&lt;15)
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                        {item.internalizing_score} / {item.attention_score} / {item.externalizing_score} / {item.social_score}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          item.risk_tier === 2 
                            ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                            : item.risk_tier === 1 
                            ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {item.risk_label.split('/')[0].trim()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ERROR BANNER */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <div className="flex-1 font-medium">{error}</div>
          <button onClick={() => setError(null)} className="text-rose-500 hover:text-rose-700 font-bold">✕</button>
        </div>
      )}

      {/* VIEW A: DIAGNOSTIC REPORT (UPON SUBMISSION) */}
      {result ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Diagnostic Result Hero Card */}
          <div className={`p-6 sm:p-8 rounded-2xl border ${
            result.clinical_cutoff_met
              ? 'bg-rose-50/40 border-rose-200'
              : result.risk_tier === 1
              ? 'bg-amber-50/40 border-amber-200'
              : 'bg-emerald-50/40 border-emerald-200'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    result.clinical_cutoff_met
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : result.risk_tier === 1
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {result.clinical_cutoff_met ? "Clinical Threshold Exceeded" : "Within Normative Range"}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Evaluated for Child Age {result.child_age || childAge}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {result.risk_label}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed max-w-3xl">
                  {result.summary}
                </p>
              </div>

              {/* Total Score Meter Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col items-center justify-center shrink-0 min-w-[170px] text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">PSC-17 Total Score</span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold tracking-tight ${
                    result.clinical_cutoff_met ? 'text-rose-600' : 'text-slate-900'
                  }`}>
                    {result.total_score}
                  </span>
                  <span className="text-sm font-medium text-slate-400">/ 34</span>
                </div>
                <div className="mt-2 text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  Cutoff Threshold: ≥ 15
                </div>
              </div>
            </div>

            {/* Subscale Breakdown Grid */}
            <div className="mt-6">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-600" />
                <span>Validated Subscale Performance Profile</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(result.subscales).map(([key, sub]) => {
                  const pct = Math.round((sub.score / sub.max_score) * 100);
                  const cutoffPct = Math.round((sub.cutoff / sub.max_score) * 100);

                  return (
                    <div 
                      key={key} 
                      className={`p-4 rounded-xl border bg-white shadow-xs space-y-3 ${
                        sub.flagged ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 leading-tight">
                          {sub.name.split('(')[0].trim()}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sub.flagged 
                            ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {sub.flagged ? "Elevated" : "Normal"}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-slate-500 font-medium">Score:</span>
                        <span className="font-extrabold text-slate-900">
                          {sub.score} <span className="text-slate-400 font-normal">/ {sub.max_score}</span>
                        </span>
                      </div>

                      {/* Visual Subscale Progress Bar */}
                      <div className="space-y-1">
                        <div className="relative w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              sub.flagged ? 'bg-rose-500' : 'bg-slate-700'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>0</span>
                          <span className="font-semibold text-slate-600">Cutoff: ≥ {sub.cutoff}</span>
                          <span>{sub.max_score}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 pt-1 leading-snug border-t border-slate-100">
                        {sub.interpretation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Evidence-Based Recommendations */}
            <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-700" />
                <span>Targeted Non-Clinical Guidance &amp; Interventions</span>
              </h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Pathways & Re-evaluate Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('coping')}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span>Launch Coping Toolkit</span>
                </button>

                <button
                  onClick={() => setActiveTab('crisis')}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>National Childlines (1098 / 14416)</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Summary</span>
                </button>

                <button
                  onClick={resetAssessment}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Take Another Assessment</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* VIEW B: ACTIVE ASSESSMENT QUESTIONNAIRE */
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Controls Bar: Age Selector, Progress & Demo Presets */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Age Selection */}
            <div className="flex items-center gap-3">
              <label htmlFor="child-age" className="text-xs font-bold text-slate-700 whitespace-nowrap">
                Child Age:
              </label>
              <select
                id="child-age"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-800"
              >
                {Array.from({ length: 15 }, (_, i) => i + 4).map(age => (
                  <option key={age} value={age}>{age} Years Old</option>
                ))}
              </select>
            </div>

            {/* Answered Progress Indicator */}
            <div className="flex-1 max-w-xs space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Answered Progress:</span>
                <span className="font-bold text-slate-900">{answeredCount} of {totalCount} ({progressPct}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    answeredCount === totalCount ? 'bg-emerald-600' : 'bg-slate-800'
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Evaluator Quick Demo Fillers */}
            <div className="flex items-center gap-1.5 self-start md:self-center">
              <span className="text-[11px] font-semibold text-slate-500 mr-1 hidden sm:inline">Demo Presets:</span>
              <button
                type="button"
                onClick={() => loadDemoPreset('healthy')}
                className="px-2.5 py-1 text-[11px] font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                title="Populate typical healthy child profile"
              >
                Normative (Low)
              </button>
              <button
                type="button"
                onClick={() => loadDemoPreset('elevated')}
                className="px-2.5 py-1 text-[11px] font-semibold rounded bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors"
                title="Populate elevated emotional distress profile"
              >
                Elevated (Distress)
              </button>
              <button
                type="button"
                onClick={() => loadDemoPreset('attention')}
                className="px-2.5 py-1 text-[11px] font-semibold rounded bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-colors"
                title="Populate focus & hyperactivity profile"
              >
                Focus Strain
              </button>
            </div>

          </div>

          {/* Subscale Category Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {loadingQuestions ? (
              <div className="py-16 text-center text-xs font-medium text-slate-500 bg-white rounded-xl border border-slate-200">
                Loading validated 17-item pediatric assessment instrument...
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 bg-white rounded-xl border border-slate-200">
                No items found for this subscale category.
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const currentVal = answers[String(q.id)];
                const isAnswered = currentVal !== undefined;

                return (
                  <div 
                    key={q.id}
                    className={`p-5 rounded-xl border transition-all ${
                      isAnswered 
                        ? 'bg-white border-slate-300 shadow-xs' 
                        : 'bg-slate-50/50 border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      
                      {/* Question Details */}
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            Q{String(q.id).padStart(2, '0')}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                            {q.category_title || q.category}
                          </span>
                        </div>

                        <p className="text-sm font-bold text-slate-900 leading-snug">
                          {q.text}
                        </p>

                        {q.help_text && (
                          <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            {q.help_text}
                          </p>
                        )}
                      </div>

                      {/* 3-Point Likert Options (Never, Sometimes, Often) */}
                      <div className="grid grid-cols-3 gap-2 shrink-0 sm:w-80">
                        
                        {/* Option 0: Never */}
                        <button
                          type="button"
                          onClick={() => handleSelectOption(q.id, 0)}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all ${
                            currentVal === 0
                              ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 font-medium'
                          }`}
                        >
                          <span className="text-xs">Never</span>
                          <span className={`text-[10px] mt-0.5 ${currentVal === 0 ? 'text-slate-300' : 'text-slate-400'}`}>
                            0 pts
                          </span>
                        </button>

                        {/* Option 1: Sometimes */}
                        <button
                          type="button"
                          onClick={() => handleSelectOption(q.id, 1)}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all ${
                            currentVal === 1
                              ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 font-medium'
                          }`}
                        >
                          <span className="text-xs">Sometimes</span>
                          <span className={`text-[10px] mt-0.5 ${currentVal === 1 ? 'text-slate-300' : 'text-slate-400'}`}>
                            1 pt
                          </span>
                        </button>

                        {/* Option 2: Often */}
                        <button
                          type="button"
                          onClick={() => handleSelectOption(q.id, 2)}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all ${
                            currentVal === 2
                              ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 font-medium'
                          }`}
                        >
                          <span className="text-xs">Often</span>
                          <span className={`text-[10px] mt-0.5 ${currentVal === 2 ? 'text-slate-300' : 'text-slate-400'}`}>
                            2 pts
                          </span>
                        </button>

                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Submission Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-20">
            <div className="text-xs text-slate-600 font-medium">
              {answeredCount === totalCount ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  All 17 items answered. Ready to generate clinical diagnostic report.
                </span>
              ) : (
                <span>
                  Please complete the remaining <strong>{totalCount - answeredCount}</strong> items to finalize the evaluation.
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || answeredCount < totalCount}
              className={`flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-lg transition-all ${
                answeredCount === totalCount && !submitting
                  ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Evaluating Clinical Scales...</span>
                </>
              ) : (
                <>
                  <span>Submit &amp; Generate Diagnostic Report</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
