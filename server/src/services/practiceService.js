import Question from '../models/Question.js';
import { ApiError } from '../utils/apiError.js';
import mongoose from 'mongoose';

export const getPracticeQuestions = async (topicId, query) => {
  const { difficulty, limit } = query;
  
  const match = { status: 'approved' };
  if (topicId && topicId !== 'mixed') {
    match.topicId = new mongoose.Types.ObjectId(topicId);
  }
  if (difficulty) match.difficulty = difficulty;
  
  const questions = await Question.aggregate([
    { $match: match },
    { $sample: { size: limit } },
    { $project: { correctIndex: 0, explanation: 0, reviewedBy: 0, reviewedAt: 0 } }
  ]);

  return questions;
};

export const checkPracticeQuestion = async (questionId, selectedIndex) => {
  const question = await Question.findById(questionId);
  if (!question) {
    throw new ApiError(404, 'Question not found');
  }
  
  return {
    isCorrect: question.correctIndex === selectedIndex,
    correctIndex: question.correctIndex,
    explanation: question.explanation
  };
};
