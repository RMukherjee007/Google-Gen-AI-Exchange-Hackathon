import React, { useState, useEffect } from 'react';

export const SupportWavesView: React.FC = () => {
  const [userCount, setUserCount] = useState(1452);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(count => count + Math.floor(Math.random() * 5) - 2);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center text-center overflow-hidden bg-black rounded-2xl">
      <div className="absolute inset-0 z-0 opacity-80" id="particle-container">
        <div className="stars stars1"></div>
        <div className="stars stars2"></div>
        <div className="stars stars3"></div>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      
      <div className="z-10 text-white p-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up tracking-tight">Joining a Wave of Calm</h2>
        <p className="text-lg md:text-xl text-slate-300 mb-8 animate-fade-in-up animation-delay-300">
          You are not alone. Breathe with others around the world.
        </p>
        <div className="inline-block px-8 py-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl text-2xl font-semibold animate-fade-in-up animation-delay-500 shadow-2xl shadow-black/30">
          <span className="text-cyan-400">{userCount.toLocaleString()}</span> people are finding calm with you
        </div>
      </div>

      <style>{`
        @keyframes move-twink-back {
            from { background-position: 0 0; }
            to { background-position: -10000px 5000px; }
        }
        
        .stars {
         position: absolute;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         width: 100%;
         height: 100%;
         display: block;
        }

        .stars1 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="%232DD4BF" cx="50" cy="50" r="1"/></svg>') 0 0 repeat;
          background-size: 1000px 1000px;
          animation: move-twink-back 200s linear infinite;
        }

        .stars2 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="%23F472B6" cx="50" cy="50" r="1"/></svg>') 0 0 repeat;
          background-size: 1500px 1500px;
          animation: move-twink-back 150s linear infinite;
        }
        
        .stars3 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="white" cx="50" cy="50" r="0.5"/></svg>') 0 0 repeat;
          background-size: 500px 500px;
          animation: move-twink-back 100s linear infinite;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            opacity: 0;
            animation: fade-in-up 0.8s ease-out forwards;
        }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
};