import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Spinner } from '../common/Spinner';

interface LoginViewProps {
    onLoginSuccess: () => void;
}

const EyeIcon: React.FC<{isOpen: boolean}> = ({ isOpen }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m0 0l-2.117 2.116" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.065 7-9.543 7-4.478 0-8.268-2.943-9.543-7z" />
        )}
    </svg>
);

const GoogleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.226-11.283-7.94l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C44.599 36.372 48 30.817 48 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>;
const AppleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"><path fill="currentColor" d="M19.1 12.78c.08-.42.12-.84.12-1.28c0-.42-.04-.84-.12-1.28a3.13 3.13 0 0 0-.6-1.38c-.41-.53-.96-.9-1.63-1.08c-.68-.19-1.42-.04-2.2.35c-.48.24-.95.46-1.42.64c-.46.18-.9.34-1.32.42c-.2.04-.39.04-.58 0c-.41-.08-.85-.24-1.32-.42c-.46-.18-.94-.4-1.42-.64c-.78-.4-1.52-.54-2.2-.35c-.67.18-1.22.55-1.63 1.08c-.41.54-.62 1.2-.6 1.98c.02.83.29 1.6.76 2.26c.47.66 1.1 1.15 1.83 1.45c.73.3 1.5.29 2.25-.03c.4-.17.8-.36 1.18-.54c.39-.18.78-.34 1.18-.42a.85.85 0 0 1 .6 0c.4.08.79.24 1.18.42c.38.18.78.37 1.18.54c.75.32 1.52.33 2.25.03c.73-.3 1.36-.79 1.83-1.45c.29-.41.49-.85.6-1.29M17.53 5.2a4.4 4.4 0 0 0-2.81 1.87a3.81 3.81 0 0 1 1.22 3c-.56-.03-1.12-.13-1.66-.29c-.54-.16-1.07-.37-1.55-.61c.07-.48.1-1 .1-1.48c0-.52-.05-1.08-.14-1.68c.5-.32 1.05-.58 1.63-.75c.6-.17 1.2-.17 1.77.02c.08.03.15.07.22.12c.1.05.2.12.28.18c.06.05.13.1.18.15c.02.02.04.04.06.05Z"/></svg>;
const FingerprintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"><path fill="currentColor" d="M16.63 11.53c.31-.29.42-.71.28-1.09c-.14-.39-.52-.64-.93-.64H15.1c-.24 0-.48-.06-.68-.17c-.21-.11-.39-.28-.51-.48c-.12-.2-.18-.44-.18-.67v-.84c0-.41-.25-.79-.64-.93c-.39-.14-.81-.03-1.09.28l-2.43 2.43c-.22.22-.38.49-.47.78c-.09.29-.11.6-.04.89c.07.29.21.56.42.77c.21.21.48.35.77.42c.29.07.59.05.89-.04c.29-.09.56-.25.78-.47l.86-.86v.29c0 .24.06.48.17.68c.11.21.28.39.48.51s.44.18.67.18h.84c.41 0 .79.25.93.64c.14.38.03.8-.28 1.09l-1.29 1.29c-1.01 1.01-2.2 1.58-3.41 1.58c-1.3 0-2.58-.59-3.41-1.58a4.8 4.8 0 0 1-1.58-3.41c0-1.21.57-2.4 1.58-3.41L9.1 6.34c.64-.64 1.51-.99 2.41-.99c.9 0 1.77.35 2.41.99l.8.8c.38.38.38 1 0 1.38c-.37.38-1 .38-1.38 0l-.8-.8c-.25-.25-.59-.39-.94-.39s-.68.13-.94.39L8.34 9.1c-.51.51-.8 1.2-.8 1.92c0 .72.28 1.41.8 1.92c.51.51 1.2.8 1.92.8c.72 0 1.41-.28 1.92-.8l1.28-1.28c.38-.37.38-1 .01-1.38M19.16 6.84c-.38-.38-1-.38-1.38 0c-.38.38-.38 1 0 1.38c1.33 1.33 2.18 3.09 2.18 5c0 1.91-.84 3.67-2.18 5c-.38.38-.38 1 0 1.38c.19.19.44.29.7.29s.51-.1.7-.29c1.7-1.7 2.79-3.95 2.79-6.38c0-2.43-1.09-4.68-2.79-6.38m-2.82 2.82c-.38-.38-1-.38-1.38 0c-.38.38-.38 1 0 1.38c.55.55.9 1.3.9 2.12c0 .82-.35 1.57-.9 2.12c-.38.38-.38 1 0 1.38c.19.19.44.29.7.29s.51-.1.7-.29c.92-.92 1.51-2.15 1.51-3.5c0-1.34-.59-2.58-1.51-3.5Z"/></svg>;


export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        if (isSignUp) {
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                setIsLoading(false);
                return;
            }
             // Simulate new user creation and immediate login
             setTimeout(() => {
                console.log('Simulating new user creation for:', email);
                onLoginSuccess();
            }, 1500);
        } else {
            // Simulate existing user login
            setTimeout(() => {
                if (email === 'test@mindweave.com' && password === 'password123') {
                    onLoginSuccess();
                } else {
                    setError('Invalid email or password. Please try again.');
                    setIsLoading(false);
                }
            }, 1500);
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setError(null);
        // Clear fields on mode change for better UX
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-transparent">
            <style>{`
                .floating-label-input:focus ~ label,
                .floating-label-input:not(:placeholder-shown) ~ label {
                    transform: translateY(-1.4rem) scale(0.8);
                    color: var(--color-accent-teal);
                }
            `}</style>
            <div className="w-full max-w-md mx-auto animate-fade-in-up">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-violet-600">
                        MindWeave+
                    </h1>
                    <p className="text-slate-600 mt-2">
                        {isSignUp ? 'Create your account to begin.' : 'Sign in to continue your journey.'}
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-3 text-lg text-slate-800 bg-white/50 border-2 border-slate-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors duration-300 placeholder-transparent peer floating-label-input"
                            placeholder="Email"
                            required
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-3 text-slate-500 text-lg transition-all duration-300 pointer-events-none origin-[0]"
                        >
                            Email
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-3 text-lg text-slate-800 bg-white/50 border-2 border-slate-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors duration-300 placeholder-transparent peer floating-label-input"
                            placeholder="Password"
                            required
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-4 top-3 text-slate-500 text-lg transition-all duration-300 pointer-events-none origin-[0]"
                        >
                            Password
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 hover:text-teal-600 transition-colors"
                            aria-label="Toggle password visibility"
                        >
                            <EyeIcon isOpen={showPassword} />
                        </button>
                    </div>
                    
                    {isSignUp && (
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full px-4 py-3 text-lg text-slate-800 bg-white/50 border-2 border-slate-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors duration-300 placeholder-transparent peer floating-label-input"
                                placeholder="Confirm Password"
                                required
                            />
                            <label
                                htmlFor="confirmPassword"
                                className="absolute left-4 top-3 text-slate-500 text-lg transition-all duration-300 pointer-events-none origin-[0]"
                            >
                                Confirm Password
                            </label>
                        </div>
                    )}


                    {!isSignUp && (
                        <div className="text-right">
                            <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                                Forgot Password?
                            </a>
                        </div>
                    )}

                    {error && (
                        <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>
                    )}

                    <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                        {isLoading ? <Spinner /> : (isSignUp ? 'Sign Up' : 'Sign In')}
                    </Button>
                </form>

                <div className="relative my-8 flex items-center">
                    <div className="flex-grow border-t border-slate-300"></div>
                    <span className="flex-shrink mx-4 text-slate-500">Or continue with</span>
                    <div className="flex-grow border-t border-slate-300"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <Button variant="secondary" className="w-full !rounded-xl">
                        <GoogleIcon /> <span className="ml-2">Google</span>
                    </Button>
                    <Button variant="secondary" className="w-full !rounded-xl">
                        <AppleIcon /> <span className="ml-2">Apple</span>
                    </Button>
                </div>

                <div className="mt-6 text-center">
                    <Button variant="ghost" className="w-full">
                        <FingerprintIcon />
                        <span className="ml-2">Sign in with Biometrics</span>
                    </Button>
                </div>
                 <div className="mt-8 text-center text-sm text-slate-500">
                    <p>
                        {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                        <button onClick={toggleMode} className="font-medium text-teal-600 hover:underline focus:outline-none">
                             {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                    <p className="mt-4">Your data is private and securely encrypted.</p>
                </div>
            </div>
             <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
