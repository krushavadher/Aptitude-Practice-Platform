import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { meApi, topicApi } from '../../api';
import { useAuth } from '../../hooks/useAuth';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Loader } from '../../components/common/Loader';
import { ErrorState, EmptyState } from '../../components/common/States';
import { CheckCircle, Activity, Award, ArrowRight, Play, BookOpen, AlertTriangle, Clock, TrendingUp, CheckSquare } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getImageUrl } from '../../utils/getImageUrl';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [themeColors, setThemeColors] = useState({
    accent: '#4F46E5',
    grid: '#475569'
  });

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setThemeColors({
      accent: style.getPropertyValue('--accent').trim() || '#4F46E5',
      grid: style.getPropertyValue('--glass-border').trim() || '#475569'
    });
  }, []);

  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['myStats'],
    queryFn: meApi.stats
  });

  const { data: recentAttemptsData, isLoading: attemptsLoading, error: attemptsError } = useQuery({
    queryKey: ['myAttempts', 1, 8],
    queryFn: () => meApi.attempts({ page: 1, limit: 8 }) // fetch up to 8 for the chart
  });

  const { data: topics = [] } = useQuery({
    queryKey: ['topics'],
    queryFn: topicApi.list
  });

  if (statsLoading || attemptsLoading) return <div className="flex-1 flex justify-center p-12"><Loader size={48} /></div>;
  if (statsError) return <ErrorState message="Failed to load dashboard stats" className="mt-12" />;
  if (attemptsError) return <ErrorState message="Failed to load recent activity" className="mt-12" />;

  const { totalAttempts, averageScore, accuracyPerTopic } = stats;
  const recentAttempts = recentAttemptsData.attempts || [];

  if (totalAttempts === 0) {
    return (
      <div className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Welcome, {user.name}!</h1>
          <p className="text-secondary mt-1">Ready to start practicing?</p>
        </div>
        <EmptyState 
          icon={Play}
          title="No tests taken yet"
          message="Your dashboard will show your performance statistics once you complete your first test."
          action={<Button onClick={() => navigate('/topics')}>Start a Test</Button>}
        />
      </div>
    );
  }

  // Format chart data (reverse so oldest is left, newest is right)
  const chartData = [...recentAttempts].reverse().map((a, i) => ({
    name: `Test ${i + 1}`,
    accuracy: Math.round((a.score / a.total) * 100),
    date: new Date(a.submittedAt).toLocaleDateString()
  }));

  // Topic mapping
  const topicMap = topics.reduce((acc, t) => { acc[t._id] = t; return acc; }, {});

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6 pb-24">
      
      {/* Banner */}
      <GlassCard className="relative overflow-hidden border-none shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-glass to-transparent opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 p-2">
          <div className="flex items-center gap-4">
            {user?.avatar && (
              <img src={getImageUrl(user.avatar)} alt="Profile" className="w-16 h-16 rounded-full border-2 border-accent object-cover" />
            )}
            <div>
              <div className="text-xs font-bold tracking-widest text-accent uppercase mb-2">Academic Telemetry • Active Session</div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2">Welcome back, {user.name}</h1>
              <p className="text-secondary text-base">Track your progress and continue your preparation.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" className="bg-glass shadow-sm whitespace-nowrap" leftIcon={<Clock className="w-4 h-4 text-accent" />} onClick={() => navigate('/test/setup')}>
              Start a Timed Test
            </Button>
            <Button variant="primary" className="shadow-lg whitespace-nowrap" leftIcon={<Play className="w-4 h-4" />} onClick={() => navigate('/topics')}>
              Practice Questions
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Stat Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard padding="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Cumulative Evaluated Tests</div>
              <div className="text-4xl font-black text-primary mb-1">{totalAttempts}</div>
              <div className="text-xs text-secondary">Tests taken across all modules</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 shadow-sm">
              <CheckSquare className="w-6 h-6 text-accent" />
            </div>
          </div>
        </GlassCard>

        <GlassCard padding="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Benchmark Mean Score</div>
              <div className="flex items-baseline gap-3 mb-1">
                <div className="text-4xl font-black text-primary">{Math.round(averageScore * 10) / 10}%</div>
                {averageScore > 70 && <span className="text-xs font-bold text-success-text bg-success/10 px-2 py-0.5 rounded-full border border-success/20">+ Good</span>}
              </div>
              <div className="text-xs text-secondary">Average score across all sessions</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary bg-opacity-5 flex items-center justify-center border border-glass-border shadow-sm">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Progress History Chart */}
      <GlassCard className="pt-6 pb-2 px-2 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 px-4">
          <div>
            <h2 className="text-xl font-bold text-primary mb-1">Progress History</h2>
            <p className="text-xs text-secondary">Score trajectory progression across your recent evaluations</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-secondary">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-accent"></div> Test Attempt %</div>
            <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-gray-400 border-t border-dashed"></div> Baseline (70%)</div>
          </div>
        </div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 20, right: 20, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={themeColors.accent} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={themeColors.accent} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={themeColors.grid} vertical={false} opacity={0.5} />
              <XAxis dataKey="name" stroke={themeColors.grid} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke={themeColors.grid} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} ticks={[50, 75, 85, 100]} tickFormatter={(val) => `${val}%`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--glass-bg-strong)', borderColor: 'var(--glass-border)', borderRadius: '0.75rem', color: 'var(--text-primary)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: 'var(--accent)', fontWeight: 'bold' }}
                formatter={(value) => [`${value}%`, 'Accuracy']}
                labelStyle={{ color: 'var(--text-secondary)', marginBottom: '0.25rem', fontSize: '0.875rem' }}
              />
              <ReferenceLine y={70} stroke="gray" strokeDasharray="3 3" opacity={0.5} />
              <Area 
                type="monotone" 
                dataKey="accuracy" 
                stroke={themeColors.accent} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorAccuracy)" 
                activeDot={{ r: 6, strokeWidth: 0, fill: themeColors.accent }}
                dot={{ r: 4, fill: 'var(--glass-bg)', stroke: themeColors.accent, strokeWidth: 2 }}
                label={{ position: 'top', fill: 'var(--text-primary)', fontSize: 12, fontWeight: 600, formatter: (val) => `${val}%`, dy: -10 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Topic Performance Grid */}
      <div>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-primary mb-1">Topic Performance</h2>
            <p className="text-xs text-secondary">Accuracy calibration across evaluated categories</p>
          </div>
          <Badge variant="neutral" className="text-xs">{accuracyPerTopic.length} Subject Areas</Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accuracyPerTopic.map(stat => {
            const isMixed = stat.topicId === 'mixed';
            const topic = topicMap[stat.topicId];
            const name = isMixed ? 'Mixed Topics' : (topic?.name || 'Unknown Topic');
            const category = isMixed ? 'GENERAL' : (topic?.category?.toUpperCase() || 'TOPIC');
            const subtopics = isMixed ? ['Various topics'] : (topic?.subtopics || []);
            const accuracy = Math.round(stat.accuracy);

            // Determine badge color
            let badgeVariant = 'success';
            let barColor = 'bg-success';
            if (accuracy < 70) {
              badgeVariant = 'warning';
              barColor = 'bg-warning';
            } else if (accuracy < 85) {
              badgeVariant = 'accent';
              barColor = 'bg-accent';
            }

            return (
              <GlassCard key={stat.topicId} className="flex flex-col h-full border-t-4" style={{ borderTopColor: `var(--${barColor.replace('bg-', '')})` }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-bold text-secondary tracking-widest">{category}</div>
                  <div className={`px-2 py-1 rounded bg-${badgeVariant}/10 text-${badgeVariant}-text font-bold text-sm border border-${badgeVariant}/20`}>
                    {accuracy}%
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-6">{name}</h3>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center text-xs text-secondary mb-2 font-medium">
                    <span>Accuracy</span>
                  </div>
                  {/* Custom progress bar to match the exact color from logic above */}
                  <div className="w-full h-1.5 bg-glass-border rounded-full overflow-hidden">
                    <div className={`h-full ${barColor} rounded-full`} style={{ width: `${accuracy}%` }}></div>
                  </div>
                </div>

                {subtopics.length > 0 && (
                  <div className="mb-8 flex-1">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-3">Tested Subtopics</div>
                    <div className="flex flex-wrap gap-2">
                      {subtopics.slice(0, 4).map(sub => (
                        <span key={sub} className="px-2 py-1 bg-glass-strong border border-glass-border rounded text-xs text-secondary whitespace-nowrap">
                          {sub}
                        </span>
                      ))}
                      {subtopics.length > 4 && (
                        <span className="px-2 py-1 bg-glass-strong border border-glass-border rounded text-xs text-secondary whitespace-nowrap">
                          +{subtopics.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <Button 
                  variant="secondary" 
                  className="w-full mt-auto bg-accent/5 hover:bg-accent/10 border-accent/20 text-accent transition-colors"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => navigate(isMixed ? '/topics' : `/practice/${stat.topicId}`)}
                >
                  Practice this topic
                </Button>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Recent Attempts - Kept as requested by user context but styled to fit */}
      <section className="pt-4 border-t border-glass-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-primary">Recent Evaluations</h2>
          <Link to="/history" className="text-accent hover:underline text-sm font-medium flex items-center gap-1 focus-visible outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">
            View complete history <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentAttempts.slice(0, 4).map(a => {
            const date = new Date(a.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            const topicName = a.topicId ? (a.topicId.name || topicMap[a.topicId]?._id || 'Unknown Topic') : 'Mixed Topics';
            const acc = Math.round((a.score / a.total) * 100);
            
            return (
              <Link 
                key={a._id} 
                to={`/results/${a.testId}`}
                className="flex flex-col p-4 bg-glass-strong rounded-xl border border-glass-border hover:border-accent/50 transition-colors focus-visible outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-primary truncate pr-2">{topicName}</span>
                  <span className="font-black text-primary">{acc}%</span>
                </div>
                <div className="flex justify-between items-center text-xs text-secondary mt-auto">
                  <span>{date}</span>
                  <span>{a.score}/{a.total}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}
