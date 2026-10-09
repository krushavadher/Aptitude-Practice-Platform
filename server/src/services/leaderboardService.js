import Attempt from '../models/Attempt.js';
import mongoose from 'mongoose';

export const getLeaderboard = async (userId, query, topicId = null) => {
  const { period, limit } = query;
  
  const matchStage = {};
  if (topicId) {
    matchStage.topicId = new mongoose.Types.ObjectId(topicId);
  }
  
  if (period === 'weekly') {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    matchStage.submittedAt = { $gte: sevenDaysAgo };
  }

  const pipeline = [
    { $match: matchStage },
    { $sort: { score: -1, timeTakenSec: 1, submittedAt: 1 } },
    {
      $group: {
        _id: '$userId',
        bestAttempt: { $first: '$$ROOT' }
      }
    },
    { $replaceRoot: { newRoot: '$bestAttempt' } },
    { $sort: { score: -1, timeTakenSec: 1, submittedAt: 1 } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 0,
        userId: 1,
        name: '$user.name',
        avatar: '$user.avatar',
        score: 1,
        total: 1,
        timeTakenSec: 1,
        submittedAt: 1
      }
    }
  ];

  const allResults = await Attempt.aggregate(pipeline);
  const allRanked = allResults.map((doc, idx) => ({ ...doc, rank: idx + 1 }));

  const topN = allRanked.slice(0, limit);
  
  let currentUserEntry = allRanked.find(entry => entry.userId.toString() === userId.toString());
  
  const cleanTopN = topN.map(({ userId, ...rest }) => rest);
  let cleanUserEntry = null;
  if (currentUserEntry) {
    const { userId: uId, ...rest } = currentUserEntry;
    cleanUserEntry = rest;
  }

  return {
    leaderboard: cleanTopN,
    currentUser: cleanUserEntry
  };
};
