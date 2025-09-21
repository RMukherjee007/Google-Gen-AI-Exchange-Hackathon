import React, { useMemo } from 'react';
import { useJournal } from '../../context/JournalContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// --- SVG Icons ---
const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" /></svg>;
const TrendingDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.293-8.707a1 1 0 00-1.414-1.414L10 7.586l-1.293-1.293a1 1 0 00-1.414 1.414L8.586 9H7a1 1 0 100 2h1.586l-1.293 1.293a1 1 0 101.414 1.414L10 12.414l1.293 1.293a1 1 0 001.414-1.414L11.414 11H13a1 1 0 100-2h-1.586l1.293-1.293z" clipRule="evenodd" /></svg>;
const MinusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>;
const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1.586l-2.293-2.293a1 1 0 00-1.414 1.414L7.586 6H6a1 1 0 000 2h1.586l-2.293 2.293a1 1 0 101.414 1.414L9 9.414V12a1 1 0 102 0V9.414l2.293 2.293a1 1 0 001.414-1.414L12.414 8H14a1 1 0 100-2h-1.586l2.293-2.293a1 1 0 00-1.414-1.414L11 4.586V3z" /><path d="M6 18a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1zM14 18a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1z" /></svg>;
const QuoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>;

const dailyQuotes = [
    { quote: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { quote: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
    { quote: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Act as if what you do makes a difference. It does.", author: "William James" },
];

const RadialGauge = ({ score }: { score: number }) => {
    const size = 140;
    const strokeWidth = 14;
    const center = size / 2;
    const radius = center - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = score / 10;
    const offset = circumference * (1 - progress);

    const colorStops = score >= 8
        ? { from: '#34D399', to: '#10B981', text: '#065F46' } // Green
        : score >= 5
        ? { from: '#FBBF24', to: '#F59E0B', text: '#92400E' } // Amber
        : { from: '#F87171', to: '#EF4444', text: '#991B1B' }; // Red
    
    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={colorStops.from} />
                        <stop offset="100%" stopColor={colorStops.to} />
                    </linearGradient>
                </defs>
                <circle
                    cx={center} cy={center} r={radius}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    className="stroke-slate-200/70"
                />
                <circle
                    cx={center} cy={center} r={radius}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    stroke="url(#gaugeGradient)"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${center} ${center})`}
                    className="transition-[stroke-dashoffset] duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold" style={{ color: colorStops.text }}>
                    {score}
                </span>
                <span className="text-sm font-medium text-slate-500 -mt-1">/ 10</span>
            </div>
        </div>
    );
};


const CloseContactsCarousel: React.FC = () => {
    // This component remains unchanged
    const contacts = [
        { id: 'contact1', name: 'Alex', img: 'https://i.pravatar.cc/96?u=alex' },
        { id: 'contact2', name: 'Maria', img: 'https://i.pravatar.cc/96?u=maria' },
        { id: 'contact3', name: 'Sam', img: 'https://i.pravatar.cc/96?u=sam' },
        { id: 'contact4', name: 'Jess', img: 'https://i.pravatar.cc/96?u=jess' },
        { id: 'contact5', name: 'Chris', img: 'https://i.pravatar.cc/96?u=chris' },
    ];
    const [connecting, setConnecting] = React.useState<string | null>(null);

    const handleConnect = (id: string) => {
        setConnecting(id);
        setTimeout(() => setConnecting(null), 2000);
    };

    return (
        <div className="flex space-x-6 overflow-x-auto pb-4 -mx-6 px-6" style={{ scrollSnapType: 'x mandatory' }}>
            {contacts.map(contact => (
                <div key={contact.id} className="flex-shrink-0 text-center group" style={{ scrollSnapAlign: 'start' }}>
                    <button 
                        onClick={() => handleConnect(contact.id)} 
                        disabled={!!connecting} 
                        className="relative w-16 h-16 rounded-full transition-all duration-300 group-focus-visible:outline-none"
                    >
                        <img src={contact.img} alt={contact.name} className="w-full h-full rounded-full object-cover border-2 border-black/10 transition-all duration-300 group-hover:border-teal-400 group-focus-visible:ring-4 group-focus-visible:ring-teal-400/50"/>
                        <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:shadow-[0_0_20px_4px] group-hover:shadow-teal-500/30"></div>
                        {connecting === contact.id && (
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </button>
                    <span className="block mt-2 text-sm font-medium text-slate-700 transition-colors group-hover:text-black">{contact.name}</span>
                </div>
            ))}
        </div>
    );
};

// FIX: Define props interface for DashboardView
interface DashboardViewProps {
  onTakeABreak: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onTakeABreak }) => {
  const { entries } = useJournal();

  const {
    latestMoodScore,
    previousMoodScore,
    trend,
    kaisInsight,
    chartData,
    topActivities,
    dailyInsight,
  } = useMemo(() => {
    const moodEntries = entries.filter(e => e.moodScore !== undefined);
    const latestScore = moodEntries[moodEntries.length - 1]?.moodScore;
    const previousScore = moodEntries[moodEntries.length - 2]?.moodScore;

    let trendDirection: 'up' | 'down' | 'same' | null = null;
    if (latestScore !== undefined && previousScore !== undefined) {
      if (latestScore > previousScore) trendDirection = 'up';
      else if (latestScore < previousScore) trendDirection = 'down';
      else trendDirection = 'same';
    }
    
    const insight = entries.slice().reverse().find(e => !e.isUser && e.reflection);

    const data = moodEntries.slice(-7).map(entry => ({
      name: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      Mood: entry.moodScore,
    }));
    
    const activityData: { [key: string]: number[] } = {};
    entries
      .filter(e => e.type === 'check-in' && e.activities && e.activities.length > 0 && e.moodScore)
      .forEach(e => {
        e.activities!.forEach(activity => {
          if (!activityData[activity]) activityData[activity] = [];
          activityData[activity].push(e.moodScore!);
        });
      });

    const topActs = Object.entries(activityData)
      .map(([name, scores]) => ({
        name,
        avgScore: scores.reduce((a, b) => a + b, 0) / scores.length,
      }))
      .filter(item => item.avgScore >= 7)
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 3);
      
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const quote = dailyQuotes[dayOfYear % dailyQuotes.length];


    return {
      latestMoodScore: latestScore,
      previousMoodScore: previousScore,
      trend: trendDirection,
      kaisInsight: insight,
      chartData: data,
      topActivities: topActs,
      dailyInsight: quote,
    };
  }, [entries]);

  const getMoodDescriptor = (score: number): string => {
    if (score >= 8) return "Feeling Bright";
    if (score >= 5) return "Feeling Steady";
    return "Feeling Weighed Down";
  };
  
  const getTrendText = () => {
    if (trend === 'up') return `Up from ${previousMoodScore}`;
    if (trend === 'down') return `Down from ${previousMoodScore}`;
    if (trend === 'same') return 'Steady';
    return 'Your first check-in!';
  };

  return (
    <div className="space-y-8 animate-fade-in">
        <style>{`
             @keyframes view-fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: view-fade-in 0.6s ease-out forwards;
            }
        `}</style>
        
        <div className="px-1">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800">Welcome back,</h1>
            <p className="text-lg text-slate-600 mt-2">Your space for reflection is ready.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            
            <Card className="lg:col-span-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex-shrink-0">
                        {latestMoodScore !== undefined ? (
                           <RadialGauge score={latestMoodScore} />
                        ) : (
                           <div className="w-[140px] h-[140px] bg-slate-100 rounded-full flex items-center justify-center text-center p-4">
                               <p className="text-sm text-slate-500">Check in to see your vibe</p>
                           </div>
                        )}
                    </div>
                    <div className="text-center sm:text-left flex-grow">
                         <h3 className="text-lg font-semibold text-slate-800">Vibe Check</h3>
                         {latestMoodScore !== undefined ? (
                            <>
                                <p className="text-3xl font-bold text-slate-800 mt-1">{getMoodDescriptor(latestMoodScore)}</p>
                                <div className="inline-flex items-center space-x-2 text-sm mt-3 p-2 pr-3 bg-slate-100/80 rounded-full">
                                    {trend === 'up' && <TrendingUpIcon />}
                                    {trend === 'down' && <TrendingDownIcon />}
                                    {trend === 'same' && <MinusIcon />}
                                    <span className="text-slate-700 font-medium">{getTrendText()}</span>
                                </div>
                            </>
                         ) : (
                             <p className="text-slate-500 mt-1">Your latest mood will appear here.</p>
                         )}
                    </div>
                </div>
            </Card>

            <Card className="lg:col-span-3">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Top Activities</h3>
                <p className="text-sm text-slate-500 mb-4">What's lifting you up.</p>
                {topActivities.length > 0 ? (
                    <div className="space-y-3">
                        {topActivities.map(act => (
                            <div key={act.name} className="flex items-center justify-between p-3 bg-slate-100/70 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                       <TrophyIcon />
                                    </div>
                                    <span className="font-semibold text-slate-700">{act.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-amber-700">{act.avgScore.toFixed(1)}</p>
                                    <p className="text-xs text-slate-500">Avg. Mood</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-500 text-center py-4">
                        <p>Log activities in your check-ins to find patterns.</p>
                    </div>
                )}
            </Card>
            
            <Card className="lg:col-span-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">7-Day Trend</h3>
                 <div className="h-40 -mx-4 -mb-4">
                    {chartData.length > 1 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs><linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1ABC9C" stopOpacity={0.4}/><stop offset="95%" stopColor="#1ABC9C" stopOpacity={0}/></linearGradient></defs>
                                <Area type="monotone" dataKey="Mood" stroke="#1ABC9C" strokeWidth={3} fillOpacity={1} fill="url(#moodGradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-500">More entries needed for a trend.</div>
                    )}
                </div>
            </Card>

             <Card className="lg:col-span-2 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Daily Insight</h3>
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mb-3">
                        <QuoteIcon />
                    </div>
                    <p className="text-slate-600 italic">"{dailyInsight.quote}"</p>
                    <p className="text-sm text-slate-500 mt-2">- {dailyInsight.author}</p>
                </div>
            </Card>

            <Card className="lg:col-span-3">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Kai's Insight</h3>
                 <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 16a2 2 0 110-4 2 2 0 010 4z" /></svg>
                    </div>
                    <p className="text-slate-600 italic">
                        {kaisInsight?.reflection || "Write a journal entry, and Kai's reflections will appear here to offer support."}
                    </p>
                 </div>
            </Card>
            
            <Card className="lg:col-span-3 h-full flex flex-col items-center justify-center text-center">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Quick Actions</h3>
                <p className="text-slate-600 text-sm mb-4">A reset is just a tap away.</p>
                <Button onClick={onTakeABreak} variant="secondary">
                    2-min Reset
                </Button>
            </Card>

            <Card className="lg:col-span-6">
                 <h3 className="text-lg font-semibold text-slate-800 mb-4">Close Contacts</h3>
                <CloseContactsCarousel />
            </Card>

        </div>
    </div>
  );
};