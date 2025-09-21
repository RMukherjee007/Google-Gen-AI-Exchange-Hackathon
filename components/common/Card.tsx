import React, { ReactNode } from 'react';

interface AuraCardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<AuraCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative bg-white/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl shadow-slate-500/10 ${className}`}>
        <div className="absolute inset-0 border border-black/10 rounded-3xl"></div>
        <div className="absolute -inset-px rounded-3xl border border-transparent bg-gradient-to-br from-violet-500/20 to-teal-500/20 blur-xl opacity-50"></div>
        <div className="relative p-6">
            {children}
        </div>
    </div>
  );
};