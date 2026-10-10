import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { GlassCard } from '../../components/common/GlassCard';
import { Loader } from '../../components/common/Loader';
import { ErrorState } from '../../components/common/States';
import { Users, FileText, CheckSquare, Clock, BookOpen, Sparkles } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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
    { name: 'Approved', value: questions.approved || 0, color: '#14724F' },
    { name: 'Pending Review', value: questions.draft || 0, color: '#F59E0B' },
    { name: 'Rejected', value: questions.rejected || 0, color: '#EF4444' }
  ].filter(d => d.value > 0);

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-5 lg:p-6 space-y-4 pb-20">
      <div className="mb-6">
        <h1 className="text-[28px] font-extrabold text-[#10241E] mb-2 tracking-tight">Admin Dashboard</h1>
        <p className="text-[#5B6F67] text-[15px]">Overview of platform metrics and quick links.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/admin/users" className="group focus-visible outline-none rounded-[16px] focus-visible:ring-2 focus-visible:ring-[#14724F] focus-visible:ring-offset-2 transition-all">
          <div className="flex items-center gap-3 p-4 rounded-[16px] bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300">
            <div className="w-[38px] h-[38px] rounded-[10px] bg-[#E5F5ED] text-[#14724F] flex items-center justify-center shrink-0 group-hover:bg-[#14724F] group-hover:text-white transition-colors">
              <Users className="w-4 h-4" strokeWidth={2} />
            </div>
            <div>
              <div className="text-[11px] font-medium text-[#5B6F67] mb-0.5">Total Users</div>
              <div className="text-[22px] leading-none font-black text-[#10241E]">{users}</div>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3 p-4 rounded-[16px] bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <div className="w-[38px] h-[38px] rounded-[10px] bg-[#E5F5ED] text-[#14724F] flex items-center justify-center shrink-0">
            <CheckSquare className="w-4 h-4" strokeWidth={2} />
          </div>
          <div>
            <div className="text-[11px] font-medium text-[#5B6F67] mb-0.5">Tests Taken</div>
            <div className="text-[22px] leading-none font-black text-[#10241E]">{testsTaken}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-[16px] bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <div className="w-[38px] h-[38px] rounded-[10px] bg-[#E5F5ED] text-[#14724F] flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" strokeWidth={2} />
          </div>
          <div>
            <div className="text-[11px] font-medium text-[#5B6F67] mb-0.5">Total Questions</div>
            <div className="text-[22px] leading-none font-black text-[#10241E]">{totalQuestions}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-[16px] bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <div className="w-[38px] h-[38px] rounded-[10px] bg-[#E5F5ED] text-[#14724F] flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" strokeWidth={2} />
          </div>
          <div>
            <div className="text-[11px] font-medium text-[#5B6F67] mb-0.5">Pending Review</div>
            <div className="text-[22px] leading-none font-black text-[#10241E]">{questions.draft || 0}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Pie Chart Card */}
        <div className="p-5 flex flex-col lg:col-span-1 rounded-[16px] bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
          <div className="mb-4">
            <h2 className="text-[16px] font-extrabold text-[#10241E] mb-0.5">Questions Database</h2>
            <p className="text-[11px] text-[#5B6F67]">Current status distribution</p>
          </div>
          
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-5">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[24px] font-black text-[#10241E] leading-none mb-1">{totalQuestions}</span>
                <span className="text-[9px] font-bold text-[#5B6F67] uppercase tracking-wider">questions</span>
              </div>
            </div>
            
            <div className="w-full flex flex-col gap-3 px-2">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-[13px] font-semibold text-[#5B6F67]">{entry.name}</span>
                  </div>
                  <span className="text-[14px] font-black text-[#10241E]">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4 lg:col-span-2">
          <Link to="/admin/topics" className="group focus-visible outline-none rounded-[16px] focus-visible:ring-2 focus-visible:ring-[#14724F] focus-visible:ring-offset-2 transition-all">
            <div className="h-full p-4 flex items-start gap-3 rounded-[16px] bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-[36px] h-[36px] rounded-[10px] bg-[#E5F5ED] text-[#14724F] flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-[14px] font-extrabold text-[#10241E] mb-1 leading-tight">Manage Topics</h2>
                <p className="text-[#5B6F67] text-[11px] leading-relaxed">Create, edit, and categorize subject areas and their subtopics.</p>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/questions" className="group focus-visible outline-none rounded-[16px] focus-visible:ring-2 focus-visible:ring-[#14724F] focus-visible:ring-offset-2 transition-all">
            <div className="h-full p-4 flex items-start gap-3 rounded-[16px] bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-[36px] h-[36px] rounded-[10px] bg-[#E5F5ED] text-[#14724F] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-[14px] font-extrabold text-[#10241E] mb-1 leading-tight">Manage Questions</h2>
                <p className="text-[#5B6F67] text-[11px] leading-relaxed">Add manual questions, view the database, and run filters.</p>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/review" className="group focus-visible outline-none rounded-[16px] focus-visible:ring-2 focus-visible:ring-[#14724F] focus-visible:ring-offset-2 transition-all">
            <div className="h-full p-4 flex items-start gap-3 rounded-[16px] bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-[36px] h-[36px] rounded-[10px] bg-[#E5F5ED] text-[#14724F] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-[14px] font-extrabold text-[#10241E] mb-1 leading-tight">Review Queue</h2>
                <p className="text-[#5B6F67] text-[11px] leading-relaxed">Review, edit, approve, or reject AI-generated questions.</p>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/ai" className="group focus-visible outline-none rounded-[16px] focus-visible:ring-2 focus-visible:ring-[#14724F] focus-visible:ring-offset-2 transition-all">
            <div className="h-full p-4 flex items-start gap-3 rounded-[16px] bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-[36px] h-[36px] rounded-[10px] bg-[#E5F5ED] text-[#14724F] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-[14px] font-extrabold text-[#10241E] mb-1 leading-tight">AI Generator</h2>
                <p className="text-[#5B6F67] text-[11px] leading-relaxed">Generate questions in bulk using the Gemini AI service.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
