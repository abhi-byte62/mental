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
  CheckCircle2, 
  FileCheck, 
  ClipboardCheck,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Home({ setActiveTab, onQuickSeed }) {
  const features = [
    {
      icon: ClipboardCheck,
      title: "Pediatric Assessment (PSC-17)",
      desc: "Validated 17-item pediatric psychosocial screener (Gardner et al., 1999) measuring internalizing, attention, and conduct subscales.",
      tab: "assessment",
      cta: "Launch Assessment"
    },
    {
      icon: Heart,
      title: "Child-Centered Mood Check-in",
      desc: "Low-cognitive-load interaction with 6 primary affective emoji anchors and lifestyle sliders for sleep, screen exposure, and stress.",
      tab: "checkin",
      cta: "Open Daily Check-in"
    },
    {
      icon: Brain,
      title: "Dual-Modality AI Classifier",
      desc: "Supervised Random Forest risk stratification (Low, Moderate, Elevated) coupled with real-time VADER lexical sentiment analysis.",
      tab: "diagnostics",
      cta: "Inspect Model Architecture"
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
      cta: "Open Analytics"
    },
    {
      icon: Lock,
      title: "Privacy by Design (DPDP Act 2023)",
      desc: "Strict compliance with Section 9 of India's Digital Personal Data Protection Act. Raw child journal reflections are never persisted.",
      tab: "diagnostics",
      cta: "Review Privacy Controls"
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
    <div className="space-y-6 py-1 sm:py-3">
      
      {/* Refined Production Hero Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Description & Hierarchical Actions */}
          <div className="lg:col-span-7 space-y-3.5">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
              <FileCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Pediatric Mental Health Surveillance &amp; Tracking Platform</span>
            </div>

            {/* Compact 3-line Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Child Well-being Surveillance, Assessment &amp; Tracking
            </h1>

            {/* Concise Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              MindBridge is a non-clinical engineering platform engineered for continuous mental health 
              surveillance among children and adolescents. It couples child-centered self-reporting with 
              supervised machine learning risk stratification, explainable guardian analytics, and verified 
              crisis referral pathways.
            </p>

            {/* Hierarchical Action Controls */}
            <div className="pt-0.5 flex flex-wrap items-center gap-2">
              {/* Primary CTA — Dominant */}
              <button
                onClick={() => setActiveTab('assessment')}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <ClipboardCheck className="w-3.5 h-3.5 text-slate-200" />
                <span>Child Assessment (PSC-17)</span>
              </button>

              {/* Secondary Actions — Subdued Outline */}
              <button
                onClick={() => setActiveTab('checkin')}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors flex items-center gap-1.5"
              >
                <span>Daily Check-in</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors"
              >
                Guardian Analytics
              </button>

              {/* Tertiary Ghost Button */}
              <button
                onClick={onQuickSeed}
                title="Populate 14-day multimodal dataset"
                className="px-2.5 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-medium hover:bg-slate-100 transition-colors flex items-center gap-1"
              >
                <Database className="w-3.5 h-3.5 text-slate-400" />
                <span>Sample Data</span>
              </button>
            </div>

          </div>

          {/* Right Column: Balanced Telemetry & Platform Specifications Panel */}
          <div className="lg:col-span-5">
            <div className="p-4 sm:p-4.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Platform Architecture
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white text-emerald-700 border border-emerald-200">
                  Production V2.1
                </span>
              </div>

              <div className="space-y-2 text-xs">
                
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200/70">
                  <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                    <Brain className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 text-[11px] truncate">Dual-Modality AI Risk Engine</div>
                    <div className="text-[10px] text-slate-500 font-medium truncate">Scikit-Learn Random Forest (77.2% CV) + VADER NLP</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200/70">
                  <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <ClipboardCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 text-[11px] truncate">PSC-17 Pediatric Screener</div>
                    <div className="text-[10px] text-slate-500 font-medium truncate">Internalizing, Attention &amp; Conduct Subscales</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200/70">
                  <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 text-[11px] truncate">DPDP Act 2023 Section 9</div>
                    <div className="text-[10px] text-slate-500 font-medium truncate">In-Memory Text Analysis • Zero Journal Persistence</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200/70">
                  <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 text-[11px] truncate">Longitudinal Persistence</div>
                    <div className="text-[10px] text-slate-500 font-medium truncate">7-Day Rolling Averages • Automated Distress Triggers</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Disclaimer / Footer inside Hero Card */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[10.5px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-slate-400 shrink-0" />
            <span>Non-clinical surveillance system. Outputs represent computational risk assessments, not psychiatric diagnoses.</span>
          </div>
          <span className="font-mono text-[9.5px] text-slate-400">Presidency University • 2026–2027</span>
        </div>
      </section>

      {/* Target Roles: Child vs. Guardian (Equal Height, Tight Spacing & Aligned CTAs) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Child Workflow Card */}
        <div className="card-surface p-5 rounded-2xl border border-slate-200 flex flex-col justify-between h-full">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                01
              </span>
              <span className="text-[10.5px] font-semibold text-slate-500">Target Group: Ages 8–17</span>
            </div>
            
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Child Portal</h3>
            
            <p className="text-xs text-slate-600 leading-snug font-normal">
              Designed for low cognitive load. Single-tap mood selector, 
              lifestyle sliders, optional reflective journal, and evidence-based coping tools.
            </p>
            
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>6 primary affective states with intuitive emoji anchors</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Private journal analyzed in-memory (never persisted to disk)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Guided 4-7-8 breathing pacer &amp; 5-4-3-2-1 sensory grounding</span>
              </li>
            </ul>
          </div>
          
          <button
            onClick={() => setActiveTab('checkin')}
            className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Launch Child Check-in Interface</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Guardian Workflow Card */}
        <div className="card-surface p-5 rounded-2xl border border-slate-200 flex flex-col justify-between h-full">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                02
              </span>
              <span className="text-[10.5px] font-semibold text-slate-500">Target Group: Caregivers &amp; Teachers</span>
            </div>
            
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Guardian &amp; Educator Portal</h3>
            
            <p className="text-xs text-slate-600 leading-snug font-normal">
              Longitudinal tracking dashboard to observe trend shifts and identify chronic distress early. 
              Child journal reflections remain strictly confidential under DPDP guidelines.
            </p>
            
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Longitudinal mood trajectory with 7-day rolling averages</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Automated distress alert on 3 consecutive elevated check-ins</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>1-click summary CSV export for clinical consultations</span>
              </li>
            </ul>
          </div>
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Launch Guardian Analytics Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

      </section>

      {/* Core Architectural Modules */}
      <section className="space-y-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">System Capabilities</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Decoupled 5-tier architecture combining machine learning, NLP, and localized persistence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="card-surface p-4 rounded-xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">{f.title}</h4>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{f.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 mt-2.5">
                  <button
                    onClick={() => setActiveTab(f.tab)}
                    className="text-xs font-bold text-slate-800 hover:text-slate-950 flex items-center gap-1 transition-colors"
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
      <section className="bg-slate-900 text-slate-100 rounded-2xl p-5 sm:p-6 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              Architectural Pipeline
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">Full-Stack Decoupled Architecture</h3>
          </div>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors self-start sm:self-auto"
          >
            Review ML Model Metrics →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-0.5">
            <span className="font-mono text-[9.5px] text-slate-400 uppercase">Tier 1</span>
            <div className="font-bold text-white text-[11px]">Frontend Client</div>
            <div className="text-[10px] text-slate-400">React + Vite</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-0.5">
            <span className="font-mono text-[9.5px] text-slate-400 uppercase">Tier 2</span>
            <div className="font-bold text-white text-[11px]">API Gateway</div>
            <div className="text-[10px] text-slate-400">FastAPI + Pydantic</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-0.5">
            <span className="font-mono text-[9.5px] text-slate-400 uppercase">Tier 3</span>
            <div className="font-bold text-white text-[11px]">Risk Classifier</div>
            <div className="text-[10px] text-slate-400">Random Forest</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-0.5">
            <span className="font-mono text-[9.5px] text-slate-400 uppercase">Tier 4</span>
            <div className="font-bold text-white text-[11px]">NLP Valence</div>
            <div className="text-[10px] text-slate-400">VADER Lexicon</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-0.5 col-span-2 sm:col-span-1">
            <span className="font-mono text-[9.5px] text-slate-400 uppercase">Tier 5</span>
            <div className="font-bold text-white text-[11px]">Data Storage</div>
            <div className="text-[10px] text-slate-400">SQLAlchemy ORM</div>
          </div>
        </div>
      </section>

    </div>
  );
}
