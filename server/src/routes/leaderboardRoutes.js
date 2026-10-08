import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { getLeaderboardQuerySchema, getTopicLeaderboardParamsSchema } from '../validators/leaderboardSchemas.js';
import { getGlobalLeaderboard, getTopicLeaderboard } from '../controllers/leaderboardController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', validate(getLeaderboardQuerySchema, 'query'), getGlobalLeaderboard);
router.get('/:topicId', validate(getTopicLeaderboardParamsSchema, 'params'), validate(getLeaderboardQuerySchema, 'query'), getTopicLeaderboard);

export default router;
