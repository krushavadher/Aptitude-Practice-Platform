import { z } from 'zod';

export const startTestBodySchema = z.object({
  topicId: z.string().length(24, 'Invalid topic ID').nullable().optional(),
  subtopic: z.string().optional(),
  numQuestions: z.number().int().min(1).max(100),
  durationSec: z.number().int().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional()
});

export const submitTestBodySchema = z.object({
  answers: z.array(z.object({
    questionId: z.string().length(24),
    selectedIndex: z.number().int().min(0).max(3),
    timeSpentSec: z.number().int().min(0)
  })).default([])
});
