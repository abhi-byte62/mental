import React from 'react';
import { ShieldCheck, Phone } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Medical & Ethical Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-slate-500 shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <span className="font-semibold text-slate-900">Academic &amp; Ethical Notice:</span>{' '}
            MindBridge is a non-clinical engineering prototype for longitudinal surveillance research. 
            It does not provide psychiatric diagnoses or medical treatments. Self-reported text entries are 
            analyzed strictly in-memory and are never stored (DPDP Act 2023, Section 9).
          </div>
        </div>

        {/* Links & Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-600">
          
          <div className="space-y-2">
            <div className="font-bold text-slate-900 text-sm">MindBridge</div>
            <p className="text-slate-500 leading-relaxed">
              Early mental health and well-being surveillance, assessment, and tracking solution among children and adolescents.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] mb-2">Navigation</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-slate-900 transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('assessment')} className="hover:text-slate-900 transition-colors">
                  Child Assessment (PSC-17)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('checkin')} className="hover:text-slate-900 transition-colors">
                  Daily Check-in
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('coping')} className="hover:text-slate-900 transition-colors">
                  Coping Toolkit
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-slate-900 transition-colors">
                  Guardian Analytics
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('diagnostics')} className="hover:text-slate-900 transition-colors">
                  Model Diagnostics
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] mb-2">Academic Team</h4>
            <ul className="space-y-1 text-slate-600 font-mono text-[11px]">
              <li>Harsha R (20231CSE0261)</li>
              <li>Arjun M (20231CSE0277)</li>
              <li>Abhishek MR (20231CSE0268)</li>
              <li className="pt-1.5 font-sans text-xs text-slate-500">
                <span className="font-medium text-slate-700">Guide:</span> Mr. Jetti Satya Sai Kumar
              </li>
              <li className="font-sans text-xs text-slate-500">Presidency University, Bengaluru</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] mb-2">Emergency Pathways</h4>
            <div className="space-y-2">
              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-rose-600" />
                  <span>Childline: 1098 (24/7)</span>
                </div>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-600" />
                  <span>Tele-MANAS: 14416 (24/7)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <p>© 2026–2027 Presidency University • B.Tech Computer Science and Engineering.</p>
          <p>Full System Implementation &amp; Complete Academic Prototype</p>
        </div>

      </div>
    </footer>
  );
}
