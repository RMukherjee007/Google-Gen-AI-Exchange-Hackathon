import React, { useState, useEffect, useRef } from 'react';
import { useJournal } from '../../context/JournalContext';
import { Button } from '../common/Button';
import { Spinner } from '../common/Spinner';
import { analyzeJournalEntry } from '../../services/geminiService';
import { JournalEntry } from '../../types';

// Web Speech API interfaces for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const MessageBubble: React.FC<{ entry: JournalEntry }> = ({ entry }) => {
  const isUser = entry.isUser;
  
  if (!isUser) { // AI Reflection
    return (
      <div className="flex justify-start animate-fade-in-up">
        <div className="max-w-lg p-4 rounded-3xl rounded-bl-lg bg-slate-100/80 border border-black/5">
          <p className="font-semibold text-teal-600 text-sm mb-2">Kai's Reflection</p>
          <p className="text-slate-700 italic">{entry.reflection}</p>
          {entry.moodScore && (
             <p className="text-xs mt-3 text-slate-500">Mood Score: {entry.moodScore}/10</p>
          )}
        </div>
      </div>
    );
  }

  // User Entry
  return (
     <div className="flex justify-end animate-fade-in-up">
        <div className="max-w-lg p-4 rounded-3xl rounded-br-lg bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
          <p className="whitespace-pre-wrap">{entry.text}</p>
          <p className="text-xs text-right mt-2 text-teal-100/70">{new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
  );
};


export const JournalView: React.FC = () => {
  const { entries, addEntry } = useJournal();
  const [newEntryText, setNewEntryText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [newEntryText]);
  
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setNewEntryText(prev => prev + finalTranscript);
      };
      
      recognitionRef.current.onend = () => {
          setIsListening(false);
      }

    } else {
      console.log('Speech Recognition Not Available');
    }

    return () => {
        recognitionRef.current?.stop();
    }
  }, []);

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleSaveAndAnalyze = async () => {
    if (newEntryText.trim() === '') return;
    setIsLoading(true);
    setError(null);

    const userEntry: JournalEntry = {
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      text: newEntryText.trim(),
      isUser: true,
      type: 'journal',
    };
    
    addEntry(userEntry);
    setNewEntryText('');

    try {
      const result = await analyzeJournalEntry(userEntry.text!);
      const aiReflection: JournalEntry = {
        id: new Date().toISOString() + '-ai',
        date: new Date().toISOString(),
        isUser: false,
        type: 'journal',
        reflection: result.reflection,
        moodScore: result.moodScore,
      };
      addEntry(aiReflection);
    } catch (err) {
      setError('Kai is resting. Could not get a reflection.');
       const errorEntry: JournalEntry = {
        id: new Date().toISOString() + '-error',
        date: new Date().toISOString(),
        isUser: false,
        type: 'journal',
        reflection: 'Sorry, I was unable to process that. Please try again later.',
      };
      addEntry(errorEntry);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter for conversational entries for a clean UI
  const journalConversations = entries.filter(entry => 
    entry.type === 'journal' || (!entry.type && (entry.text || entry.reflection))
  );

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
        <style>{`
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.5s ease-out forwards;
            }
            .auto-growing-textarea {
                max-height: 120px; /* Optional: prevent it from growing indefinitely */
            }
        `}</style>
        <h2 className="text-2xl font-bold mb-4 px-1 tracking-wide">Journal with Kai</h2>
        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {journalConversations.map(entry => <MessageBubble key={entry.id} entry={entry} />)}
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="max-w-lg p-4 rounded-3xl rounded-bl-lg bg-slate-100/80 flex items-center space-x-3">
                        <Spinner size="sm" />
                        <span className="text-slate-600 italic text-sm">Kai is reflecting...</span>
                    </div>
                </div>
            )}
            <div ref={scrollRef}></div>
        </div>

        {error && <p className="text-red-500 text-sm text-center my-2">{error}</p>}

        <div className="mt-4 flex items-start space-x-2 p-2 bg-white/50 backdrop-blur-sm rounded-2xl border border-black/10">
            <textarea
            ref={textareaRef}
            value={newEntryText}
            onChange={(e) => setNewEntryText(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveAndAnalyze();
                }
            }}
            placeholder="Share what's on your mind..."
            className="w-full p-3 bg-transparent rounded-2xl border-none focus:ring-0 transition resize-none overflow-y-auto auto-growing-textarea placeholder-slate-500"
            rows={1}
            disabled={isLoading}
            />
            {recognitionRef.current && (
                <button onClick={handleMicClick} disabled={isLoading} className={`!rounded-xl h-full flex-shrink-0 self-end p-3 transition-colors ${isListening ? 'bg-red-500 text-white' : 'bg-slate-200/50 hover:bg-slate-200 text-slate-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </button>
            )}
            <Button onClick={handleSaveAndAnalyze} disabled={!newEntryText.trim() || isLoading} className="!rounded-xl h-full flex-shrink-0 self-end">
               Send
            </Button>
      </div>
    </div>
  );
};