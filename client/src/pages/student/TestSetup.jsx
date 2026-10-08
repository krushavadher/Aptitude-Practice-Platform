import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { topicApi, testApi } from '../../api';
import { GlassCard } from '../../components/common/GlassCard';
import { Button } from '../../components/common/Button';
import { Select, Input } from '../../components/common/Form';
import { AlertCircle } from 'lucide-react';
import { useToast } from '../../components/common/Toast';

const setupSchema = z.object({
  topicId: z.string().optional(), // 'any' or topic ID
  difficulty: z.enum(['any', 'easy', 'medium', 'hard']),
  numQuestions: z.number().int().min(1).max(50),
  timeLimitMins: z.number().int().min(1).max(120),
});

export default function TestSetup() {
  const [searchParams] = useSearchParams();
  const initialTopicId = searchParams.get('topicId') || 'any';
  const navigate = useNavigate();
  const toast = useToast();
  const [serverError, setServerError] = useState('');

  const { data: topics = [] } = useQuery({
    queryKey: ['topics'],
    queryFn: topicApi.list
  });

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      topicId: initialTopicId,
      difficulty: 'any',
      numQuestions: 10,
      timeLimitMins: 15
    }
  });

  const numQuestions = watch('numQuestions');
  const timeLimitMins = watch('timeLimitMins');

  // Suggest time limit based on questions
  const handleQuestionsChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setValue('numQuestions', val);
    setValue('timeLimitMins', Math.ceil(val * 1.5)); // Suggest 1.5 mins per question
  };

  const startMutation = useMutation({
    mutationFn: testApi.start,
    onSuccess: (data) => {
      // Data contains { testId, expiresAt, serverTime, questions }
      // We need to store this in localStorage so TakingTest can survive refreshes
      localStorage.setItem(`test_init_${data.testId}`, JSON.stringify(data));
      navigate(`/test/${data.testId}`);
    },
    onError: (err) => {
      setServerError(err.message || 'Failed to start test');
    }
  });

  const onSubmit = (data) => {
    setServerError('');
    
    const payload = {
      numQuestions: data.numQuestions,
      durationSec: data.timeLimitMins * 60
    };
    
    if (data.topicId !== 'any') payload.topicId = data.topicId;
    if (data.difficulty !== 'any') payload.difficulty = data.difficulty;

    startMutation.mutate(payload);
  };

  const topicOptions = [
    { label: 'All Topics (Mixed)', value: 'any' },
    ...topics.map(t => ({ label: t.name, value: t._id }))
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <GlassCard strong className="w-full max-w-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary mb-2">Setup Timed Test</h1>
          <p className="text-secondary">Configure your test parameters. The timer will start immediately.</p>
        </div>

        {serverError && (
          <div className="mb-6 p-3 rounded-lg bg-error bg-opacity-10 border border-error text-error-text flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="topicId"
            control={control}
            render={({ field }) => (
              <Select 
                label="Topic"
                options={topicOptions}
                error={errors.topicId?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <Select 
                label="Difficulty"
                options={[
                  { label: 'Any Difficulty', value: 'any' },
                  { label: 'Easy', value: 'easy' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Hard', value: 'hard' }
                ]}
                error={errors.difficulty?.message}
                {...field}
              />
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="Number of Questions"
              options={[
                { label: '5', value: 5 },
                { label: '10', value: 10 },
                { label: '20', value: 20 },
                { label: '30', value: 30 }
              ]}
              error={errors.numQuestions?.message}
              onChange={handleQuestionsChange}
              value={numQuestions}
            />

            <Input 
              label="Time Limit (minutes)"
              type="number"
              min="1"
              max="120"
              error={errors.timeLimitMins?.message}
              {...register('timeLimitMins', { valueAsNumber: true })}
            />
          </div>

          <div className="pt-4 border-t border-glass-border">
            <div className="flex items-center justify-between mb-4 text-primary font-medium">
              <span>Test Summary:</span>
              <span>{numQuestions} questions, {timeLimitMins} minutes</span>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={startMutation.isPending}>
              Start Test
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
