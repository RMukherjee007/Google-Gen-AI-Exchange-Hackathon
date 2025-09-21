import React from 'react';
import { View } from '../types';

interface BottomNavBarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onFabClick: () => void;
}

const navItems = [
  { view: View.Dashboard, label: 'Home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5' },
  { view: View.Journal, label: 'Journal', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125' },
  { view: View.EmotionalTwin, label: 'Trends', icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.517l2.74-1.22m0 0l-3.182-3.182m3.182 3.182v3.182' },
  { view: View.AR, label: 'AR Calm', icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 00-5.84-2.56v4.82' },
];

const NavItem: React.FC<{item: typeof navItems[0], isActive: boolean, onClick: () => void}> = ({ item, isActive, onClick}) => {
    return (
        <button
            onClick={onClick}
            className="relative z-10 flex flex-col items-center justify-center w-16 h-16 text-center transition-all duration-300 group rounded-2xl"
            aria-label={item.label}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-all duration-300 ${isActive ? 'text-teal-500 -translate-y-1' : 'text-slate-500 group-hover:text-slate-800'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            <span className={`text-xs mt-1 transition-all duration-300 ${isActive ? 'text-slate-800 font-semibold' : 'text-slate-500 group-hover:text-slate-700'}`}>{item.label}</span>
        </button>
    )
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentView, setCurrentView, onFabClick }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-32 z-40 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[var(--color-bg-start)] via-[var(--color-bg-start)]/90 to-transparent"></div>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <button 
                onClick={onFabClick} 
                className="relative w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-2xl shadow-teal-500/30 text-white flex items-center justify-center pointer-events-auto transition-transform duration-300 active:scale-95 hover:scale-105"
                aria-label="Proactive Check-in"
            >
                <span className="absolute inset-0 rounded-full bg-teal-400 opacity-50 animate-pulse-slow"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                </svg>
            </button>
        </div>

        <nav className="absolute bottom-0 left-0 right-0 h-20 flex items-center justify-around pointer-events-auto">
            <div className="flex justify-around items-center w-full max-w-md mx-auto">
                <NavItem item={navItems[0]} isActive={currentView === navItems[0].view} onClick={() => setCurrentView(navItems[0].view)} />
                <NavItem item={navItems[1]} isActive={currentView === navItems[1].view} onClick={() => setCurrentView(navItems[1].view)} />
                <div className="w-24 flex-shrink-0"></div>
                <NavItem item={navItems[2]} isActive={currentView === navItems[2].view} onClick={() => setCurrentView(navItems[2].view)} />
                <NavItem item={navItems[3]} isActive={currentView === navItems[3].view} onClick={() => setCurrentView(navItems[3].view)} />
            </div>
        </nav>
        
        <style>{`
            @keyframes pulse-slow {
                0%, 100% {
                    transform: scale(1);
                    opacity: 0.5;
                }
                50% {
                    transform: scale(1.25);
                    opacity: 0;
                }
            }
            .animate-pulse-slow {
                animation: pulse-slow 3s infinite cubic-bezier(0.4, 0, 0.6, 1);
            }
        `}</style>
    </footer>
  );
};