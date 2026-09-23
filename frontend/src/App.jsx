import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CheckIn from './pages/CheckIn';
import ChildAssessment from './pages/ChildAssessment';
import CopingToolkit from './pages/CopingToolkit';
import GuardianDashboard from './pages/GuardianDashboard';
import CrisisResources from './pages/CrisisResources';
import Diagnostics from './pages/Diagnostics';
import { checkHealth, seedDemo } from './api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [backendOnline, setBackendOnline] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

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
    const interval = setInterval(verifyBackend, 10000);
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-brand-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-5">
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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} onQuickSeed={handleQuickSeed} />}
        {activeTab === 'checkin' && <CheckIn setActiveTab={setActiveTab} />}
        {activeTab === 'assessment' && <ChildAssessment setActiveTab={setActiveTab} />}
        {activeTab === 'coping' && <CopingToolkit />}
        {activeTab === 'dashboard' && <GuardianDashboard setActiveTab={setActiveTab} onDemoSeeded={() => setToastMessage("Demo history seeded!")} />}
        {activeTab === 'crisis' && <CrisisResources />}
        {activeTab === 'diagnostics' && <Diagnostics />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
