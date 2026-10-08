import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { meApi } from '../../api';
import { GlassCard } from '../../components/common/GlassCard';
import { Loader } from '../../components/common/Loader';
import { ErrorState, EmptyState } from '../../components/common/States';
import { ArrowRight, History as HistoryIcon, Clock, BookOpen, CheckCircle } from 'lucide-react';

export default function History() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 8; // Image shows 8 rows

  const { data: historyData, isLoading: historyLoading, error: historyError } = useQuery({
    queryKey: ['myAttempts', page, limit],
    queryFn: () => meApi.attempts({ page, limit }),
    keepPreviousData: true
  });

  const { data: statsData } = useQuery({
    queryKey: ['myStats'],
    queryFn: meApi.stats
  });

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (historyLoading && !historyData) return <div className="flex-1 flex justify-center p-12"><Loader size={48} /></div>;
  if (historyError) return <ErrorState message={`Failed to load history: ${historyError?.response?.data?.message || historyError.message || 'Unknown error'}`} className="mt-12" />;

  const { attempts = [], total = 0, pages = 1 } = historyData || {};
  const overallAccuracy = statsData?.overallAccuracy || 0;

  const getAccColor = (acc) => {
    if (acc >= 90) return 'bg-[#10B981]/20 text-[#059669] border-[#10B981]/30'; // Green
    if (acc >= 80) return 'bg-[#06B6D4]/20 text-[#0891B2] border-[#06B6D4]/30'; // Blue
    if (acc >= 70) return 'bg-[#8B5CF6]/20 text-[#6D28D9] border-[#8B5CF6]/30'; // Purple
    return 'bg-[#F59E0B]/20 text-[#D97706] border-[#F59E0B]/30'; // Orange
  };

  const formatDateTime = (dateString) => {
    const d = new Date(dateString);
    const now = new Date();
    
    // Date part
    let datePart = '';
    const isToday = d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    const isYesterday = d.getDate() === now.getDate() - 1 && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    
    if (isToday) datePart = 'Today';
    else if (isYesterday) datePart = 'Yesterday';
    else datePart = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Time part
    const timePart = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    return { datePart, timePart };
  };

  return (
    <div className="flex-1 max-w-[1400px] mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6 pb-24">
      
      {/* Banner */}
      <GlassCard className="relative overflow-hidden border-none shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-[#06B6D4]/10 to-transparent opacity-60"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-accent uppercase mb-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              Academic Telemetry - Evaluation Archive
            </div>
            <h1 className="text-4xl font-extrabold text-primary mb-2">Attempt History</h1>
            <p className="text-secondary text-sm">Review your past practice sessions, timed evaluations, and module performance.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Total Attempts Metric */}
            <div className="flex items-center gap-3 bg-glass px-5 py-3 rounded-xl border border-glass-border shadow-sm">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <HistoryIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none mb-1">Total Attempts</div>
                <div className="text-xl font-black text-primary leading-none">{statsData?.totalTests || total}</div>
              </div>
            </div>

            {/* Average Accuracy Metric */}
            <div className="flex items-center gap-3 bg-glass px-5 py-3 rounded-xl border border-glass-border shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none mb-1">Average Accuracy</div>
                <div className="text-xl font-black text-primary leading-none">{overallAccuracy}%</div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {total === 0 ? (
        <EmptyState 
          icon={HistoryIcon}
          title="No history found"
          message="You haven't taken any tests yet. Your results will appear here once you complete a practice session or timed test."
        />
      ) : (
        <GlassCard className="overflow-hidden p-0 border-none shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="bg-[#F8FAFC] dark:bg-white/5 border-b border-glass-border">
                <tr>
                  <th className="p-5 text-xs font-bold text-secondary uppercase tracking-widest w-[35%]">Test / Module</th>
                  <th className="p-5 text-xs font-bold text-secondary uppercase tracking-widest">Format</th>
                  <th className="p-5 text-xs font-bold text-secondary uppercase tracking-widest">Completed</th>
                  <th className="p-5 text-xs font-bold text-secondary uppercase tracking-widest text-center">Score</th>
                  <th className="p-5 text-xs font-bold text-secondary uppercase tracking-widest text-center">Accuracy</th>
                  <th className="p-5 text-xs font-bold text-secondary uppercase tracking-widest">Duration</th>
                  <th className="p-5 text-xs font-bold text-secondary uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-border/50">
                {attempts.map(a => {
                  const topicName = (a.topicId && a.topicId.name) ? a.topicId.name : 'Full Benchmark Evaluation';
                  const catString = (a.topicId && a.topicId.category) ? a.topicId.category : 'GEN';
                  const subId = String(catString).substring(0, 4).toUpperCase() + '-' + String(a._id || '0000').substring(String(a._id || '0000').length - 4).toUpperCase();
                  const { datePart, timePart } = formatDateTime(a.submittedAt || new Date());
                  const acc = a.total > 0 ? Math.round((a.score / a.total) * 100) : 0;
                  const isPractice = a.total < 20; // Heuristic for format since DB doesn't have it natively
                  
                  return (
                    <tr key={a._id} className="hover:bg-glass transition-colors group">
                      <td className="p-5">
                        <div className="font-bold text-primary mb-1">{topicName}</div>
                        <div className="text-[10px] text-secondary font-medium tracking-wider uppercase">{subId}</div>
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded border whitespace-nowrap ${isPractice ? 'text-[#0891B2] bg-[#06B6D4]/10 border-[#06B6D4]/20' : 'text-accent bg-accent/10 border-accent/20'}`}>
                          {isPractice ? <BookOpen className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {isPractice ? 'Practice Session' : 'Timed Test'}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="font-semibold text-primary text-sm">{datePart}</div>
                        <div className="text-[10px] text-secondary font-medium">{timePart}</div>
                      </td>
                      <td className="p-5 text-center font-black tabular-nums text-primary text-sm">
                        {a.score} <span className="text-secondary font-medium text-xs">/ {a.total}</span>
                      </td>
                      <td className="p-5 text-center">
                        <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded border tabular-nums ${getAccColor(acc)}`}>
                          {acc.toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-5 text-secondary tabular-nums text-xs font-bold">
                        {Math.floor(a.timeTakenSec / 60)}m {a.timeTakenSec % 60}s
                      </td>
                      <td className="p-5 text-right">
                        <Link 
                          to={`/results/${a.testId}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent/5 hover:bg-accent/15 text-accent text-[11px] font-bold rounded-lg transition-colors border border-accent/10"
                        >
                          Review Answers <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Custom Pagination Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 bg-[#F8FAFC] dark:bg-white/5 border-t border-glass-border gap-4">
            <div className="text-xs font-medium text-secondary">
              Showing <span className="font-bold text-primary">{((page - 1) * limit) + 1}</span>-
              <span className="font-bold text-primary">{Math.min(page * limit, total)}</span> of <span className="font-bold text-primary">{total}</span> attempts
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className="text-xs font-bold text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                &lt; Previous
              </button>
              
              <div className="text-xs font-bold text-primary">
                Page {page} of {pages}
              </div>
              
              <button 
                disabled={page >= pages}
                onClick={() => handlePageChange(page + 1)}
                className="text-xs font-bold text-primary hover:text-accent disabled:text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next &gt;
              </button>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
