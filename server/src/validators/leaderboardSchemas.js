import { z } from 'zod';

export const getLeaderboardQuerySchema = z.object({
  period: z.enum(['weekly', 'all']).optional().default('all'),
  limit: z.string().regex(/^\d+$/).optional().default('10').transform(val => {
    const num = parseInt(val, 10);
    return num > 50 ? 50 : num;
  })
});

export const getTopicLeaderboardParamsSchema = z.object({
  topicId: z.string().length(24, 'Invalid topic ID')
});
