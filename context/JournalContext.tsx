import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { JournalEntry } from '../types';

interface JournalContextType {
  entries: JournalEntry[];
  addEntry: (entry: JournalEntry | JournalEntry[]) => void;
  updateEntry: (updatedEntry: JournalEntry) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journalEntries_v2', []);

  const addEntry = (newEntries: JournalEntry | JournalEntry[]) => {
    const entriesToAdd = Array.isArray(newEntries) ? newEntries : [newEntries];
    setEntries(prevEntries => [...prevEntries, ...entriesToAdd]);
  };

  const updateEntry = (updatedEntry: JournalEntry) => {
    setEntries(prevEntries => 
        prevEntries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
    );
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry, updateEntry }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = (): JournalContextType => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
