import { z } from 'zod';

export const getPracticeQuerySchema = z.object({
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  limit: z.string().regex(/^\d+$/).optional().default('10').transform(val => {
    const num = parseInt(val, 10);
    return num > 30 ? 30 : num;
  })
});

export const checkPracticeBodySchema = z.object({
  questionId: z.string().length(24, 'Invalid question ID'),
  selectedIndex: z.number().int().min(0).max(3)
});
