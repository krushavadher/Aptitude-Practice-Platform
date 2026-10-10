import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../../api/axios'; // We need direct access to /admin/stats if not exported in index.js
import { GlassCard } from '../../components/common/GlassCard';
import { Loader } from '../../components/common/Loader';
import { ErrorState } from '../../components/common/States';
import { Users, FileText, CheckCircle, Clock, BookOpen, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const fetchAdminStats = async () => {
  const { data } = await api.get('/admin/stats');
  return data.data;
};

export default function AdminDashboard() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: fetchAdminStats
  });

  if (isLoading) return <div className="flex-1 flex justify-center p-12"><Loader size={48} /></div>;
  if (error) return <ErrorState message="Failed to load admin stats" className="mt-12" />;

  const { users, testsTaken, questions } = stats;
  const totalQuestions = (questions.draft || 0) + (questions.approved || 0) + (questions.rejected || 0);

  const pieData = [
    { name: 'Approved', value: questions.approved || 0 },
    { name: 'Pending Review', value: questions.draft || 0 },
    { name: 'Rejected', value: questions.rejected || 0 }
  ].filter(d => d.value > 0);

  const COLORS = ['var(--success)', 'var(--warning)', 'var(--danger)', '#4F46E5'];

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
        <p className="text-secondary">Overview of platform metrics and quick links.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard padding="p-6" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent bg-opacity-10 flex items-center justify-center border border-accent border-opacity-20">
            <Users className="w-6 h-6 text-accent" />
          </div>
          <div>
            <div className="text-sm font-medium text-secondary mb-1">Total Users</div>
            <div className="text-2xl font-bold tabular-nums text-primary">{users}</div>
          </div>
        </GlassCard>

        <GlassCard padding="p-6" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success bg-opacity-10 flex items-center justify-center border border-success border-opacity-20">
            <CheckCircle className="w-6 h-6 text-success" />
          </div>
          <div>
            <div className="text-sm font-medium text-secondary mb-1">Tests Taken</div>
            <div className="text-2xl font-bold tabular-nums text-primary">{testsTaken}</div>
          </div>
        </GlassCard>

        <GlassCard padding="p-6" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent bg-opacity-10 flex items-center justify-center border border-accent border-opacity-20">
            <FileText className="w-6 h-6 text-accent" />
          </div>
          <div>
            <div className="text-sm font-medium text-secondary mb-1">Total Questions</div>
            <div className="text-2xl font-bold tabular-nums text-primary">{totalQuestions}</div>
          </div>
        </GlassCard>

        <GlassCard padding="p-6" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning bg-opacity-10 flex items-center justify-center border border-warning border-opacity-20">
            <Clock className="w-6 h-6 text-warning" />
          </div>
          <div>
            <div className="text-sm font-medium text-secondary mb-1">Pending Review</div>
            <div className="text-2xl font-bold tabular-nums text-primary">{questions.draft || 0}</div>
          </div>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <GlassCard className="pt-6 pb-2 px-2 sm:px-6 flex flex-col lg:col-span-1">
          <div className="mb-4 px-4 text-center sm:text-left">
            <h2 className="text-xl font-bold text-primary mb-1">Questions Database</h2>
            <p className="text-xs text-secondary">Current status distribution</p>
          </div>
          <div className="h-72 w-full flex-1 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="var(--glass-border)"
                  strokeWidth={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{ backgroundColor: 'var(--glass-bg-strong)', borderColor: 'var(--glass-border)', borderRadius: '0.75rem', color: 'var(--text-primary)', boxShadow: '0 8px 16px -4px rgb(0 0 0 / 0.15)', padding: '8px 12px' }}
                  itemStyle={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '14px' }}
                  formatter={(value) => [`${value} question${value !== 1 ? 's' : ''}`, '']}
                  labelStyle={{ display: 'none' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={48}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:col-span-2">
          <Link to="/admin/topics" className="group focus-visible outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          <GlassCard className="h-full hover:bg-glass-strong transition-colors border-l-4 border-l-accent p-6 flex items-start gap-4">
            <div className="p-3 bg-glass rounded-lg text-accent">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary mb-1 group-hover:text-accent transition-colors">Manage Topics</h2>
              <p className="text-secondary text-sm">Create, edit, and categorize subject areas and their subtopics.</p>
            </div>
          </GlassCard>
        </Link>
        
        <Link to="/admin/questions" className="group focus-visible outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          <GlassCard className="h-full hover:bg-glass-strong transition-colors border-l-4 border-l-accent p-6 flex items-start gap-4">
            <div className="p-3 bg-glass rounded-lg text-accent">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary mb-1 group-hover:text-accent transition-colors">Manage Questions</h2>
              <p className="text-secondary text-sm">Add manual questions, view the database, and run filters.</p>
            </div>
          </GlassCard>
        </Link>
        
        <Link to="/admin/review" className="group focus-visible outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          <GlassCard className="h-full hover:bg-glass-strong transition-colors border-l-4 border-l-warning p-6 flex items-start gap-4">
            <div className="p-3 bg-glass rounded-lg text-warning">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary mb-1 group-hover:text-warning transition-colors flex items-center gap-2">Review Queue</h2>
              <p className="text-secondary text-sm">Review, edit, approve, or reject AI-generated questions.</p>
            </div>
          </GlassCard>
        </Link>
        
        <Link to="/admin/ai" className="group focus-visible outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          <GlassCard className="h-full hover:bg-glass-strong transition-colors border-l-4 border-l-success p-6 flex items-start gap-4">
            <div className="p-3 bg-glass rounded-lg text-success">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary mb-1 group-hover:text-success transition-colors flex items-center gap-2">AI Generator</h2>
              <p className="text-secondary text-sm">Generate questions in bulk using the Gemini AI service.</p>
            </div>
          </GlassCard>
        </Link>
        </div>
      </div>
    </div>
  );
}
