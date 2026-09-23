import React from 'react';
import { 
  Heart, 
  BarChart3, 
  Wind, 
  PhoneCall, 
  ShieldCheck, 
  Brain, 
  Activity, 
  ArrowRight,
  Database,
  Lock,
  Layers,
  CheckCircle2,
  FileCheck,
  ClipboardCheck
} from 'lucide-react';

export default function Home({ setActiveTab, onQuickSeed }) {
  const features = [
    {
      icon: ClipboardCheck,
      title: "Standardized Child Assessment (PSC-17)",
      desc: "Validated 17-item pediatric psychosocial screener (Gardner et al., 1999) measuring internalizing, attention, and conduct subscales.",
      tab: "assessment",
      cta: "Take Assessment"
    },
    {
      icon: Heart,
      title: "Child-Centered Mood Check-in",
      desc: "Low-cognitive-load interaction with 6 primary affective emoji states and lifestyle sliders for sleep, screen exposure, and stress.",
      tab: "checkin",
      cta: "Open Check-in"
    },
    {
      icon: Brain,
      title: "Dual-Modality AI Assessment",
      desc: "Supervised Random Forest risk stratification (Low, Moderate, Elevated) combined with local VADER lexical sentiment analysis.",
      tab: "diagnostics",
      cta: "View Model Details"
    },
    {
      icon: Wind,
      title: "Evidence-Based Coping Toolkit",
      desc: "Non-clinical psychoeducational modules including 4-7-8 breathing pacer, 5-4-3-2-1 sensory grounding, and positive affirmations.",
      tab: "coping",
      cta: "Explore Exercises"
    },
    {
      icon: BarChart3,
      title: "Guardian Longitudinal Tracking",
      desc: "Privacy-preserving longitudinal dashboards with 7-day rolling averages, lifestyle correlation trends, and distress alert flags.",
      tab: "dashboard",
      cta: "Open Dashboard"
    },
    {
      icon: Lock,
      title: "Privacy by Design (DPDP Act 2023)",
      desc: "Strict compliance with Section 9 of India's Digital Personal Data Protection Act. Raw child journal reflections are never persisted.",
      tab: "diagnostics",
      cta: "Privacy Specs"
    },
    {
      icon: PhoneCall,
      title: "Verified Crisis Referral Pathways",
      desc: "Direct integration with verified national services including Childline (1098), Tele-MANAS (14416), and Emergency (112).",
      tab: "crisis",
      cta: "Crisis Directory"
    },
  ];

  return (
    <div className="space-y-12 py-4">
      
      {/* Professional Hero Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xs">
        <div className="max-w-3xl space-y-5">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
            <FileCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Academic Research Prototype • Phase 2 Implementation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Child Well-being Surveillance, Assessment &amp; Longitudinal Tracking
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            MindBridge is an engineering platform designed for continuous, non-clinical mental health 
            surveillance among children and adolescents. It combines child-friendly self-reporting with 
            supervised machine learning risk stratification, explainable caregiver dashboards, and verified 
            crisis referral pathways.
          </p>

          {/* Quick CTA Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('assessment')}
              className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Child Assessment (PSC-17)</span>
            </button>

            <button
              onClick={() => setActiveTab('checkin')}
              className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs border border-slate-300 transition-colors flex items-center gap-2"
            >
              <span>Daily Check-in</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs border border-slate-300 transition-colors"
            >
              Guardian Analytics
            </button>

            <button
              onClick={onQuickSeed}
              className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs border border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5 text-slate-500" />
              <span>Load 14-Day Sample Data</span>
            </button>
          </div>

        </div>

        {/* Clinical Disclaimer Strip */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>Non-clinical assessment system. Outputs are computational estimates, not medical diagnoses.</span>
          </div>
          <span className="font-mono text-slate-400">Presidency University • 2026–2027</span>
        </div>
      </section>

      {/* Target Roles: Child vs. Guardian */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Child Workflow Card */}
        <div className="card-surface p-7 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">Child Portal</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed for ages 8–17 with minimal cognitive burden. Single-tap mood selector, 
              interactive lifestyle sliders, optional reflective journal, and evidence-based coping tools.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                <span>6 primary affective states with intuitive emoji anchors</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Private journal analyzed in-memory (never persisted to disk)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Immediate access to guided 4-7-8 breathing and sensory grounding</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setActiveTab('checkin')}
            className="w-full py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium text-xs transition-colors"
          >
            Launch Child Check-in Interface →
          </button>
        </div>

        {/* Guardian Workflow Card */}
        <div className="card-surface p-7 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">Guardian &amp; Educator Portal</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Longitudinal tracking dashboard to observe trend shifts and identify chronic distress early. 
              Child journal text is strictly concealed to preserve trust and DPDP compliance.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Longitudinal mood trajectory with 7-day rolling averages</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Automated distress alert on 3 consecutive elevated risk check-ins</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                <span>1-click summary CSV export for pediatric or clinical consultations</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="w-full py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium text-xs transition-colors"
          >
            Launch Guardian Analytics Dashboard →
          </button>
        </div>

      </section>

      {/* Core Architectural Modules */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">System Capabilities</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Decoupled 5-tier architecture combining machine learning, NLP, and localized persistence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="card-surface card-surface-hover p-5 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900">{f.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-4">
                  <button
                    onClick={() => setActiveTab(f.tab)}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
                  >
                    <span>{f.cta}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* System Topology Banner */}
      <section className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Architectural Pipeline
            </span>
            <h3 className="text-lg font-bold text-white">Full-Stack Decoupled Architecture</h3>
          </div>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors self-start sm:self-auto"
          >
            Review ML Model Metrics →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="font-mono text-[10px] text-slate-400 uppercase">Tier 1</span>
            <div className="font-semibold text-white">Frontend Client</div>
            <div className="text-[11px] text-slate-400">React + Vite</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="font-mono text-[10px] text-slate-400 uppercase">Tier 2</span>
            <div className="font-semibold text-white">API Gateway</div>
            <div className="text-[11px] text-slate-400">FastAPI + Pydantic</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="font-mono text-[10px] text-slate-400 uppercase">Tier 3</span>
            <div className="font-semibold text-white">Risk Classifier</div>
            <div className="text-[11px] text-slate-400">Random Forest</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <span className="font-mono text-[10px] text-slate-400 uppercase">Tier 4</span>
            <div className="font-semibold text-white">NLP Valence</div>
            <div className="text-[11px] text-slate-400">VADER Lexicon</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1 col-span-2 sm:col-span-1">
            <span className="font-mono text-[10px] text-slate-400 uppercase">Tier 5</span>
            <div className="font-semibold text-white">Data Storage</div>
            <div className="text-[11px] text-slate-400">SQLAlchemy ORM</div>
          </div>
        </div>
      </section>

    </div>
  );
}
