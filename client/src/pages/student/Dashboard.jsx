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

  // Filter topics for the Topic Performance grid
  const recentTopicIds = new Set(recentAttempts.map(a => a.topicId || 'mixed'));
  const filteredTopics = accuracyPerTopic.filter(stat => 
    stat.accuracy > 0 || recentTopicIds.has(stat.topicId)
  ).slice(0, 6);

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-24 space-y-6">

      {/* Banner */}
      <GlassCard className="card-solid-green relative overflow-hidden border-none shadow-md p-2">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-30"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 p-2">
          <div className="flex items-center gap-4">
            {user?.avatar && (
              <img src={getImageUrl(user.avatar)} alt="Profile" className="w-16 h-16 rounded-full border-2 border-white object-cover" />
            )}
            <div>
              <div className="text-xs font-semibold tracking-[0.08em] text-[color:var(--mint)] uppercase mb-2">Academic Telemetry • Active Session</div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Welcome back, {user.name}</h1>
              <p className="text-white/85 text-base">Track your progress and continue your preparation.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" className="bg-transparent shadow-sm whitespace-nowrap text-white border border-white/45 hover:bg-white/12" leftIcon={<Clock className="w-4 h-4" />} onClick={() => navigate('/test/setup')}>
              Start a Timed Test
            </Button>
            <Button className="bg-white/20 text-white font-semibold hover:bg-white/30 border border-white/45 shadow-md whitespace-nowrap" leftIcon={<Play className="w-4 h-4" />} onClick={() => navigate('/topics')}>
              Practice Questions
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Stat Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard padding="p-6" className="card-tint-green">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Cumulative Evaluated Tests</div>
              <div className="text-4xl font-black text-primary mb-1">{totalAttempts}</div>
              <div className="text-xs text-secondary">Tests taken across all modules</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[color:var(--primary-soft)] flex items-center justify-center shadow-sm">
              <CheckSquare className="w-6 h-6 text-[color:var(--primary)]" />
            </div>
          </div>
        </GlassCard>

        <GlassCard padding="p-6" className="card-tint-teal">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Benchmark Mean Score</div>
              <div className="flex items-baseline gap-3 mb-1">
                <div className="text-4xl font-black text-primary">{Math.round(averageScore * 10) / 10}%</div>
                {averageScore > 70 && <span className="text-xs font-bold text-success-text bg-success/10 px-2 py-0.5 rounded-full border border-success/20">+ Good</span>}
              </div>
              <div className="text-xs text-secondary">Average score across all sessions</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[color:var(--teal-soft)] flex items-center justify-center shadow-sm">
              <TrendingUp className="w-6 h-6 text-[color:var(--teal)]" />
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
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[color:var(--primary)]"></div> Test Attempt %</div>
            <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-gray-400 border-t border-dashed border-[color:var(--text-muted)]"></div> Baseline (70%)</div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 20, right: 20, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={themeColors.grid} vertical={false} opacity={0.5} />
              <XAxis dataKey="name" stroke={themeColors.grid} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke={themeColors.grid} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} ticks={[50, 75, 85, 100]} tickFormatter={(val) => `${val}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--glass-bg-strong)', borderColor: 'var(--glass-border)', borderRadius: '0.75rem', color: 'var(--text-primary)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                formatter={(value) => [`${value}%`, 'Accuracy']}
                labelStyle={{ color: 'var(--text-secondary)', marginBottom: '0.25rem', fontSize: '0.875rem' }}
              />
              <ReferenceLine y={70} stroke="var(--text-muted)" strokeDasharray="3 3" opacity={0.5} />
              <Area
                type="monotone"
                dataKey="accuracy"
                stroke="var(--primary)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAccuracy)"
                activeDot={{ r: 6, strokeWidth: 2, stroke: 'var(--primary)', fill: '#fff' }}
                dot={{ r: 4, fill: '#fff', stroke: 'var(--primary)', strokeWidth: 2 }}
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
          <Badge variant="neutral" className="text-xs">{filteredTopics.length} Active Areas</Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.length === 0 && (
            <div className="col-span-full py-8 text-center text-secondary border border-dashed border-glass-border rounded-xl">
              Take tests in different topics to build your performance profile.
            </div>
          )}
          {filteredTopics.map(stat => {
            const isMixed = stat.topicId === 'mixed';
            const topic = topicMap[stat.topicId];
            const name = isMixed ? 'Mixed Topics' : (topic?.name || 'Unknown Topic');
            const category = isMixed ? 'GENERAL' : (topic?.category?.toUpperCase() || 'TOPIC');
            const subtopics = isMixed ? ['Various topics'] : (topic?.subtopics || []);
            const accuracy = Math.round(stat.accuracy);

            // Determine badge color
            let badgeColor = 'var(--primary)';
            if (accuracy < 70) {
              badgeColor = 'var(--teal)';
            }
            
            const transparentBg = `color-mix(in srgb, ${badgeColor} 10%, transparent)`;
            const transparentBorder = `color-mix(in srgb, ${badgeColor} 20%, transparent)`;

            return (
              <GlassCard key={stat.topicId} className="flex flex-col h-full border-t-4 p-6" style={{ borderTopColor: badgeColor }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-bold text-secondary tracking-widest">{category}</div>
                  <div className="px-2 py-1 rounded font-bold text-sm border shadow-sm backdrop-blur-sm" style={{ color: badgeColor, backgroundColor: transparentBg, borderColor: transparentBorder }}>
                    {accuracy}%
                  </div>
                </div>

                <h3 className="text-xl font-bold text-primary mb-6">{name}</h3>

                <div className="mb-6">
                  <div className="flex justify-between items-center text-xs text-secondary mb-2 font-medium">
                    <span>Accuracy</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'color-mix(in srgb, var(--text) 8%, transparent)' }}>
                    <div className="h-full rounded-full" style={{ width: `${accuracy}%`, backgroundColor: badgeColor }}></div>
                  </div>
                </div>

                {subtopics.length > 0 && (
                  <div className="mb-8 flex-1">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-3">Tested Subtopics</div>
                    <div className="flex flex-wrap gap-2">
                      {subtopics.slice(0, 4).map(sub => (
                        <span key={sub} className="px-2 py-1 border border-glass-border rounded text-xs text-secondary whitespace-nowrap backdrop-blur-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--text) 3%, transparent)' }}>
                          {sub}
                        </span>
                      ))}
                      {subtopics.length > 4 && (
                        <span className="px-2 py-1 border border-glass-border rounded text-xs text-secondary whitespace-nowrap backdrop-blur-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--text) 3%, transparent)' }}>
                          +{subtopics.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  className="w-full mt-auto hover:text-white transition-colors shadow-sm backdrop-blur-sm"
                  style={{ 
                    backgroundColor: transparentBg, 
                    borderColor: transparentBorder,
                    color: badgeColor 
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = badgeColor;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = transparentBg;
                    e.currentTarget.style.color = badgeColor;
                  }}
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
          <Link to="/history" className="text-[color:var(--primary)] hover:underline text-sm font-medium flex items-center gap-1 focus-visible outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)] rounded">
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
