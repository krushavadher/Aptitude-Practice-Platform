import { z } from 'zod';

export const questionSchema = z.object({
  topicId: z.string().length(24, 'Invalid topic ID'),
  subtopic: z.string().optional(),
  text: z.string().min(1, 'Text is required'),
  options: z.array(z.string().min(1, 'Option cannot be empty')).length(4, 'Exactly 4 options are required')
    .refine((options) => new Set(options).size === 4, { message: 'Options must be unique' }),
  correctIndex: z.number().int().min(0).max(3),
  explanation: z.string().min(1, 'Explanation is required'),
  difficulty: z.enum(['easy', 'medium', 'hard'])
});

export const getQuestionsQuerySchema = z.object({
  status: z.enum(['draft', 'approved', 'rejected']).optional(),
  topicId: z.string().length(24).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  flagged: z.string().optional(),
  page: z.string().regex(/^\d+$/).optional().default('1'),
  limit: z.string().regex(/^\d+$/).optional().default('20')
});
