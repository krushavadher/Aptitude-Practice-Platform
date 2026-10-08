import { asyncHandler } from '../utils/asyncHandler.js';
import * as leaderboardService from '../services/leaderboardService.js';

export const getGlobalLeaderboard = asyncHandler(async (req, res) => {
  const result = await leaderboardService.getLeaderboard(req.user._id, req.query);
  res.status(200).json({ success: true, data: result, message: 'Global leaderboard retrieved' });
});

export const getTopicLeaderboard = asyncHandler(async (req, res) => {
  const result = await leaderboardService.getLeaderboard(req.user._id, req.query, req.params.topicId);
  res.status(200).json({ success: true, data: result, message: 'Topic leaderboard retrieved' });
});
