import React, { useState, useEffect } from 'react';
import { Button } from './common/Button';

interface MicroInterventionModalProps {
  onClose: () => void;
}

// Note for Production: For full accessibility, a modal should trap focus.
// Libraries like 'react-focus-lock' can be used to implement this.
export const MicroInterventionModal: React.FC<MicroInterventionModalProps> = ({ onClose }) => {
  const [breathText, setBreathText] = useState('Breathe in...');
  
  useEffect(() => {
    const cycle = () => {
      setBreathText('Breathe in...');
      setTimeout(() => setBreathText('Hold...'), 4000);
      setTimeout(() => setBreathText('Breathe out...'), 4000 + 4000);
    };
    cycle();
    const interval = setInterval(cycle, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-2xl flex items-center justify-center z-50 animate-fade-in">
      <div className="relative bg-slate-900/60 p-8 max-w-sm w-full text-center rounded-3xl shadow-2xl shadow-black/40 border border-white/10">
        <button onClick={onClose} aria-label="Close modal" className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <h2 className="text-2xl font-bold text-teal-300 mb-4 tracking-wide">A Moment of Calm</h2>
        <p className="text-slate-300 mb-8">Follow the rhythm of your breath.</p>
        
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            <svg className="absolute w-full h-full" viewBox="0 0 200 200">
                <defs>
                    <linearGradient id="liquidGradient" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor="var(--color-accent-teal)" />
                        <stop offset="100%" stopColor="var(--color-accent-violet)" />
                    </linearGradient>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
                 <g style={{ filter: 'url(#goo)' }}>
                    <circle cx="50%" cy="50%" r="40" fill="url(#liquidGradient)" className="animate-liquid-blob" />
                    <circle cx="50%" cy="50%" r="35" fill="url(#liquidGradient)" className="animate-liquid-blob animation-delay-2000" />
                 </g>
            </svg>
            <span className="text-xl font-medium text-slate-100 z-10">{breathText}</span>
        </div>
        
        <Button onClick={onClose} className="mt-8" variant="secondary">I'm feeling centered</Button>

        <style>{`
          @keyframes liquid-blob {
            0%, 100% { transform: scale(1) rotate(0deg) translateX(0) translateY(0); }
            33% { transform: scale(1.1, 0.9) rotate(120deg) translateX(-5px) translateY(5px); }
            66% { transform: scale(0.9, 1.1) rotate(240deg) translateX(5px) translateY(-5px); }
          }
           @keyframes breath-cycle {
              0%, 100% { r: 40; } /* Breathe in */
              33% { r: 50; } /* Hold */
              66% { r: 35; } /* Breathe out */
           }
          .animate-liquid-blob {
            animation: liquid-blob 12s ease-in-out infinite, breath-cycle 12s ease-in-out infinite;
            transform-origin: center;
          }
          .animation-delay-2000 {
            animation-delay: -4s; /* Offset animation for more organic feel */
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};