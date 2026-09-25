import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  HeartHandshake, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  GraduationCap,
  Users
} from 'lucide-react';
import { loginUser, registerUser, demoLoginUser, DEMO_USERS_LIST } from '../api';

const CHILD_AVATARS = ["🧒", "👧", "🦁", "🚀", "🎨", "🌈", "⚽", "🦄", "🐼", "🌟"];

export default function Auth({ currentUser, onAuthSuccess, setActiveTab }) {
  const [activeMode, setActiveMode] = useState('demo'); // 'demo' | 'signin' | 'signup'
  const [role, setRole] = useState('child'); // 'child' | 'guardian' | 'clinician'
  
  // Sign In State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Sign Up State
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [childAge, setChildAge] = useState(11);
  const [grade, setGrade] = useState('Grade 6');
  const [selectedAvatar, setSelectedAvatar] = useState('🧒');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleDemoLogin = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const res = await demoLoginUser(username);
      setSuccessMsg(res.message);
      onAuthSuccess(res.user);
      setTimeout(() => {
        if (res.user.role === 'guardian') {
          setActiveTab('dashboard');
        } else {
          setActiveTab('checkin');
        }
      }, 500);
    } catch (err) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser({ username: loginUsername, password: loginPassword });
      setSuccessMsg(res.message);
      onAuthSuccess(res.user);
      setTimeout(() => {
        if (res.user.role === 'guardian') {
          setActiveTab('dashboard');
        } else {
          setActiveTab('checkin');
        }
      }, 500);
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regUsername || !regName || !regPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: regName,
        username: regUsername,
        password: regPassword,
        role: role,
        email: role !== 'child' ? regEmail : null,
        child_age: role === 'child' ? parseInt(childAge) : null,
        grade: role === 'child' ? grade : (role === 'guardian' ? 'Parent / Caregiver' : 'Clinician / Educator'),
        avatar: selectedAvatar,
      };
      const res = await registerUser(payload);
      setSuccessMsg(res.message);
      onAuthSuccess(res.user);
      setTimeout(() => {
        if (res.user.role === 'guardian') {
          setActiveTab('dashboard');
        } else {
          setActiveTab('checkin');
        }
      }, 500);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          <span>Role-Based Access & Privacy Assurance (DPDP Act 2023)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          MindBridge Portal Access
        </h1>
        <p className="text-sm text-slate-600">
          Sign in to your personalized mental health tracking dashboard or jump straight into an instant evaluation account.
        </p>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => { setActiveMode('demo'); setError(null); }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'demo'
                ? 'bg-white text-slate-900 border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ 1-Click Instant Demo
          </button>
          <button
            onClick={() => { setActiveMode('signin'); setError(null); }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'signin'
                ? 'bg-white text-slate-900 border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔑 Sign In
          </button>
          <button
            onClick={() => { setActiveMode('signup'); setError(null); }}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeMode === 'signup'
                ? 'bg-white text-slate-900 border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ✨ Create Account
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Mode 1: Instant Demo Accounts */}
      {activeMode === 'demo' && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-900">Choose a Demo Role to Test Instantly</h2>
            <p className="text-xs text-slate-500">Pre-seeded accounts designed for academic review and feature demonstration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_USERS_LIST.map((demo) => {
              const isChild = demo.role === 'child';
              const isGuardian = demo.role === 'guardian';
              const isClinician = demo.role === 'clinician';

              return (
                <div
                  key={demo.username}
                  className={`card-surface p-6 rounded-2xl border transition-all flex flex-col justify-between hover:border-slate-300 relative ${
                    currentUser?.username === demo.username
                      ? 'border-slate-900 bg-slate-50/50'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl p-2.5 bg-white rounded-xl border border-slate-200">
                        {demo.avatar}
                      </span>
                      <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        isChild ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        isGuardian ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        'bg-slate-100 text-slate-800 border border-slate-200'
                      }`}>
                        {demo.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900">{demo.name}</h3>
                      <p className="text-xs font-semibold text-slate-500">{demo.grade}</p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {demo.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                      <div className="flex justify-between">
                        <span>Username:</span>
                        <code className="font-mono font-bold text-slate-700">{demo.username}</code>
                      </div>
                      <div className="flex justify-between">
                        <span>Role Mode:</span>
                        <span className="font-bold capitalize text-slate-700">{demo.role}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={loading}
                    onClick={() => handleDemoLogin(demo.username)}
                    className={`mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isChild
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : isGuardian
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Launch {demo.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 2: Sign In */}
      {activeMode === 'signin' && (
        <div className="max-w-md mx-auto card-surface p-8 rounded-2xl border border-slate-200 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Sign in to MindBridge</h2>
            <p className="text-xs text-slate-500">Enter your credentials to access your tracking session</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. child_demo, guardian_demo, or your username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-slate-800 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-slate-800 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating…' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account yet?{' '}
              <button
                onClick={() => setActiveMode('signup')}
                className="font-bold text-slate-900 hover:underline"
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Mode 3: Sign Up */}
      {activeMode === 'signup' && (
        <div className="max-w-lg mx-auto card-surface p-8 rounded-2xl border border-slate-200 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Create MindBridge Profile</h2>
            <p className="text-xs text-slate-500">Select your role to configure privacy and age-adapted views</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'child', label: 'Child Account', icon: '🧒', sub: 'Ages 4-18' },
              { id: 'guardian', label: 'Guardian / Parent', icon: '👨‍👩‍👧', sub: 'Caregiver' },
              { id: 'clinician', label: 'School / Counselor', icon: '🩺', sub: 'Clinical' },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  role === r.id
                    ? 'border-slate-900 bg-slate-100 text-slate-900 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className="text-2xl">{r.icon}</span>
                <span className="text-xs font-bold">{r.label}</span>
                <span className="text-[10px] text-slate-400">{r.sub}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {role === 'child' ? "Child's First Name or Nickname" : 'Full Name'}
              </label>
              <input
                type="text"
                required
                placeholder={role === 'child' ? "e.g. Ashrith, Maya" : "e.g. Nitiz"}
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-slate-800 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Username</label>
              <input
                type="text"
                required
                placeholder="Choose a unique username"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-slate-800 bg-white"
              />
            </div>

            {role !== 'child' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-slate-800 bg-white"
                />
              </div>
            )}

            {role === 'child' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-slate-800 bg-white"
                  >
                    {[6,7,8,9,10,11,12,13,14,15,16,17,18].map(a => (
                      <option key={a} value={a}>{a} years old</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Grade / Class</label>
                  <input
                    type="text"
                    placeholder="e.g. Grade 6"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-slate-800 bg-white"
                  />
                </div>
              </div>
            )}

            {role === 'child' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Choose Avatar Emoji</label>
                <div className="flex flex-wrap gap-2">
                  {CHILD_AVATARS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`text-xl p-2 rounded-xl border transition-all ${
                        selectedAvatar === av
                          ? 'border-slate-900 bg-slate-100 font-bold'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Create a password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-slate-800 bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Creating Account…' : 'Register Account'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <button
                onClick={() => setActiveMode('signin')}
                className="font-bold text-slate-900 hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Privacy Guarantee Box */}
      <div className="card-surface p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            DPDP Act 2023 Child Privacy Compliance
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            MindBridge implements privacy-by-design under Section 9 of the Digital Personal Data Protection Act, 2023. No biometric tracking, no advertising identifiers, and all freeform journal text is processed purely in-memory using local VADER NLP scoring without raw database retention.
          </p>
        </div>
      </div>

    </div>
  );
}
