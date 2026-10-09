import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { practiceApi } from '../../api';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Loader } from '../../components/common/Loader';
import { EmptyState, ErrorState } from '../../components/common/States';
import { QuestionCard } from '../../components/test/QuestionCard';
import { OptionList } from '../../components/test/OptionList';
import { ExplanationPanel } from '../../components/test/ExplanationPanel';
import { Brain, Trophy, ArrowRight, ArrowLeft, Flag, Check, X } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

export default function Practice() {
  const { topicId } = useParams();
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get('difficulty') || 'any';
  const limit = searchParams.get('limit') || '10';
  const navigate = useNavigate();
  const toast = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [checkedResult, setCheckedResult] = useState(null); // { isCorrect, correctIndex, explanation }
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);

  const { data: questions, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['practice', topicId, difficulty, limit],
    queryFn: () => {
      const params = { limit };
      if (difficulty !== 'any') params.difficulty = difficulty;
      return practiceApi.getQuestions(topicId, params);
    },
    staleTime: 0 // Always fetch fresh questions for practice
  });

  const checkMutation = useMutation({
    mutationFn: practiceApi.check,
    onSuccess: (data) => {
      setCheckedResult(data);
      if (data.isCorrect) setCorrectCount(prev => prev + 1);
    },
    onError: (err) => {
      toast({ type: 'error', message: err.message || 'Failed to check answer' });
    }
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <Loader size={48} />
        <p className="mt-4 text-secondary">Loading questions...</p>
      </div>
    );
  }

  if (isError) {
    return <ErrorState message={error.message} onRetry={refetch} className="max-w-2xl mx-auto mt-12" />;
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-4">
        <EmptyState 
          icon={Brain}
          title="No questions found"
          description="We don't have enough questions matching this difficulty for this topic."
          action={<Button onClick={() => navigate('/topics')}>Choose Another Topic</Button>}
        />
      </div>
    );
  }

  if (isFinished) {
    const accuracy = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="glass-strong rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-2">Practice Complete!</h2>
          <p className="text-secondary mb-8">You finished the practice session.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="surface-solid p-4 rounded-xl border border-glass-border">
              <div className="text-sm text-secondary mb-1">Score</div>
              <div className="text-3xl font-bold text-primary tabular-nums">{correctCount}/{questions.length}</div>
            </div>
            <div className="surface-solid p-4 rounded-xl border border-glass-border">
              <div className="text-sm text-secondary mb-1">Accuracy</div>
              <div className="text-3xl font-bold text-primary tabular-nums">{accuracy}%</div>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full" onClick={() => window.location.reload()}>
              Practice Again
            </Button>
            <Button variant="secondary" className="w-full" onClick={() => navigate(`/test/setup?topicId=${topicId}`)}>
              Try a Test on this Topic
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => navigate('/topics')}>
              Choose Another Topic
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isChecked = !!checkedResult;

  const handleCheck = () => {
    if (selectedIndex === null) return;
    checkMutation.mutate({
      questionId: currentQ._id,
      selectedIndex
    });
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedIndex(null);
      setCheckedResult(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="max-w-[760px] mx-auto w-full flex-1 flex flex-col px-6 pt-4 pb-[100px] space-y-4">
        
        {/* Header / Progress */}
        <div className="flex items-center justify-between mt-2">
          <button onClick={() => navigate('/topics')} className="flex items-center gap-2 h-10 px-3 -ml-3 text-[color:var(--text-muted)] hover:text-[color:var(--text)] transition-colors rounded-lg font-medium">
            <ArrowLeft className="w-5 h-5" /> Exit
          </button>
          
          <div className="flex-1 max-w-[200px] mx-4">
            <div className="h-2 w-full bg-[color:var(--primary-soft)] rounded-full overflow-hidden">
              <div className="h-full bg-[color:var(--primary)] transition-all duration-300" style={{ width: `${Math.max(4, ((currentIndex) / questions.length) * 100)}%` }} />
            </div>
          </div>
          
          <div className="text-[14px] text-[color:var(--text-muted)] tabular-nums font-medium">
            {currentIndex + 1} of {questions.length}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[color:var(--surface-strong)] rounded-[20px] p-6 border border-[color:var(--border-subtle)] shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-[12px] uppercase tracking-[0.08em] text-[color:var(--text-muted)] font-semibold">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="flex items-center gap-2">
              {currentQ.subtopic && (
                <span className="h-[28px] px-3 bg-[color:var(--primary-soft)] text-[color:var(--primary)] text-[12px] font-semibold rounded-full flex items-center">
                  {currentQ.subtopic}
                </span>
              )}
              <span className={`h-[28px] px-3 text-[12px] font-semibold rounded-full flex items-center ${
                currentQ.difficulty === 'Easy' ? 'bg-[color:var(--primary-soft)] text-[color:var(--primary)]' :
                currentQ.difficulty === 'Hard' ? 'bg-[color:var(--danger-soft)] text-[color:var(--danger)]' :
                'bg-[color:var(--teal-soft)] text-[color:var(--teal)]'
              }`}>
                {currentQ.difficulty || 'Medium'}
              </span>
              <button 
                onClick={() => setIsFlagged(!isFlagged)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ml-1 ${isFlagged ? 'bg-[color:var(--teal-soft)] text-[color:var(--teal)]' : 'text-[color:var(--text-muted)] hover:bg-[color:var(--surface)] hover:text-[color:var(--text)]'}`}
              >
                <Flag className={`w-4 h-4 ${isFlagged ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
          <h2 className="text-[17px] leading-snug font-medium text-[color:var(--text)] mt-3">
            {currentQ.text}
          </h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrectOption = isChecked && idx === checkedResult.correctIndex;
            const isWrongSelected = isChecked && isSelected && !checkedResult.isCorrect;
            const letter = String.fromCharCode(65 + idx);
            
            let btnClass = "w-full text-left min-h-[44px] py-2 px-3 rounded-[12px] border backdrop-blur-[14px] flex items-center gap-3 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--primary)]";
            let letterClass = "w-[28px] h-[28px] text-[14px] rounded-[8px] font-semibold flex items-center justify-center transition-colors shrink-0";
            let icon = null;

            if (!isChecked) {
              if (isSelected) {
                btnClass += " bg-[color:var(--primary-soft)] border-[1.5px] border-[color:var(--primary)]";
                letterClass += " bg-[color:var(--primary)] text-white";
              } else {
                btnClass += " bg-[color:var(--surface)] border-[color:var(--border-subtle)] hover:bg-[color:var(--surface-strong)] hover:border-[color:var(--primary)]/35";
                letterClass += " bg-[color:var(--surface-strong)] text-[color:var(--text-muted)]";
              }
            } else {
              if (isCorrectOption) {
                btnClass += " bg-[color:var(--primary-soft)] border-[1.5px] border-[color:var(--primary)]";
                letterClass += " bg-[color:var(--primary)] text-white";
                icon = <Check className="w-5 h-5 text-[color:var(--primary)] ml-auto shrink-0" />;
              } else if (isWrongSelected) {
                btnClass += " bg-[color:var(--danger-soft)] border-[1.5px] border-[color:var(--danger)]";
                letterClass += " bg-[color:var(--danger)] text-white";
                icon = <X className="w-5 h-5 text-[color:var(--danger)] ml-auto shrink-0" />;
              } else {
                btnClass += " bg-[color:var(--surface)] border-[color:var(--border-subtle)] opacity-60 pointer-events-none";
                letterClass += " bg-[color:var(--surface-strong)] text-[color:var(--text-muted)]";
              }
            }

            return (
              <button 
                key={idx}
                onClick={() => !isChecked && setSelectedIndex(idx)}
                disabled={isChecked || checkMutation.isPending}
                className={btnClass}
              >
                <div className={letterClass}>{letter}</div>
                <span className="text-[15px] leading-snug text-[color:var(--text)]">{option}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {/* Explanation Panel */}
        {isChecked && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-200 bg-[color:var(--surface-strong)] border border-[color:var(--border-subtle)] rounded-[16px] p-6 mt-6">
            <div className={`flex items-center gap-2 font-semibold ${checkedResult.isCorrect ? 'text-[color:var(--primary)]' : 'text-[color:var(--danger)]'}`}>
              {checkedResult.isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
              {checkedResult.isCorrect ? 'Correct' : 'Incorrect'}
            </div>
            <p className="text-[15px] leading-[1.6] text-[color:var(--text)] mt-2">
              {checkedResult.explanation}
            </p>
            {!checkedResult.isCorrect && (
              <div className="text-[color:var(--text-muted)] mt-4 text-[14px]">
                Correct answer: {String.fromCharCode(65 + checkedResult.correctIndex)}. {currentQ.options[checkedResult.correctIndex]}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full z-20 bg-[color:var(--surface-strong)] backdrop-blur-[14px] border-t border-[color:var(--border-subtle)]">
        <div className="max-w-[760px] mx-auto w-full px-6 py-4 flex items-center justify-between">
          <button 
            onClick={handleNext} 
            disabled={checkMutation.isPending}
            className="h-[48px] px-4 font-semibold text-[color:var(--text-muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--surface)] rounded-xl transition-colors -ml-4"
          >
            Skip
          </button>

          {!isChecked ? (
            <button
              onClick={handleCheck}
              disabled={selectedIndex === null || checkMutation.isPending}
              className={`h-[48px] min-w-[160px] rounded-[12px] font-semibold text-white transition-colors flex items-center justify-center ${
                selectedIndex === null 
                  ? 'bg-[color:var(--primary)] opacity-40 cursor-not-allowed' 
                  : 'bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)]'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              autoFocus
              className="h-[48px] min-w-[160px] px-6 rounded-[12px] bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] font-semibold text-white transition-colors flex items-center justify-center gap-2"
            >
              {currentIndex === questions.length - 1 ? 'Finish Practice' : 'Next Question'}
              {currentIndex < questions.length - 1 && <ArrowRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
