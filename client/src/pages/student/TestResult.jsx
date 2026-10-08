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
      success: style.getPropertyValue('--success').trim() || '#10B981',
      error: style.getPropertyValue('--error').trim() || '#EF4444',
      neutral: style.getPropertyValue('--text-secondary').trim() || '#94A3B8'
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
    <div className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8 pb-24">
      <header>
        <h1 className="text-3xl font-bold text-primary mb-2">Test Results</h1>
        <p className="text-secondary">Review your performance and explanations.</p>
      </header>

      {/* Summary Card */}
      <GlassCard className="grid md:grid-cols-2 gap-8 items-center relative overflow-hidden">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full border-8 border-glass-border flex items-center justify-center bg-glass shadow-inner">
              <span className="text-2xl font-bold tabular text-primary">{Math.round(accuracy)}%</span>
            </div>
            <div>
              <div className="text-sm text-secondary uppercase tracking-wider font-semibold mb-1">Score</div>
              <div className="text-4xl font-extrabold text-primary tabular-nums">
                {correctCount} <span className="text-xl text-secondary font-medium">/ {totalCount}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="accent">Time: {formattedTime}</Badge>
            {test.difficulty && <Badge variant="neutral">Difficulty: {test.difficulty}</Badge>}
            {test.topicId && <Badge variant="neutral">Targeted Topic</Badge>}
          </div>

          <p className="text-lg font-medium text-primary flex items-center gap-2">
            {accuracy >= 70 ? (
              <><CheckCircle className="w-5 h-5 text-success-text" /> Great job! You scored above average.</>
            ) : (
              <><BookOpen className="w-5 h-5 text-warning-text" /> Keep practicing. Review the explanations below.</>
            )}
          </p>
        </div>

        {/* Chart */}
        <div className="h-64 relative">
          {/* Accessible text alternative */}
          <div className="sr-only">
            Chart breakdown: {correctCount} correct, {incorrectCount} incorrect, {unansweredCount} unanswered.
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--glass-bg-strong)', borderColor: 'var(--glass-border)', borderRadius: '0.5rem', color: 'var(--text-primary)' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: 'var(--text-primary)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success bg-opacity-10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="text-xl font-bold tabular-nums text-success-text">{correctCount}</div>
            <div className="text-sm font-medium text-secondary">Correct</div>
          </div>
        </GlassCard>
        <GlassCard padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-error bg-opacity-10 flex items-center justify-center">
            <XCircle className="w-5 h-5 text-error" />
          </div>
          <div>
            <div className="text-xl font-bold tabular-nums text-error-text">{incorrectCount}</div>
            <div className="text-sm font-medium text-secondary">Incorrect</div>
          </div>
        </GlassCard>
        <GlassCard padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-glass-strong border border-glass-border flex items-center justify-center">
            <Minus className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <div className="text-xl font-bold tabular-nums text-primary">{unansweredCount}</div>
            <div className="text-sm font-medium text-secondary">Unanswered</div>
          </div>
        </GlassCard>
        <GlassCard padding="p-4" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-warning bg-opacity-10 flex items-center justify-center">
            <Flag className="w-5 h-5 text-warning" />
          </div>
          <div>
            <div className="text-xl font-bold tabular-nums text-warning-text">{flaggedCount}</div>
            <div className="text-sm font-medium text-secondary">Flagged</div>
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
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent ${
                  filter === f ? 'bg-accent text-on-accent' : 'bg-glass text-secondary hover:text-primary'
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
              
              let statusIcon = <Minus className="w-5 h-5 text-secondary" />;
              let statusText = 'Unanswered';
              if (ans) {
                if (ans.isCorrect) {
                  statusIcon = <CheckCircle className="w-5 h-5 text-success" />;
                  statusText = 'Correct';
                } else {
                  statusIcon = <XCircle className="w-5 h-5 text-error" />;
                  statusText = 'Incorrect';
                }
              }

              // Create pseudo-result object for OptionList
              const pseudoResult = {
                isCorrect: ans ? ans.isCorrect : false,
                correctIndex: q.correctIndex
              };

              return (
                <div key={q._id} className="surface-solid rounded-xl border border-glass-border overflow-hidden">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q._id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between p-4 focus-visible hover:bg-glass-strong transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 w-32">
                        {statusIcon}
                        <span className="text-sm font-medium text-primary">{statusText}</span>
                      </div>
                      <span className="font-medium text-primary">Question {idx + 1}</span>
                      {isFlagged && <Flag className="w-4 h-4 text-warning-text" aria-label="Flagged" />}
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
                  </button>

                  {isExpanded && (
                    <div className="p-4 sm:p-6 border-t border-glass-border bg-glass-strong">
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
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-glass-border">
        <Button variant="primary" onClick={() => navigate('/test/setup')} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Retake similar test
        </Button>
        {test.topicId && (
          <Button variant="secondary" onClick={() => navigate(`/practice/${test.topicId}`)} leftIcon={<BookOpen className="w-4 h-4" />}>
            Practice this topic
          </Button>
        )}
        <Button variant="ghost" onClick={() => navigate('/dashboard')} leftIcon={<LayoutDashboard className="w-4 h-4" />}>
          Back to dashboard
        </Button>
      </div>
    </div>
  );
}
