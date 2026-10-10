import Question from '../models/Question.js';
import Topic from '../models/Topic.js';
import { ApiError } from '../utils/apiError.js';

export const createManualQuestion = async (questionData, adminId) => {
  const topic = await Topic.findById(questionData.topicId);
  if (!topic) {
    throw new ApiError(404, 'Topic not found');
  }

  const question = await Question.create({
    ...questionData,
    source: 'manual',
    status: 'approved',
    reviewedBy: adminId,
    reviewedAt: new Date()
  });

  return question;
};

export const getQuestions = async (query) => {
  const { status, topicId, subtopic, difficulty, flagged, page = 1, limit = 20 } = query;
  
  const filter = {};
  if (status) filter.status = status;
  if (topicId) filter.topicId = topicId;
  if (subtopic) filter.subtopic = subtopic;
  if (difficulty) filter.difficulty = difficulty;
  
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const questions = await Question.find(filter)
    .populate('topicId', 'name category')
    .skip(skip)
    .limit(limitNum)
    .sort({ createdAt: -1 });

  const total = await Question.countDocuments(filter);

  return {
    questions,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum)
  };
};

export const updateQuestion = async (id, questionData) => {
  if (questionData.topicId) {
    const topic = await Topic.findById(questionData.topicId);
    if (!topic) {
      throw new ApiError(404, 'Topic not found');
    }
  }

  const question = await Question.findByIdAndUpdate(id, questionData, { new: true, runValidators: true });
  if (!question) throw new ApiError(404, 'Question not found');
  
  return question;
};

export const deleteQuestion = async (id) => {
  const question = await Question.findByIdAndDelete(id);
  if (!question) throw new ApiError(404, 'Question not found');
  return question;
};
