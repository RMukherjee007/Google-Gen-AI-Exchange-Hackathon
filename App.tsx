import React, { useState, useCallback, useMemo } from 'react';
import { JournalView } from './components/views/JournalView';
import { EmotionalTwinView } from './components/views/EmotionalTwinView';
import { SupportWavesView } from './components/views/SupportWavesView';
import { MicroInterventionModal } from './components/MicroInterventionModal';
import { JournalProvider } from './context/JournalContext';
import { View } from './types';
import { BottomNavBar } from './components/BottomNavBar';
import { DashboardView } from './components/views/DashboardView';
import { ARView } from './components/views/ARView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CheckInModal } from './components/CheckInModal';
import { LoginView } from './components/views/LoginView';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isBreathworkModalOpen, setIsBreathworkModalOpen] = useState(false);
  
  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const openCheckInModal = useCallback(() => {
    setIsCheckInModalOpen(true);
  }, []);

  const closeCheckInModal = useCallback(() => {
    setIsCheckInModalOpen(false);
  }, []);
  
  const openBreathworkModal = useCallback(() => {
    setIsBreathworkModalOpen(true);
  }, []);

  const closeBreathworkModal = useCallback(() => {
    setIsBreathworkModalOpen(false);
  }, []);

  const renderView = useMemo(() => {
    const views: { [key in View]: React.ReactNode } = {
      [View.Dashboard]: <DashboardView onTakeABreak={openBreathworkModal} />,
      [View.Journal]: <JournalView />,
      [View.EmotionalTwin]: <EmotionalTwinView />,
      [View.SupportWaves]: <SupportWavesView />,
      [View.AR]: <ARView />,
    };

    return (
      <div className="relative w-full h-full perspective-1000">
        {Object.entries(views).map(([viewKey, viewComponent]) => (
          <div
            key={viewKey}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out backface-hidden ${currentView === viewKey ? 'opacity-100 transform-none' : 'opacity-0 transform-gpu scale-95 -translate-z-20'}`}
            style={{ transformOrigin: 'center' }}
          >
            {viewComponent}
          </div>
        ))}
      </div>
    );
  }, [currentView, openBreathworkModal]);

  if (!isAuthenticated) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <JournalProvider>
      <div className="min-h-screen bg-transparent text-slate-800 selection:bg-teal-500/20">
        <main className="p-4 sm:p-6 pb-36 max-w-7xl mx-auto">
          <ErrorBoundary>
            {renderView}
          </ErrorBoundary>
        </main>
        
        <BottomNavBar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          onFabClick={openCheckInModal}
        />

        {isCheckInModalOpen && <CheckInModal onClose={closeCheckInModal} />}
        {isBreathworkModalOpen && <MicroInterventionModal onClose={closeBreathworkModal} />}

        <style>{`
          .perspective-1000 { perspective: 1000px; }
          .backface-hidden { backface-visibility: hidden; }
          .-translate-z-20 { transform: translateZ(-80px); }
        `}</style>
      </div>
    </JournalProvider>
  );
};

export default App;