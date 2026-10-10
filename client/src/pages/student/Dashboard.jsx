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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell, Legend } from 'recharts';
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

  const { totalAttempts, averageScore, accuracyPerTopic, attemptsPerTopic } = stats;
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

  // Pie Chart Data
  const pieData = (attemptsPerTopic || []).map(stat => ({
    name: stat.topicId === 'mixed' ? 'Mixed Topics' : (topicMap[stat.topicId]?.name || 'Unknown'),
    value: stat.attempts
  })).filter(d => d.value > 0);
  
  const COLORS = ['var(--primary)', 'var(--teal)', 'var(--success)', 'var(--warning)', '#8B5CF6', '#EC4899', '#06B6D4'];

  return (
    <div className="flex-1 w-full flex flex-col pb-24">
      
      {/* Banner */}
      <div className="w-full bg-white/30 backdrop-blur-2xl border-b border-white/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 bottom-0 w-[60%] bg-gradient-to-l from-[#E6F4EA] to-transparent opacity-60"></div>
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-[84px] h-[84px] rounded-full bg-[#E0EFE5] flex items-center justify-center text-[32px] font-bold text-[#174A33] shrink-0 border border-white/50 shadow-sm">
              {user?.avatar ? (
                <img src={getImageUrl(user.avatar)} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
                <span className="text-[11px] font-bold text-[#348B69] tracking-wider uppercase">Active Session</span>
              </div>
              <h1 className="text-[40px] leading-tight font-extrabold text-[#132B20] tracking-tight mb-1">
                Welcome back, {user.name.split(' ')[0]}
              </h1>
              <p className="text-[#5B6F67] text-[15px]">Track your progress and continue your preparation.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-[#133224] text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#0a2017] transition-colors shadow-lg shadow-[#133224]/20 border-none h-auto" leftIcon={<Clock className="w-4 h-4" />} onClick={() => navigate('/test/setup')}>
              Start a Timed Test
            </Button>
            <Button className="bg-white/50 backdrop-blur-sm text-[#133224] border border-white/60 px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/80 transition-colors shadow-sm h-auto" leftIcon={<Play className="w-4 h-4 fill-current" />} onClick={() => navigate('/topics')}>
              Practice Questions
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 space-y-6 flex-1">

      {/* Stat Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-white/60 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.1em] mb-2">Tests Completed</div>
            <div className="text-[40px] leading-[1] font-black text-[#132B20] mb-1.5">{totalAttempts}</div>
            <div className="text-[13px] text-[#64748B]">Taken across all modules</div>
          </div>
          <div className="w-[42px] h-[42px] rounded-xl bg-[#E6F0EB] flex items-center justify-center border border-white/50">
            <CheckSquare className="w-5 h-5 text-[#247D57]" />
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-white/60 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.1em] mb-2">Average Score</div>
            <div className="text-[40px] leading-[1] font-black text-[#132B20] mb-1.5">{Math.round(averageScore)}%</div>
            <div className="text-[13px] text-[#64748B]">Average across all sessions</div>
          </div>
          <div className="w-[42px] h-[42px] rounded-xl bg-[#E6F0EB] flex items-center justify-center border border-white/50">
            <TrendingUp className="w-5 h-5 text-[#247D57]" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Progress History Chart */}
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-white/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-[22px] font-bold text-[#132B20] mb-1">Progress History</h2>
              <p className="text-[13px] text-[#64748B]">Score trend across your recent tests</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-semibold text-[#64748B]">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#247D57]"></div> Score</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-0 border-t border-dashed border-[#94A3B8]"></div> Baseline 70%</div>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 20, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#247D57" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#247D57" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#132B20' }}
                  itemStyle={{ color: '#247D57', fontWeight: 600 }}
                  formatter={(value) => [`${value}%`, 'Score']}
                />
                <ReferenceLine y={70} stroke="#64748B" strokeDasharray="4 4" />
                <Area 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#247D57" 
                  strokeWidth={3} 
                  fill="url(#colorScore)" 
                  activeDot={{ r: 6, fill: '#fff', stroke: '#247D57', strokeWidth: 3 }}
                  dot={{ r: 5, fill: '#fff', stroke: '#247D57', strokeWidth: 2 }}
                  label={{ position: 'top', fill: '#132B20', fontSize: 13, fontWeight: 700, formatter: (val) => `${val}%`, dy: -12 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Practice Distribution Pie Chart */}
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-white/60 flex flex-col">
          <div className="mb-4">
            <h2 className="text-[22px] font-bold text-[#132B20] mb-1">Practice Distribution</h2>
            <p className="text-[13px] text-[#64748B]">Tests taken by topic</p>
          </div>
          
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center sm:justify-around gap-6 mt-4">
            <div className="h-[180px] w-[180px] relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => {
                      const COLORS_PIE = ['#133224', '#247D57', '#69B28D', '#A5D4B8', '#D1E6DA'];
                      return <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />;
                    })}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[28px] leading-none font-black text-[#132B20]">{totalAttempts}</span>
                <span className="text-xs text-[#64748B] font-medium mt-1">tests</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full flex-1 sm:max-w-[200px] overflow-hidden">
              {pieData.map((entry, index) => {
                const COLORS_PIE = ['#133224', '#247D57', '#69B28D', '#A5D4B8', '#D1E6DA'];
                const percentage = Math.round((entry.value / totalAttempts) * 100);
                return (
                  <div key={entry.name} className="flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2.5 h-2.5 rounded shrink-0" style={{ backgroundColor: COLORS_PIE[index % COLORS_PIE.length] }}></div>
                      <span className="text-[12px] font-medium text-[#334155] truncate" title={entry.name}>{entry.name}</span>
                    </div>
                    <span className="text-[12px] font-bold text-[#132B20] shrink-0 ml-2">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

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
              <div key={stat.topicId} className="flex flex-col h-full p-6 bg-white/30 backdrop-blur-xl rounded-[20px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-white/60 transition-colors">
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
                  className="w-full mt-auto bg-[#E6F0EB] text-[#247D57] border-none hover:bg-[#D1E6DA] transition-colors"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => navigate(isMixed ? '/topics' : `/practice/${stat.topicId}`)}
                >
                  Practice this topic
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Attempts - Styled to match new dashboard theme */}
      <section className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-bold text-[#132B20]">Recent Evaluations</h2>
          <Link to="/history" className="text-[#247D57] hover:underline text-[13px] font-medium flex items-center gap-1 focus-visible:outline-none rounded">
            View complete history <ArrowRight className="w-3.5 h-3.5" />
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
                className="flex flex-col p-5 bg-white/30 backdrop-blur-xl rounded-[20px] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-white/60 hover:bg-white/40 transition-colors focus-visible:outline-none"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[14px] font-bold text-[#132B20] truncate pr-2">{topicName}</span>
                  <span className="text-[16px] font-black text-[#132B20]">{acc}%</span>
                </div>
                <div className="flex justify-between items-center text-[12px] font-medium text-[#64748B] mt-auto">
                  <span>{date}</span>
                  <span>{a.score}/{a.total}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      </div>
    </div>
  );
}
