import React, { useState } from 'react';
import { 
  Heart, 
  BarChart3, 
  PhoneCall, 
  Activity, 
  Home, 
  Wind,
  ShieldAlert,
  Database,
  ClipboardCheck,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Shield
} from 'lucide-react';
import { DEMO_USERS_LIST } from '../api';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onQuickSeed, 
  backendOnline, 
  currentUser, 
  onSwitchUser, 
  onLogout 
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const primaryNavItems = [
    { id: 'home', label: 'Overview', icon: Home },
    { id: 'checkin', label: 'Daily Check-in', icon: Heart },
    { id: 'assessment', label: 'Child Assessment (PSC-17)', icon: ClipboardCheck },
    { id: 'coping', label: 'Coping Toolkit', icon: Wind },
    { id: 'dashboard', label: 'Guardian Analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15">
          
          {/* Brand Logo & Identifier */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-extrabold text-xs tracking-tight">
              MB
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base">MindBridge</span>
                <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wider">
                  Surveillance
                </span>
              </div>
            </div>
          </div>

          {/* Primary Navigation Links — Dominant & Spacious */}
          <nav className="hidden lg:flex items-center gap-1 ml-4">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Visually Subordinate Secondary / Utility Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* National Helpline 1098 — Compact Ghost Pill */}
            <button
              onClick={() => setActiveTab('crisis')}
              title="National Childline (1098) & Tele-MANAS (14416)"
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-slate-500 hover:text-rose-700 hover:bg-rose-50/60 border border-transparent hover:border-rose-200 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-slate-400" />
              <span>1098</span>
            </button>

            {/* Quick Demo Seed Button — Subdued */}
            <button
              onClick={onQuickSeed}
              title="Populate 14-day multimodal dataset"
              className="hidden md:flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <Database className="w-3 h-3 text-slate-400" />
              <span>Sample Data</span>
            </button>

            {/* Model Diagnostics Link — Subdued */}
            <button
              onClick={() => setActiveTab('diagnostics')}
              title="Review ML & NLP validation metrics"
              className={`hidden md:flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                activeTab === 'diagnostics'
                  ? 'text-slate-900 font-bold bg-slate-100'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-3 h-3 text-slate-400" />
              <span>Diagnostics</span>
            </button>

            {/* Small Divider */}
            <div className="hidden sm:block h-3.5 w-px bg-slate-200 mx-0.5" />

            {/* User Profile & Demo Switcher Hub */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 transition-colors text-xs font-semibold"
                >
                  <span className="text-xs">{currentUser.avatar || "👤"}</span>
                  <span className="max-w-[80px] truncate text-[11px] font-bold text-slate-800">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('auth')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  <User className="w-3 h-3" />
                  <span>Sign In</span>
                </button>
              )}

              {/* User Dropdown Menu */}
              {showUserMenu && currentUser && (
                <div className="absolute right-0 mt-2 w-64 card-surface rounded-xl border border-slate-200 py-1.5 z-50">
                  <div className="px-3.5 py-2 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[10.5px] text-slate-500 font-mono">@{currentUser.username}</p>
                    <span className="inline-block mt-1 text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-800 capitalize">
                      {currentUser.role} Mode
                    </span>
                  </div>

                  <div className="px-1.5 py-1">
                    <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider px-2 py-0.5">Switch Persona</p>
                    {DEMO_USERS_LIST.map((demo) => (
                      <button
                        key={demo.username}
                        onClick={() => {
                          onSwitchUser(demo.username);
                          setShowUserMenu(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded-md text-xs flex items-center justify-between transition-colors ${
                          currentUser.username === demo.username
                            ? 'bg-slate-100 text-slate-900 font-bold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span>{demo.avatar}</span>
                          <span className="truncate text-[11px]">{demo.name}</span>
                        </div>
                        <span className="text-[9.5px] text-slate-400 capitalize">{demo.role}</span>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 px-1.5 pt-1 mt-0.5">
                    <button
                      onClick={() => {
                        setActiveTab('auth');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded-md text-[11px] font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-slate-500" />
                      <span>Account Portal / Register</span>
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded-md text-[11px] font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-1.5"
                    >
                      <LogOut className="w-3 h-3 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* System Status Pill — Compact Dot */}
            <div 
              title={backendOnline ? "Backend API Gateway Online (Port 8000)" : "Backend API Gateway Offline"}
              className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-slate-400"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${backendOnline ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <span className="hidden sm:inline">{backendOnline ? "API Live" : "Offline"}</span>
            </div>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-1.5 gap-1 border-t border-slate-100 no-scrollbar">
          {[
            ...primaryNavItems,
            { id: 'diagnostics', label: 'Diagnostics', icon: Activity },
            { id: 'crisis', label: '1098 Crisis', icon: PhoneCall },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}

