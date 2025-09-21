import React, { useState } from 'react';
import { Button } from './common/Button';
import { useJournal } from '../context/JournalContext';
import { JournalEntry } from '../types';

interface CheckInModalProps {
  onClose: () => void;
}

const moodOptions = [
  { label: 'Happy', emoji: '😊' },
  { label: 'Okay', emoji: '🙂' },
  { label: 'Meh', emoji: '😐' },
  { label: 'Worried', emoji: '😟' },
  { label: 'Sad', emoji: '😥' },
];

const activityOptions = ['Work', 'Exercise', 'Social', 'Family', 'Relaxing', 'Hobby'];

export const CheckInModal: React.FC<CheckInModalProps> = ({ onClose }) => {
  const { addEntry } = useJournal();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<{
    mood: string | null;
    stress: number | null;
    activities: string[];
  }>({
    mood: null,
    stress: null,
    activities: [],
  });

  const handleSelectMood = (mood: string) => {
    setAnswers(prev => ({ ...prev, mood }));
    setStep(2);
  };

  const handleSelectStress = (stress: number) => {
    setAnswers(prev => ({ ...prev, stress }));
    setStep(3);
  };

  const handleToggleActivity = (activity: string) => {
    setAnswers(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const handleFinishCheckIn = () => {
    if (!answers.mood || !answers.stress) return;

    const moodScoreMap: { [key: string]: number } = {
        'Happy': 9,
        'Okay': 7,
        'Meh': 5,
        'Worried': 3,
        'Sad': 2,
    };

    const newCheckIn: JournalEntry = {
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      isUser: true,
      type: 'check-in',
      moodLabel: answers.mood,
      stressLevel: answers.stress,
      activities: answers.activities,
      moodScore: moodScoreMap[answers.mood] || 5,
    };

    addEntry(newCheckIn);
    onClose();
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">How are you feeling?</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {moodOptions.map(option => (
                <button
                  key={option.label}
                  onClick={() => handleSelectMood(option.label)}
                  className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl text-center transition-all duration-200 focus:outline-none focus-visible:ring-4 ring-teal-400/50"
                >
                  <span className="text-4xl">{option.emoji}</span>
                  <span className="block mt-2 text-sm font-medium text-slate-600">{option.label}</span>
                </button>
              ))}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Rate your stress level</h2>
            <p className="text-slate-500 mb-6">From 1 (low) to 5 (high).</p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  onClick={() => handleSelectStress(level)}
                  className="w-12 h-12 flex items-center justify-center text-xl font-bold bg-slate-100 hover:bg-slate-200 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-4 ring-teal-400/50"
                >
                  {level}
                </button>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">What's influencing you?</h2>
            <p className="text-slate-500 mb-6">Select any that apply. (Optional)</p>
            <div className="flex flex-wrap justify-center gap-3">
              {activityOptions.map(activity => {
                const isSelected = answers.activities.includes(activity);
                return (
                  <button
                    key={activity}
                    onClick={() => handleToggleActivity(activity)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-4 ring-teal-400/50 transform active:scale-95 ${
                      isSelected
                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                        : 'bg-white/70 hover:bg-white text-slate-700 border border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pop-in" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {activity}
                  </button>
                )
              })}
            </div>
            <Button onClick={() => setStep(4)} variant="secondary" className="mt-8">Continue</Button>
          </>
        );
      case 4:
        return (
          <div className="text-center">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Thanks for checking in!</h2>
            <p className="text-slate-500 mb-6">
              Your reflections help build a clearer picture of your well-being.
            </p>
            <Button onClick={handleFinishCheckIn} variant="primary">Done</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="relative bg-white/80 backdrop-blur-2xl p-6 sm:p-8 max-w-lg w-full text-center rounded-3xl shadow-2xl shadow-black/20 border border-black/10">
        <button onClick={onClose} aria-label="Close modal" className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors z-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="animate-fade-in-up min-h-[160px]">{renderStep()}</div>
      </div>
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.4s ease-out forwards;
          }
           @keyframes pop-in {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-pop-in {
            animation: pop-in 0.2s ease-out forwards;
          }
        `}</style>
    </div>
  );
};
