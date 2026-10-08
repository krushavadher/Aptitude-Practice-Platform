import { asyncHandler } from '../utils/asyncHandler.js';
import * as adminService from '../services/adminService.js';
import * as topicService from '../services/topicService.js';
import * as aiService from '../services/aiService.js';
import Question from '../models/Question.js';
import User from '../models/User.js';
import Attempt from '../models/Attempt.js';

// Topic admin routes
export const createTopic = asyncHandler(async (req, res) => {
  const topic = await topicService.createTopic(req.body);
  res.status(201).json({ success: true, data: topic, message: 'Topic created successfully' });
});

export const updateTopic = asyncHandler(async (req, res) => {
  const topic = await topicService.updateTopic(req.params.id, req.body);
  res.status(200).json({ success: true, data: topic, message: 'Topic updated successfully' });
});

export const deleteTopic = asyncHandler(async (req, res) => {
  await topicService.deleteTopic(req.params.id);
  res.status(200).json({ success: true, data: null, message: 'Topic deleted successfully' });
});

// Question admin routes
export const createQuestion = asyncHandler(async (req, res) => {
  const question = await adminService.createManualQuestion(req.body, req.user._id);
  res.status(201).json({ success: true, data: question, message: 'Question created successfully' });
});

export const getQuestions = asyncHandler(async (req, res) => {
  const result = await adminService.getQuestions(req.query);
  res.status(200).json({ success: true, data: result, message: 'Questions retrieved successfully' });
});

export const updateQuestion = asyncHandler(async (req, res) => {
  const question = await adminService.updateQuestion(req.params.id, req.body);
  res.status(200).json({ success: true, data: question, message: 'Question updated successfully' });
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  await adminService.deleteQuestion(req.params.id);
  res.status(200).json({ success: true, data: null, message: 'Question deleted successfully' });
});

// AI endpoints
export const generateAiQuestions = asyncHandler(async (req, res) => {
  const result = await aiService.generateQuestions(req.body);
  res.status(200).json({ success: true, data: result, message: 'AI generation completed' });
});

// Admin Review & Stats
export const reviewQuestion = asyncHandler(async (req, res) => {
  const { action, edits } = req.body;
  const question = await Question.findById(req.params.id);
  
  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }
  
  if (question.status !== 'draft') {
    res.status(400);
    throw new Error('Only draft questions can be reviewed');
  }

  if (edits) {
    Object.assign(question, edits);
  }

  question.status = action === 'approve' ? 'approved' : 'rejected';
  question.reviewedBy = req.user._id;
  question.reviewedAt = new Date();

  await question.save();
  res.status(200).json({ success: true, data: question, message: `Question ${action}d` });
});

export const getAdminStats = asyncHandler(async (req, res) => {
  const [usersCount, attemptsCount, questionsByStatus, flaggedDrafts] = await Promise.all([
    User.countDocuments(),
    Attempt.countDocuments(),
    Question.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Question.countDocuments({ status: 'draft', flagged: true })
  ]);

  const stats = {
    users: usersCount,
    testsTaken: attemptsCount,
    questions: {
      draft: 0,
      approved: 0,
      rejected: 0,
      flaggedDrafts
    }
  };

  questionsByStatus.forEach(item => {
    if (stats.questions[item._id] !== undefined) {
      stats.questions[item._id] = item.count;
    }
  });

  res.status(200).json({ success: true, data: stats, message: 'Admin stats retrieved' });
});
