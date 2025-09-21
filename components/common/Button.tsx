import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold focus:outline-none focus-visible:ring-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variantStyles = {
    primary: 'bg-teal-500 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:bg-teal-600 focus-visible:ring-teal-400/50',
    secondary: 'bg-slate-900/5 border border-slate-900/10 text-slate-700 hover:bg-slate-900/10 focus-visible:ring-slate-400/50',
    ghost: 'bg-transparent hover:bg-slate-900/5 text-teal-600 focus-visible:ring-teal-400/50'
  };

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};