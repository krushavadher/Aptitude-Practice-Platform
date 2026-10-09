import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { testApi } from '../../api';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Loader, Skeleton } from '../../components/common/Loader';
import { ErrorState } from '../../components/common/States';
import { QuestionCard } from '../../components/test/QuestionCard';
import { OptionList } from '../../components/test/OptionList';
import { ExplanationPanel } from '../../components/test/ExplanationPanel';
import { CheckCircle, XCircle, Flag, Minus, ChevronDown, ChevronUp, RefreshCw, BookOpen, LayoutDashboard } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function TestResult() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const ephemeralFlags = new Set(location.state?.flags || []);
  
  const [filter, setFilter] = useState('All'); // All, Incorrect, Unanswered, Flagged
  const [expandedId, setExpandedId] = useState(null);
  
  const [themeColors, setThemeColors] = useState({
    success: '#10B981',
    error: '#EF4444',
    neutral: '#94A3B8'
  });

  useEffect(() => {
    // Read theme colors for Recharts
    const style = getComputedStyle(document.documentElement);
    setThemeColors({
      success: style.getPropertyValue('--primary').trim() || '#14724F',
      error: style.getPropertyValue('--danger').trim() || '#E5675A',
      neutral: style.getPropertyValue('--border-subtle').trim() || 'rgba(11, 93, 59, 0.12)'
    });
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['testResult', testId],
    queryFn: () => testApi.result(testId),
    retry: false
  });

  if (isLoading) return <div className="p-8 max-w-5xl mx-auto space-y-4"><Skeleton variant="card" className="h-48" /><Skeleton variant="card" className="h-64" /></div>;

  if (error) {
    if (error.status === 400) {
      // Not submitted yet
      navigate(`/test/${testId}`, { replace: true });
      return null;
    }
    return <ErrorState message={error.message || 'Failed to load test results'} className="max-w-2xl mx-auto mt-12" />;
  }

  const { test, attempt, questions } = data;

  if (!questions || questions.length === 0) {
    return <ErrorState message="This test contains no questions." className="max-w-2xl mx-auto mt-12" />;
  }

  const correctCount = attempt.score;
  const totalCount = attempt.total;
  const accuracy = attempt.accuracy;
  
  // Calculate stats
  const answersMap = attempt.answers.reduce((acc, ans) => {
    acc[ans.questionId] = ans;
    return acc;
  }, {});

  const incorrectCount = attempt.answers.filter(a => !a.isCorrect).length;
  const unansweredCount = totalCount - (correctCount + incorrectCount);
  const flaggedCount = ephemeralFlags.size;

  const chartData = [
    { name: 'Correct', value: correctCount, color: themeColors.success },
    { name: 'Incorrect', value: incorrectCount, color: themeColors.error },
    { name: 'Unanswered', value: unansweredCount, color: themeColors.neutral }
  ].filter(d => d.value > 0);

  // Format time
  const mins = Math.floor(attempt.timeTakenSec / 60);
  const secs = attempt.timeTakenSec % 60;
  const formattedTime = `${mins}m ${secs}s`;

  const filteredQuestions = questions.filter(q => {
    const ans = answersMap[q._id];
    if (filter === 'Incorrect') return ans && !ans.isCorrect;
    if (filter === 'Unanswered') return !ans;
    if (filter === 'Flagged') return ephemeralFlags.has(q._id);
    return true; // All
  });

  return (
    <div className="flex-1 max-w-[760px] mx-auto w-full px-4 sm:px-6 pt-4 pb-24 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-primary mb-2">Test Results</h1>
        <p className="text-secondary">Review your performance and explanations.</p>
      </header>

      {/* Summary Card */}
      <GlassCard className="grid md:grid-cols-[1fr_auto] gap-8 items-center relative overflow-hidden p-6 md:p-8">
        {/* Left Side */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-[120px] h-[120px] transform -rotate-90">
                <circle className="text-[color:var(--primary-soft)]" strokeWidth="10" stroke="currentColor" fill="transparent" r="50" cx="60" cy="60" />
                <circle
                  className="text-[color:var(--primary)] transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 50}
                  strokeDashoffset={2 * Math.PI * 50 - (accuracy / 100) * 2 * Math.PI * 50}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="50" cx="60" cy="60"
                />
              </svg>
              <div className="absolute flex items-center justify-center text-3xl font-bold text-primary tabular-nums">
                {Math.round(accuracy)}%
              </div>
            </div>
            
            <div>
              <div className="text-sm text-secondary tracking-widest font-bold mb-1">SCORE</div>
              <div className="text-5xl font-extrabold text-primary tabular-nums">
                {correctCount} <span className="text-3xl text-primary opacity-50">/ {totalCount}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <div className="px-3 py-1 rounded-full text-xs font-bold bg-[color:var(--primary-soft)] text-[color:var(--primary)] uppercase tracking-widest">Time: {formattedTime}</div>
            {test.topicId && <div className="px-3 py-1 rounded-full text-xs font-bold bg-[color:var(--primary-soft)] text-[color:var(--primary)] uppercase tracking-widest">Targeted Topic</div>}
          </div>
          
          <div className="bg-[color:var(--teal-soft)] text-[color:var(--teal)] rounded-xl px-4 py-3 flex items-center gap-3 w-fit">
            {accuracy >= 70 ? (
              <><CheckCircle className="w-5 h-5 flex-shrink-0" /> <span className="font-bold text-sm">Great job! You scored above average.</span></>
            ) : (
              <><BookOpen className="w-5 h-5 flex-shrink-0" /> <span className="font-bold text-sm">Keep practicing. Review the explanations below.</span></>
            )}
          </div>
        </div>

        {/* Right Side: Chart */}
        <div className="flex flex-col items-center gap-4 border-t md:border-t-0 md:border-l border-glass-border pt-6 md:pt-0 md:pl-8">
          <div className="relative w-[160px] h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={66}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-primary tabular-nums">{totalCount}</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-secondary">Questions</div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex flex-col gap-1.5 w-full mt-2">
            {chartData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-secondary font-medium">{entry.name}</span>
                </div>
                <span className="font-bold text-primary">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard padding="p-4" className="flex items-center gap-4 !rounded-2xl">
          <div className="w-[44px] h-[44px] rounded-xl bg-[color:var(--primary-soft)] flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-[color:var(--primary)]" />
          </div>
          <div>
            <div className="text-2xl font-bold tabular-nums text-[color:var(--text)] leading-none mb-1">{correctCount}</div>
            <div className="text-sm text-[color:var(--text-muted)]">Correct</div>
          </div>
        </GlassCard>
        <GlassCard padding="p-4" className="flex items-center gap-4 !rounded-2xl">
          <div className="w-[44px] h-[44px] rounded-xl bg-[color:var(--danger-soft)] flex items-center justify-center flex-shrink-0">
            <XCircle className="w-5 h-5 text-[color:var(--danger)]" />
          </div>
          <div>
            <div className="text-2xl font-bold tabular-nums text-[color:var(--text)] leading-none mb-1">{incorrectCount}</div>
            <div className="text-sm text-[color:var(--text-muted)]">Incorrect</div>
          </div>
        </GlassCard>
        <GlassCard padding="p-4" className="flex items-center gap-4 !rounded-2xl">
          <div className="w-[44px] h-[44px] rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--glass-bg)] flex items-center justify-center flex-shrink-0">
            <Minus className="w-5 h-5 text-[color:var(--text-muted)]" />
          </div>
          <div>
            <div className="text-2xl font-bold tabular-nums text-[color:var(--text)] leading-none mb-1">{unansweredCount}</div>
            <div className="text-sm text-[color:var(--text-muted)]">Unanswered</div>
          </div>
        </GlassCard>
        <GlassCard padding="p-4" className="flex items-center gap-4 !rounded-2xl">
          <div className="w-[44px] h-[44px] rounded-xl bg-[color:var(--teal-soft)] flex items-center justify-center flex-shrink-0">
            <Flag className="w-5 h-5 text-[color:var(--teal)]" />
          </div>
          <div>
            <div className="text-2xl font-bold tabular-nums text-[color:var(--text)] leading-none mb-1">{flaggedCount}</div>
            <div className="text-sm text-[color:var(--text-muted)]">Flagged</div>
          </div>
        </GlassCard>
      </div>

      {/* Question Review */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-glass-border pb-4">
          <h2 className="text-xl font-bold text-primary">Question Review</h2>
          <div className="flex flex-wrap gap-2">
            {['All', 'Incorrect', 'Unanswered', 'Flagged'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm transition-colors focus-visible outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)] border ${
                  filter === f 
                    ? 'bg-[color:var(--primary)] text-white font-semibold border-transparent' 
                    : 'bg-[color:var(--surface-strong)] text-[color:var(--text-muted)] border-[color:var(--border-subtle)] hover:text-[color:var(--primary)] hover:border-[color:var(--primary)] font-medium'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center p-8 text-secondary">No questions match this filter.</div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const ans = answersMap[q._id];
              const isExpanded = expandedId === q._id;
              const isFlagged = ephemeralFlags.has(q._id);
              
              let statusIcon = <Minus className="w-4 h-4 text-[color:var(--text-muted)]" />;
              let statusText = 'Unanswered';
              let badgeBg = 'bg-[color:var(--border-subtle)]';
              let badgeText = 'text-[color:var(--text-muted)]';
              
              if (ans) {
                if (ans.isCorrect) {
                  statusIcon = <CheckCircle className="w-4 h-4 text-[color:var(--primary)]" />;
                  statusText = 'Correct';
                  badgeBg = 'bg-[color:var(--primary-soft)]';
                  badgeText = 'text-[color:var(--primary)]';
                } else {
                  statusIcon = <XCircle className="w-4 h-4 text-[color:var(--danger)]" />;
                  statusText = 'Incorrect';
                  badgeBg = 'bg-[color:var(--danger-soft)]';
                  badgeText = 'text-[color:var(--danger)]';
                }
              } else if (isFlagged) {
                 statusIcon = <Flag className="w-4 h-4 text-[color:var(--teal)]" />;
                 statusText = 'Flagged';
                 badgeBg = 'bg-[color:var(--teal-soft)]';
                 badgeText = 'text-[color:var(--teal)]';
              }

              // Create pseudo-result object for OptionList
              const pseudoResult = {
                isCorrect: ans ? ans.isCorrect : false,
                correctIndex: q.correctIndex
              };

              return (
                <div key={q._id} className="bg-[color:var(--surface)] border border-[color:var(--border)] rounded-[14px] overflow-hidden transition-all duration-200 group hover:bg-[color:var(--surface-strong)] hover:border-[color:var(--primary)]/30">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q._id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between p-4 focus-visible outline-none text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1.5 w-[110px] px-2.5 py-1 rounded-lg ${badgeBg}`}>
                        {statusIcon}
                        <span className={`text-xs font-bold uppercase tracking-wider ${badgeText}`}>{statusText}</span>
                      </div>
                      <span className="font-bold text-[color:var(--text)]">Question {idx + 1}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-[color:var(--text-muted)]" /> : <ChevronDown className="w-5 h-5 text-[color:var(--text-muted)]" />}
                  </button>

                  {isExpanded && (
                    <div className="p-4 sm:p-6 border-t border-[color:var(--border)] bg-[color:var(--surface-strong)]">
                      <QuestionCard 
                        number={idx + 1}
                        subtopic={q.subtopic}
                        difficulty={q.difficulty}
                        text={q.text}
                      />
                      <OptionList 
                        options={q.options}
                        selectedIndex={ans ? ans.selectedIndex : null}
                        onSelect={() => {}} // view only
                        disabled={true}
                        result={pseudoResult}
                      />
                      <ExplanationPanel explanation={q.explanation} />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-8 border-t border-[color:var(--border)]">
        <button className="h-[44px] px-6 rounded-xl bg-[color:var(--primary)] text-white font-bold flex items-center gap-2 transition-opacity hover:opacity-90" onClick={() => navigate('/test/setup')}>
          <RefreshCw className="w-4 h-4" /> Retake similar test
        </button>
        {test.topicId && (
          <button className="h-[44px] px-6 rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] text-[color:var(--primary)] font-bold flex items-center gap-2 transition-colors hover:bg-[color:var(--surface-strong)]" onClick={() => navigate(`/practice/${test.topicId}`)}>
            <BookOpen className="w-4 h-4" /> Practice this topic
          </button>
        )}
        <button className="h-[44px] px-6 rounded-xl bg-[color:var(--surface)] border border-[color:var(--border)] text-[color:var(--primary)] font-bold flex items-center gap-2 transition-colors hover:bg-[color:var(--surface-strong)]" onClick={() => navigate('/dashboard')}>
          <LayoutDashboard className="w-4 h-4" /> Back to dashboard
        </button>
      </div>
    </div>
  );
}
