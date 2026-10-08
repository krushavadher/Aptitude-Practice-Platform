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
import { Brain, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';
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
    <div className="flex-1 flex flex-col bg-glass-strong">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col p-4 sm:p-6 lg:p-8">
        
        {/* Header / Progress */}
        <div className="mb-8 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/topics')} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Exit
          </Button>
          <div className="flex-1">
            <ProgressBar value={currentIndex + 1} max={questions.length} label={`Question ${currentIndex + 1} of ${questions.length}`} />
          </div>
          <span className="text-sm font-medium text-secondary whitespace-nowrap">
            {currentIndex + 1} of {questions.length}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <QuestionCard 
            number={currentIndex + 1}
            total={questions.length}
            subtopic={currentQ.subtopic}
            difficulty={currentQ.difficulty}
            text={currentQ.text}
          />

          <OptionList 
            options={currentQ.options}
            selectedIndex={selectedIndex}
            onSelect={(idx) => {
              if (!isChecked) setSelectedIndex(idx);
            }}
            disabled={isChecked || checkMutation.isPending}
            result={checkedResult}
          />

          {isChecked && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <ExplanationPanel explanation={checkedResult.explanation} />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-end gap-4 pb-12">
          {!isChecked ? (
            <Button 
              size="lg"
              disabled={selectedIndex === null}
              isLoading={checkMutation.isPending}
              onClick={handleCheck}
            >
              Check Answer
            </Button>
          ) : (
            <Button 
              size="lg"
              rightIcon={currentIndex < questions.length - 1 ? <ArrowRight className="w-5 h-5" /> : null}
              onClick={handleNext}
              autoFocus
            >
              {currentIndex === questions.length - 1 ? 'Finish Practice' : 'Next Question'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
