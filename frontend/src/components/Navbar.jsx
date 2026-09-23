import React from 'react';
import { 
  Heart, 
  BarChart3, 
  PhoneCall, 
  Activity, 
  Home, 
  Wind,
  ShieldAlert,
  Database,
  ClipboardCheck
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onQuickSeed, backendOnline }) {
  const navItems = [
    { id: 'home', label: 'Overview', icon: Home },
    { id: 'checkin', label: 'Daily Check-in', icon: Heart },
    { id: 'assessment', label: 'Child Assessment (PSC-17)', icon: ClipboardCheck },
    { id: 'coping', label: 'Coping Toolkit', icon: Wind },
    { id: 'dashboard', label: 'Guardian Analytics', icon: BarChart3 },
    { id: 'crisis', label: 'Crisis Support', icon: PhoneCall },
    { id: 'diagnostics', label: 'Model Diagnostics', icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15">
          
          {/* Brand Logo & Identifier */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-sm tracking-tight">
              MB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-base">MindBridge</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  Surveillance
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal leading-none mt-0.5">
                Presidency University • Capstone
              </p>
            </div>
          </div>

          {/* Clean Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {/* Quick Demo Seed Button */}
            <button
              onClick={onQuickSeed}
              title="Populate realistic 14-day history for viva demonstration"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-slate-500" />
              <span>Load Demo Data</span>
            </button>

            {/* Helpline Link */}
            <button
              onClick={() => setActiveTab('crisis')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>1098</span>
            </button>

            {/* System Status Pill */}
            <div 
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded-full border ${
                backendOnline 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${backendOnline ? 'bg-emerald-600' : 'bg-rose-600'}`} />
              <span className="hidden sm:inline font-medium">{backendOnline ? "API Online" : "API Offline"}</span>
            </div>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
