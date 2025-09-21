import React, { useMemo, useState } from 'react';
import { useJournal } from '../../context/JournalContext';
import { Card } from '../common/Card';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const EmotionalTwinView: React.FC = () => {
  const { entries } = useJournal();
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const allActivities = useMemo(() => {
    const activitySet = new Set<string>();
    entries.forEach(entry => {
      if (entry.type === 'check-in' && entry.activities) {
        entry.activities.forEach(activity => activitySet.add(activity));
      }
    });
    return Array.from(activitySet).sort();
  }, [entries]);

  const chartData = useMemo(() => {
    return entries
      .filter(entry => {
        if (entry.moodScore === undefined) return false;
        if (!selectedActivity) return true; // if no filter, include all with a mood score
        // if filter is active, only include check-ins with that activity
        return entry.type === 'check-in' && entry.activities?.includes(selectedActivity);
      })
      .map(entry => ({
        date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        Mood: entry.moodScore,
      }))
      .slice(-30) // show last 30 relevant entries
      .reverse();
  }, [entries, selectedActivity]);

  return (
    <Card>
      <h2 className="text-3xl font-bold mb-1 tracking-wide">Your Emotional Trends</h2>
      <p className="text-slate-600 mb-8">A visualization of your mood over time. Filter by activity to see patterns.</p>
      
      {allActivities.length > 0 && (
          <div className="mb-8">
              <h3 className="text-base font-semibold text-slate-700 mb-3">Filter by Activity</h3>
              <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setSelectedActivity(null)}
                    className={`px-4 py-2 text-sm rounded-full font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-4 ring-teal-400/50 ${
                      !selectedActivity
                      ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    All
                  </button>
                  {allActivities.map(activity => (
                      <button 
                        key={activity} 
                        onClick={() => setSelectedActivity(activity)} 
                        className={`px-4 py-2 text-sm rounded-full font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-4 ring-teal-400/50 ${
                          selectedActivity === activity
                          ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {activity}
                      </button>
                  ))}
              </div>
          </div>
      )}

      {chartData.length > 1 ? (
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 5, right: 20, left: -20, bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1ABC9C" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#1ABC9C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
              <XAxis dataKey="date" stroke="#5D6D7E" />
              <YAxis domain={[1, 10]} allowDecimals={false} stroke="#5D6D7E"/>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '1rem',
                  color: '#2C3E50'
                }}
                labelStyle={{ color: '#2C3E50', fontWeight: 'bold' }}
                itemStyle={{ color: '#1ABC9C' }}
              />
              <Area type="monotone" dataKey="Mood" stroke="#1ABC9C" strokeWidth={3} fill="url(#colorMood)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-96 flex items-center justify-center text-center bg-black/5 rounded-2xl p-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-800">Not enough data to display</h3>
            <p className="text-slate-600 mt-2 max-w-sm">
                {selectedActivity 
                  ? `There are no recent check-ins logged with the activity "${selectedActivity}". Try another filter.`
                  : 'Check in or write in your journal. As you reflect, your trends will appear here.'
                }
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};