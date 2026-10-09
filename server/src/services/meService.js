import Attempt from '../models/Attempt.js';
import User from '../models/User.js';

export const getMyAttempts = async (userId, page = 1, limit = 10) => {
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const attempts = await Attempt.find({ userId })
    .sort({ submittedAt: -1 })
    .skip(skip)
    .limit(limitNum)
    .populate('topicId', 'name');

  const total = await Attempt.countDocuments({ userId });

  return {
    attempts,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum)
  };
};

export const getMyStats = async (userId) => {
  const attempts = await Attempt.find({ userId });
  
  const totalAttempts = attempts.length;
  if (totalAttempts === 0) {
    return { totalAttempts: 0, averageScore: 0, accuracyPerTopic: [] };
  }

  let totalScore = 0;
  let totalQuestions = 0;
  const topicStats = {};

  attempts.forEach(a => {
    totalScore += a.score;
    totalQuestions += a.total;

    const tId = a.topicId ? a.topicId.toString() : 'mixed';
    if (!topicStats[tId]) {
      topicStats[tId] = { correct: 0, total: 0 };
    }
    topicStats[tId].correct += a.score;
    topicStats[tId].total += a.total;
  });

  const averageScore = totalScore / totalAttempts;

  const accuracyPerTopic = Object.keys(topicStats).map(topicId => ({
    topicId,
    accuracy: topicStats[topicId].total > 0 ? (topicStats[topicId].correct / topicStats[topicId].total) * 100 : 0
  }));

  return {
    totalAttempts,
    averageScore,
    accuracyPerTopic
  };
};

export const updateProfile = async (userId, data) => {
  const { name, avatar } = data;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  if (name) user.name = name;
  if (avatar !== undefined) user.avatar = avatar;
  
  await user.save();
  
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    createdAt: user.createdAt
  };
};
