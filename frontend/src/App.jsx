import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { checkHealth, seedDemo, getStoredUser, demoLoginUser, logoutUser } from './api';

// Lazily load tab views for instant initial page loading & reduced initial bundle
const CheckIn = lazy(() => import('./pages/CheckIn'));
const ChildAssessment = lazy(() => import('./pages/ChildAssessment'));
const CopingToolkit = lazy(() => import('./pages/CopingToolkit'));
const GuardianDashboard = lazy(() => import('./pages/GuardianDashboard'));
const CrisisResources = lazy(() => import('./pages/CrisisResources'));
const Diagnostics = lazy(() => import('./pages/Diagnostics'));
const Auth = lazy(() => import('./pages/Auth'));

function PageLoader() {
  return (
    <div className="py-20 flex flex-col items-center justify-center space-y-3 text-slate-500">
      <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
      <span className="text-xs font-medium">Loading module...</span>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [backendOnline, setBackendOnline] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());

  useEffect(() => {
    async function verifyBackend() {
      try {
        await checkHealth();
        setBackendOnline(true);
      } catch (err) {
        setBackendOnline(false);
      }
    }
    verifyBackend();
    const interval = setInterval(verifyBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickSeed = async () => {
    try {
      const res = await seedDemo("balanced", 14);
      setToastMessage(res.message);
      setActiveTab('dashboard');
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err) {
      alert("Failed to load demo data. Please ensure the Python FastAPI backend is running.");
    }
  };

  const handleSwitchUser = async (username) => {
    try {
      const res = await demoLoginUser(username);
      setCurrentUser(res.user);
      setToastMessage(`Switched to: ${res.user.name} (${res.user.role})`);
      setTimeout(() => setToastMessage(null), 4000);
      if (res.user.role === 'guardian') {
        setActiveTab('dashboard');
      } else {
        setActiveTab('checkin');
      }
    } catch (err) {
      setToastMessage("Error switching profile");
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setToastMessage("Signed out successfully");
    setActiveTab('auth');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold border border-slate-800 flex items-center gap-2">
          <span>⚡</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onQuickSeed={handleQuickSeed}
        backendOnline={backendOnline}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area with Code-Splitting Suspense */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} onQuickSeed={handleQuickSeed} />}
        
        <Suspense fallback={<PageLoader />}>
          {activeTab === 'auth' && (
            <Auth 
              currentUser={currentUser} 
              onAuthSuccess={(user) => {
                setCurrentUser(user);
                setToastMessage(`Authenticated as ${user.name}`);
                setTimeout(() => setToastMessage(null), 4000);
              }} 
              setActiveTab={setActiveTab} 
            />
          )}
          {activeTab === 'checkin' && <CheckIn setActiveTab={setActiveTab} currentUser={currentUser} />}
          {activeTab === 'assessment' && <ChildAssessment setActiveTab={setActiveTab} currentUser={currentUser} />}
          {activeTab === 'coping' && <CopingToolkit />}
          {activeTab === 'dashboard' && (
            <GuardianDashboard 
              setActiveTab={setActiveTab} 
              currentUser={currentUser} 
              onDemoSeeded={() => setToastMessage("Demo history seeded!")} 
            />
          )}
          {activeTab === 'crisis' && <CrisisResources />}
          {activeTab === 'diagnostics' && <Diagnostics />}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
