import { z } from 'zod';
import { questionSchema } from './questionSchemas.js';

export const generateQuestionsSchema = z.object({
  topicId: z.string().length(24),
  subtopic: z.string().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  count: z.number().int().min(1).max(10),
  verify: z.boolean().optional().default(true)
});

export const reviewQuestionSchema = z.object({
  action: z.enum(['approve', 'reject']),
  edits: questionSchema.partial().optional()
});
