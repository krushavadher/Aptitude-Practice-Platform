import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { leaderboardApi, topicApi } from '../../api';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { Loader } from '../../components/common/Loader';
import { ErrorState, EmptyState } from '../../components/common/States';
import { Trophy, TrendingUp, Globe, Calendar, Award, Star } from 'lucide-react';
import { getImageUrl } from '../../utils/getImageUrl';

// Helper to generate a consistent pseudo-ID based on name
const generateId = (name) => {
  if (!name) return 'AP-00000';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `AP-${Math.abs(hash).toString().substring(0, 5).padStart(5, '0')}`;
};

const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

export default function Leaderboard() {
  const [topicId, setTopicId] = useState('');
  const [period, setPeriod] = useState('all');

  const { data: topics = [] } = useQuery({
    queryKey: ['topics'],
    queryFn: topicApi.list
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['leaderboard', topicId, period],
    queryFn: () => leaderboardApi.getLeaderboard({ period, limit: '20' }, topicId || null)
  });

  if (isLoading && !data) return <div className="flex-1 flex justify-center p-12"><Loader size={48} /></div>;
  if (error && !data) return <ErrorState message="Failed to load leaderboard" onRetry={refetch} className="mt-12" />;

  const { leaderboard = [], currentUser } = data || {};

  const topicName = topicId ? (topics.find(t => t._id === topicId)?.name || 'Mixed') : 'General Aptitude';

  const formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  const getAccColor = (acc) => {
    if (acc > 90) return 'text-[color:var(--primary)]';
    if (acc >= 80) return 'text-[color:var(--teal)]';
    return 'text-[color:var(--text)]';
  };

  const getRankBg = (rank) => {
    if (rank === 1) return 'bg-[#FEF08A] text-[#854D0E]';
    if (rank === 2) return 'bg-[#E2E8F0] text-[#334155]';
    if (rank === 3) return 'bg-[#FED7AA] text-[#9A3412]';
    return 'bg-transparent text-secondary font-medium';
  };

  const topThree = leaderboard.slice(0, 3);
  const remainingRoster = leaderboard; // Image shows all in roster

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-24 space-y-6">
      
      {/* Banner */}
      <GlassCard className="relative overflow-hidden border-none shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--primary)]/10 via-[color:var(--teal)]/10 to-transparent opacity-60"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[color:var(--primary)] uppercase mb-2">
              <div className="w-2 h-2 rounded-full bg-[color:var(--primary)]"></div>
              Verified Cohort Index - Standardized Percentile Engine
            </div>
            <h1 className="text-4xl font-extrabold text-primary mb-2">Leaderboard</h1>
            <p className="text-secondary text-sm">Rankings based on test performance, accuracy, and completion speed.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-glass p-1 rounded-xl border border-glass-border shadow-sm">
            <div className="flex bg-glass-strong p-1 rounded-lg border border-glass-border">
              <button 
                onClick={() => setPeriod('all')}
                className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${period === 'all' ? 'bg-[color:var(--primary)] text-white shadow' : 'text-secondary hover:text-[color:var(--primary)] hover:bg-glass'}`}
              >
                <Globe className="w-3.5 h-3.5" /> Global
              </button>
              <button 
                onClick={() => setPeriod('weekly')}
                className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${period === 'weekly' ? 'bg-[color:var(--primary)] text-white shadow' : 'text-secondary hover:text-[color:var(--primary)] hover:bg-glass'}`}
              >
                <Calendar className="w-3.5 h-3.5" /> Weekly
              </button>
            </div>
            <select 
              value={topicId}
              onChange={e => setTopicId(e.target.value)}
              className="px-4 py-1.5 text-xs font-bold text-primary bg-glass-strong border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] appearance-none min-w-[140px]"
            >
              <option value="">All Topics</option>
              {topics.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* User's Ranking Card */}
      {currentUser && (
        <GlassCard className="flex flex-col lg:flex-row items-center justify-between p-6 shadow-sm border-l-4 border-l-[color:var(--primary)] overflow-hidden relative">
          <div className="flex items-center gap-4 w-full lg:w-auto mb-6 lg:mb-0">
            <div className="w-14 h-14 rounded-full bg-[color:var(--primary)] text-white flex items-center justify-center font-bold text-xl shadow-lg relative overflow-hidden">
              {currentUser.avatar ? (
                <img src={getImageUrl(currentUser.avatar)} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                getInitials(currentUser.name)
              )}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[color:var(--teal)] text-white rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-white z-10">
                YOU
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-primary">{currentUser.name}</h2>
                <span className="px-2 py-0.5 bg-[color:var(--primary)] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Your Ranking</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                Candidate ID: {generateId(currentUser.name)} <span className="text-glass-border">•</span> 
                <span className="flex items-center gap-1 text-[color:var(--primary)]"><TrendingUp className="w-3 h-3" /> Top Cohort</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-8 w-full lg:w-auto">
            <div className="text-center lg:text-left">
              <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Current Rank</div>
              <div className="text-3xl font-black text-[color:var(--primary)]">#{currentUser.rank}</div>
            </div>
            <div className="w-px h-10 bg-glass-border hidden sm:block"></div>
            <div className="text-center lg:text-left">
              <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Total Score</div>
              <div className="text-3xl font-black text-primary">{currentUser.score} <span className="text-sm text-secondary font-medium">pts</span></div>
            </div>
            <div className="w-px h-10 bg-glass-border hidden sm:block"></div>
            <div className="text-center lg:text-left">
              <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Accuracy</div>
              <div className="text-xl font-bold text-primary flex items-center gap-1">{Math.round((currentUser.score / currentUser.total) * 100)}% <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--mint)]"></div></div>
            </div>
            <div className="w-px h-10 bg-glass-border hidden sm:block"></div>
            <div className="text-center lg:text-left">
              <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">Average Time</div>
              <div className="text-xl font-bold text-primary">{formatTime(currentUser.timeTakenSec)}</div>
            </div>
          </div>
        </GlassCard>
      )}

      {leaderboard.length === 0 && (
        <EmptyState title="No results yet" message="No one has completed a test for these filters." icon={Trophy} />
      )}

      {/* Benchmark Leaders */}
      {topThree.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Award className="w-5 h-5 text-[color:var(--primary)]" /> Benchmark Leaders
            </h2>
            <div className="text-[10px] font-bold text-secondary uppercase tracking-widest">Standardized Evaluation Set v4.2</div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-end">
            
            {/* Rank 2 - Silver */}
            {topThree[1] && (
              <GlassCard className="flex flex-col items-center p-6 text-center h-[280px] relative border-t-4 border-[#94A3B8]">
                <div className="w-8 h-8 rounded-full bg-[#E2E8F0] text-[#334155] flex items-center justify-center text-xs font-bold absolute top-4 left-4">#2</div>
                <div className="absolute top-4 right-4 px-2 py-1 bg-[#E2E8F0] text-[#334155] text-[10px] font-bold rounded uppercase tracking-wider">Silver</div>
                
                <div className="w-20 h-20 rounded-full bg-glass-strong text-primary flex items-center justify-center font-bold text-2xl shadow-sm mt-4 mb-4 overflow-hidden border-2 border-[#94A3B8]">
                  {topThree[1].avatar ? <img src={getImageUrl(topThree[1].avatar)} alt={topThree[1].name} className="w-full h-full object-cover" /> : getInitials(topThree[1].name)}
                </div>
                <h3 className="text-lg font-bold text-primary">{topThree[1].name}</h3>
                <p className="text-[10px] text-secondary font-medium uppercase tracking-widest mb-6">{topicName}</p>
                
                <div className="mt-auto w-full grid grid-cols-3 gap-2 bg-glass-strong rounded-xl p-3">
                  <div>
                    <div className="text-[9px] text-secondary font-bold tracking-wider mb-1">SCORE</div>
                    <div className="text-sm font-black text-primary">{topThree[1].score}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-secondary font-bold tracking-wider mb-1">ACC.</div>
                    <div className={`text-sm font-black ${getAccColor(Math.round((topThree[1].score / topThree[1].total) * 100))}`}>{Math.round((topThree[1].score / topThree[1].total) * 100)}%</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-secondary font-bold tracking-wider mb-1">TIME</div>
                    <div className="text-sm font-black text-secondary">{formatTime(topThree[1].timeTakenSec)}</div>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Rank 1 - Gold */}
            {topThree[0] && (
              <GlassCard className="flex flex-col items-center p-6 text-center h-[310px] relative border-t-4 border-[#EAB308] shadow-[0_0_20px_rgba(234,179,8,0.15)] bg-yellow-50/30 dark:bg-yellow-900/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#EAB308] text-white text-[10px] font-black rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Trophy className="w-3 h-3" /> Pace Setter
                </div>
                
                <div className="w-8 h-8 rounded-full bg-[#FEF08A] text-[#854D0E] flex items-center justify-center text-xs font-bold absolute top-4 left-4 shadow-sm">#1</div>
                <div className="absolute top-4 right-4 px-2 py-1 bg-[#FEF08A] text-[#854D0E] text-[10px] font-bold rounded uppercase tracking-wider shadow-sm">Gold</div>
                
                <div className="w-24 h-24 rounded-full bg-glass-strong border-[3px] border-[#EAB308] text-primary flex items-center justify-center font-bold text-3xl shadow-md mt-6 mb-4 relative overflow-visible">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    {topThree[0].avatar ? <img src={getImageUrl(topThree[0].avatar)} alt={topThree[0].name} className="w-full h-full object-cover" /> : getInitials(topThree[0].name)}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#EAB308] text-white rounded-full flex items-center justify-center shadow-sm z-10">
                    <Star className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-primary">{topThree[0].name}</h3>
                <p className="text-[10px] text-secondary font-medium uppercase tracking-widest mb-6">{topicName}</p>
                
                <div className="mt-auto w-full grid grid-cols-3 gap-2 bg-glass-strong rounded-xl p-3 border border-[#FEF08A]/50">
                  <div>
                    <div className="text-[9px] text-secondary font-bold tracking-wider mb-1">SCORE</div>
                    <div className="text-sm font-black text-primary">{topThree[0].score}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-secondary font-bold tracking-wider mb-1">ACC.</div>
                    <div className={`text-sm font-black ${getAccColor(Math.round((topThree[0].score / topThree[0].total) * 100))}`}>{Math.round((topThree[0].score / topThree[0].total) * 100)}%</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-secondary font-bold tracking-wider mb-1">TIME</div>
                    <div className="text-sm font-black text-secondary">{formatTime(topThree[0].timeTakenSec)}</div>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Rank 3 - Bronze */}
            {topThree[2] && (
              <GlassCard className="flex flex-col items-center p-6 text-center h-[280px] relative border-t-4 border-[#D97706]">
                <div className="w-8 h-8 rounded-full bg-[#FED7AA] text-[#9A3412] flex items-center justify-center text-xs font-bold absolute top-4 left-4">#3</div>
                <div className="absolute top-4 right-4 px-2 py-1 bg-[#FED7AA] text-[#9A3412] text-[10px] font-bold rounded uppercase tracking-wider">Bronze</div>
                
                <div className="w-20 h-20 rounded-full bg-glass-strong text-primary flex items-center justify-center font-bold text-2xl shadow-sm mt-4 mb-4 overflow-hidden border-2 border-[#D97706]">
                  {topThree[2].avatar ? <img src={getImageUrl(topThree[2].avatar)} alt={topThree[2].name} className="w-full h-full object-cover" /> : getInitials(topThree[2].name)}
                </div>
                <h3 className="text-lg font-bold text-primary">{topThree[2].name}</h3>
                <p className="text-[10px] text-secondary font-medium uppercase tracking-widest mb-6">{topicName}</p>
                
                <div className="mt-auto w-full grid grid-cols-3 gap-2 bg-glass-strong rounded-xl p-3">
                  <div>
                    <div className="text-[9px] text-secondary font-bold tracking-wider mb-1">SCORE</div>
                    <div className="text-sm font-black text-primary">{topThree[2].score}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-secondary font-bold tracking-wider mb-1">ACC.</div>
                    <div className={`text-sm font-black ${getAccColor(Math.round((topThree[2].score / topThree[2].total) * 100))}`}>{Math.round((topThree[2].score / topThree[2].total) * 100)}%</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-secondary font-bold tracking-wider mb-1">TIME</div>
                    <div className="text-sm font-black text-secondary">{formatTime(topThree[2].timeTakenSec)}</div>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </section>
      )}

      {/* Full Cohort Roster Table */}
      {leaderboard.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-4 mt-6">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-primary">Full Cohort Roster</h2>
              <Badge variant="neutral" className="text-[10px]">Ranks 1-{leaderboard.length}</Badge>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-secondary uppercase tracking-wider">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[color:var(--primary)]"></div> &gt;90% Accuracy</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[color:var(--teal)]"></div> 80-90% Accuracy</div>
            </div>
          </div>

          <GlassCard className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="bg-[#F8FAFC] dark:bg-white/5 border-b border-glass-border">
                  <tr>
                    <th className="p-4 w-20 text-xs font-bold text-secondary uppercase tracking-widest text-center">Rank</th>
                    <th className="p-4 text-xs font-bold text-secondary uppercase tracking-widest">Student</th>
                    <th className="p-4 text-xs font-bold text-secondary uppercase tracking-widest">Category / Topic</th>
                    <th className="p-4 text-xs font-bold text-secondary uppercase tracking-widest text-center">Score</th>
                    <th className="p-4 text-xs font-bold text-secondary uppercase tracking-widest text-center">Accuracy</th>
                    <th className="p-4 text-xs font-bold text-secondary uppercase tracking-widest text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-glass-border/50">
                  {remainingRoster.map(entry => {
                    const acc = Math.round((entry.score / entry.total) * 100);
                    const isMe = currentUser && currentUser.rank === entry.rank;
                    
                    return (
                      <tr key={entry.rank} className={`hover:bg-glass transition-colors ${isMe ? 'bg-[color:var(--primary)]/5' : ''}`}>
                        <td className="p-4 flex justify-center items-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${getRankBg(entry.rank)}`}>
                            {entry.rank}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-glass-strong text-primary flex items-center justify-center text-xs font-bold shadow-sm overflow-hidden">
                              {entry.avatar ? <img src={getImageUrl(entry.avatar)} alt={entry.name} className="w-full h-full object-cover" /> : getInitials(entry.name)}
                            </div>
                            <div>
                              <div className="font-bold text-sm text-primary">{entry.name}</div>
                              <div className="text-[10px] text-secondary font-medium tracking-wider">{generateId(entry.name)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-[color:var(--primary-soft)] text-[color:var(--primary)] text-[10px] font-bold rounded-full border border-[color:var(--primary-soft)] whitespace-nowrap">
                            {topicName}
                          </span>
                        </td>
                        <td className="p-4 text-center font-black tabular-nums text-primary text-sm">
                          {entry.score}
                        </td>
                        <td className="p-4 text-center">
                          <span className={`text-sm font-black ${getAccColor(acc)}`}>{acc}%</span>
                        </td>
                        <td className="p-4 text-right text-secondary tabular-nums text-xs font-bold">
                          {formatTime(entry.timeTakenSec)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </section>
      )}

    </div>
  );
}
