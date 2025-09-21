import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../common/Button';

export const ARView: React.FC = () => {
    const [cameraActive, setCameraActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [breathText, setBreathText] = useState('Breathe in...');
    const videoRef = useRef<HTMLVideoElement>(null);

    const startCamera = async () => {
        setError(null);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setCameraActive(true);
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                if (err instanceof DOMException && err.name === "NotAllowedError") {
                    setError("To use AR Calm, please allow camera access in your browser's site settings.");
                } else {
                    setError("Could not access camera. Ensure it's not in use by another app and permissions are granted.");
                }
                setCameraActive(false);
            }
        } else {
            setError("Camera not supported on this device or browser.");
        }
    };
    
    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setCameraActive(false);
    };

    useEffect(() => {
        if (cameraActive) {
            const cycle = () => {
              setBreathText('Breathe in...');
              setTimeout(() => setBreathText('Hold...'), 4000);
              setTimeout(() => setBreathText('Breathe out...'), 4000 + 4000);
            };
            cycle();
            const interval = setInterval(cycle, 12000);
            return () => clearInterval(interval);
        }
    }, [cameraActive]);
    
    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div className="relative w-full h-[80vh] flex items-center justify-center text-center overflow-hidden bg-black rounded-2xl">
            <video ref={videoRef} autoPlay playsInline className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${cameraActive ? 'opacity-100' : 'opacity-0'}`}></video>
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            
            <div className="relative z-20 p-4">
                {!cameraActive ? (
                    <>
                        <h2 className="text-3xl font-bold mb-4 tracking-wide">AR Grounding</h2>
                        <p className="text-slate-300 mb-8 max-w-md mx-auto">
                           Overlay a calming guide onto your environment. Find a calm space and begin.
                        </p>
                        <Button onClick={startCamera} size="lg">Start AR Calm</Button>
                        {error && (
                            <div className="mt-6 max-w-sm mx-auto p-4 bg-amber-900/40 border border-amber-500/50 rounded-2xl text-sm animate-fade-in">
                                <div className="flex items-start space-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-amber-200">Camera Permission Required</p>
                                        <p className="mt-1 text-amber-300">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full animate-aura-gradient"></div>
                            <div className="absolute inset-2 bg-black/50 rounded-full"></div>
                            <span className="text-xl font-medium text-slate-100 z-10">{breathText}</span>
                        </div>
                         <Button onClick={stopCamera} variant="secondary" className="mt-8">End Session</Button>
                    </>
                )}
            </div>
             <style>{`
                  @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                  .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                  }
                  @keyframes aura-gradient {
                    0% { transform: scale(0.85) rotate(0deg); opacity: 0.7; background: radial-gradient(circle, var(--color-accent-teal) 0%, var(--color-accent-magenta) 100%); }
                    50% { transform: scale(1) rotate(180deg); opacity: 1; background: radial-gradient(circle, var(--color-accent-magenta) 0%, var(--color-accent-teal) 100%); }
                    100% { transform: scale(0.85) rotate(360deg); opacity: 0.7; background: radial-gradient(circle, var(--color-accent-teal) 0%, var(--color-accent-magenta) 100%); }
                  }
                  .animate-aura-gradient {
                    animation: aura-gradient 12s ease-in-out infinite;
                  }
            `}</style>
        </div>
    );
};