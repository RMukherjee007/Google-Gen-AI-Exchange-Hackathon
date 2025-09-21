export interface JournalEntry {
  id: string;
  date: string;
  isUser: boolean;
  type: 'journal' | 'check-in';

  // For journal entries
  text?: string;
  reflection?: string;

  // For check-ins
  moodLabel?: string;
  stressLevel?: number;
  activities?: string[];
  
  // Common analytics data
  moodScore?: number;
}


export enum View {
  Dashboard = 'DASHBOARD',
  Journal = 'JOURNAL',
  EmotionalTwin = 'EMOTIONAL_TWIN',
  SupportWaves = 'SUPPORT_WAVES',
  AR = 'AR'
}