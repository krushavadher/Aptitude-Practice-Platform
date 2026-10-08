import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { adminApi, aiApi } from '../../api';
import { GlassCard } from '../../components/common/GlassCard';
import { Input, Select } from '../../components/common/Form';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { useToast } from '../../components/common/Toast';
import { BrainCircuit, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { ErrorState } from '../../components/common/States';

const schema = z.object({
  topicId: z.string().min(1, 'Topic is required'),
  subtopic: z.string().min(1, 'Subtopic is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  count: z.number().int().min(1).max(10),
});

export default function AdminAi() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [results, setResults] = useState(null); // { generated: 5, failed: 0 }

  const { data: topics = [], isLoading: loadingTopics, isError, error, refetch } = useQuery({
    queryKey: ['admin', 'topics'],
    queryFn: adminApi.getTopics
  });

  const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      topicId: '',
      subtopic: '',
      difficulty: 'medium',
      count: 5
    }
  });

  const selectedTopicId = watch('topicId');
  const selectedTopic = topics.find(t => t._id === selectedTopicId);

  const mutation = useMutation({
    mutationFn: aiApi.generate,
    onSuccess: (data) => {
      setResults(data);
      toast({ type: 'success', message: 'Questions generated successfully!' });
      queryClient.invalidateQueries(['admin', 'stats']);
      queryClient.invalidateQueries(['admin', 'questions']);
    },
    onError: (err) => {
      toast({ type: 'error', message: err.message || 'Failed to generate questions' });
    }
  });

  const onSubmit = (data) => {
    setResults(null);
    mutation.mutate({
      ...data,
      verify: true
    });
  };

  if (loadingTopics) {
    return <div className="flex-1 flex justify-center p-12"><Loader size={48} /></div>;
  }

  if (isError) {
    return <ErrorState message={error.message} onRetry={refetch} className="m-8" />;
  }

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6 pb-24">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-accent" /> AI Question Generator
        </h1>
        <p className="text-secondary max-w-2xl">
          Use the power of Gemini to bulk-generate high-quality aptitude questions. 
          Generated questions are saved as drafts and must be reviewed before students can see them.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Select
              label="Topic"
              error={errors.topicId?.message}
              options={[{ label: 'Select a topic...', value: '' }, ...topics.map(t => ({ label: t.name, value: t._id }))]}
              {...register('topicId')}
            />

            <Select
              label="Subtopic"
              error={errors.subtopic?.message}
              options={[{ label: 'Select a subtopic...', value: '' }, ...(selectedTopic?.subtopics || []).map(s => ({ label: s, value: s }))]}
              disabled={!selectedTopic}
              {...register('subtopic')}
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Difficulty"
                error={errors.difficulty?.message}
                options={[
                  { label: 'Easy', value: 'easy' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Hard', value: 'hard' }
                ]}
                {...register('difficulty')}
              />
              <Input
                label="Count (1-10)"
                type="number"
                min="1"
                max="10"
                error={errors.count?.message}
                {...register('count', { valueAsNumber: true })}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg" 
              isLoading={mutation.isPending}
              leftIcon={<Sparkles className="w-5 h-5" />}
            >
              Generate Questions
            </Button>
          </form>
        </GlassCard>

        <div>
          {mutation.isPending ? (
            <GlassCard className="h-full flex flex-col items-center justify-center text-center p-8 border-accent border-opacity-30">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-accent bg-opacity-20 rounded-full animate-ping" />
                <div className="absolute inset-2 bg-glass-strong rounded-full flex items-center justify-center shadow-lg border border-accent border-opacity-30">
                  <BrainCircuit className="w-8 h-8 text-accent animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Gemini is thinking...</h3>
              <p className="text-secondary">Crafting tricky options and detailed explanations.</p>
            </GlassCard>
          ) : results ? (
            <GlassCard className="h-full border-success border-opacity-30 bg-success bg-opacity-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-success"></div>
              <div className="p-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-success bg-opacity-20 rounded-full flex items-center justify-center mb-4 text-success-text border border-success border-opacity-30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Generation Complete</h3>
                
                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                  <div className="p-4 rounded-xl surface-solid border border-glass-border">
                    <div className="text-3xl font-black text-primary">{results.savedDrafts?.length || 0}</div>
                    <div className="text-sm font-medium text-secondary">Successfully<br/>Drafted</div>
                  </div>
                  <div className="p-4 rounded-xl surface-solid border border-glass-border">
                    <div className="text-3xl font-black text-warning-text">{results.rejected?.length || 0}</div>
                    <div className="text-sm font-medium text-secondary">Failed<br/>Validation</div>
                  </div>
                </div>

                <Button 
                  variant="secondary" 
                  className="mt-8 w-full"
                  onClick={() => window.location.href = '/admin/review'}
                >
                  Go to Review Queue
                </Button>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60 border-dashed">
              <Sparkles className="w-12 h-12 text-secondary mb-4 opacity-50" />
              <h3 className="text-lg font-bold text-secondary mb-2">Ready to Generate</h3>
              <p className="text-sm text-secondary">
                Select your parameters on the left. The AI will generate structurally valid questions with exactly 4 options.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
