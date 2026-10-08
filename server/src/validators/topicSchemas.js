import { z } from 'zod';

export const topicSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['quant', 'logical', 'verbal'], { errorMap: () => ({ message: "Category must be quant, logical, or verbal" }) }),
  subtopics: z.array(z.string()).optional().default([])
});
