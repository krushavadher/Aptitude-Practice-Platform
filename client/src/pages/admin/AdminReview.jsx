import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi, topicApi } from '../../api';
import { GlassCard } from '../../components/common/GlassCard';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { useToast } from '../../components/common/Toast';
import { EmptyState, ErrorState } from '../../components/common/States';
import { QuestionCard } from '../../components/test/QuestionCard';
import { OptionList } from '../../components/test/OptionList';
import { ExplanationPanel } from '../../components/test/ExplanationPanel';
import { ClipboardCheck, ThumbsUp, ThumbsDown, SkipForward, AlertTriangle } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export default function AdminReview() {
  const queryClient = useQueryClient();
  const toast = useToast();
  
  // We fetch a batch of drafts
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin', 'questions', 'draft'],
    queryFn: () => adminApi.getQuestions({ status: 'draft', limit: '20' })
  });

  const { data: topics = [] } = useQuery({
    queryKey: ['topics'],
    queryFn: topicApi.list
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const reviewMutation = useMutation({
    mutationFn: ({ id, action }) => adminApi.reviewQuestion(id, { action }),
    onSuccess: (res, { action }) => {
      toast({ 
        type: action === 'approve' ? 'success' : 'error', 
        message: `Question ${action}d!` 
      });
      // Move to next
      setCurrentIndex(prev => prev + 1);
      // Invalidate stats
      queryClient.invalidateQueries(['admin', 'stats']);
    },
    onError: (err) => {
      toast({ type: 'error', message: err.message || 'Failed to review question' });
    }
  });

  if (isLoading) return <div className="flex-1 flex justify-center p-12"><Loader size={48} /></div>;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} className="m-8" />;

  const drafts = data?.questions || [];
  
  if (drafts.length === 0 || currentIndex >= drafts.length) {
    return (
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <EmptyState 
          icon={ClipboardCheck}
          title="Review Queue Empty"
          message="You've reviewed all drafted questions. Generate some more with AI!"
          action={<Button onClick={() => window.location.href = '/admin/ai'}>Go to AI Generator</Button>}
        />
      </div>
    );
  }

  const currentQ = drafts[currentIndex];
  const topicName = topics.find(t => t._id === currentQ.topicId)?.name || 'Unknown Topic';

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6 pb-24">
      <header className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-accent" /> Review Queue
          </h1>
          <p className="text-secondary">Approve or reject AI-generated drafts. ({drafts.length - currentIndex} remaining)</p>
        </div>
      </header>

      {currentQ.flagged && (
        <div className="bg-error bg-opacity-10 border border-error border-opacity-30 rounded-xl p-4 flex gap-3 text-error-text mb-6">
          <AlertTriangle className="w-6 h-6 flex-shrink-0" />
          <div>
            <h3 className="font-bold mb-1">Validation Flag</h3>
            <p className="text-sm opacity-90">{currentQ.aiFlagReason || 'This question was flagged during generation for quality issues.'}</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          <GlassCard className="p-0 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="accent">{topicName}</Badge>
                {currentQ.subtopic && <Badge variant="neutral">{currentQ.subtopic}</Badge>}
                <Badge variant={currentQ.difficulty === 'hard' ? 'error' : currentQ.difficulty === 'medium' ? 'warning' : 'success'}>
                  {currentQ.difficulty}
                </Badge>
              </div>

              <QuestionCard 
                text={currentQ.text}
                number={currentIndex + 1}
                total={drafts.length}
              />
              
              <div className="mt-8">
                <OptionList 
                  options={currentQ.options}
                  selectedIndex={currentQ.correctIndex}
                  disabled={true}
                  result={{ isCorrect: true, correctIndex: currentQ.correctIndex }}
                />
              </div>
              
              <div className="mt-8">
                <ExplanationPanel explanation={currentQ.explanation} />
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="flex flex-col gap-4">
          <GlassCard className="sticky top-24">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">Review Actions</h3>
            
            <div className="space-y-3">
              <Button 
                className="w-full h-12 bg-success hover:bg-opacity-90 text-success-text"
                leftIcon={<ThumbsUp className="w-5 h-5" />}
                isLoading={reviewMutation.isPending && reviewMutation.variables?.action === 'approve'}
                disabled={reviewMutation.isPending}
                onClick={() => reviewMutation.mutate({ id: currentQ._id, action: 'approve' })}
              >
                Approve
              </Button>
              
              <Button 
                variant="ghost"
                className="w-full h-12 border border-error border-opacity-30 text-error-text hover:bg-error hover:bg-opacity-10"
                leftIcon={<ThumbsDown className="w-5 h-5" />}
                isLoading={reviewMutation.isPending && reviewMutation.variables?.action === 'reject'}
                disabled={reviewMutation.isPending}
                onClick={() => reviewMutation.mutate({ id: currentQ._id, action: 'reject' })}
              >
                Reject
              </Button>

              <div className="my-4 h-px bg-glass-border w-full"></div>

              <Button 
                variant="secondary"
                className="w-full"
                leftIcon={<SkipForward className="w-4 h-4" />}
                disabled={reviewMutation.isPending}
                onClick={() => setCurrentIndex(prev => prev + 1)}
              >
                Skip for now
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
