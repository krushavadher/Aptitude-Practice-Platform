import Test from '../models/Test.js';
import Attempt from '../models/Attempt.js';
import Question from '../models/Question.js';
import { ApiError } from '../utils/apiError.js';
import mongoose from 'mongoose';

export const startTest = async (userId, data) => {
  const { topicId, numQuestions, durationSec, difficulty } = data;

  const match = { status: 'approved' };
  if (topicId) match.topicId = new mongoose.Types.ObjectId(topicId);
  if (difficulty) match.difficulty = difficulty;

  const questions = await Question.aggregate([
    { $match: match },
    { $sample: { size: numQuestions } }
  ]);

  if (questions.length < numQuestions) {
    throw new ApiError(400, 'Not enough approved questions available for this criteria');
  }

  const questionIds = questions.map(q => q._id);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + durationSec * 1000);

  const test = await Test.create({
    userId,
    topicId: topicId || null,
    questionIds,
    durationSec,
    startedAt: now,
    expiresAt,
    status: 'in_progress'
  });

  const sanitizedQuestions = questions.map(q => {
    const { correctIndex, explanation, ...safeQ } = q;
    return safeQ;
  });

  return {
    testId: test._id,
    expiresAt: test.expiresAt,
    serverTime: now,
    questions: sanitizedQuestions
  };
};

export const submitTest = async (testId, userId, answersData) => {
  const test = await Test.findById(testId).populate('questionIds');
  if (!test) throw new ApiError(404, 'Test not found');

  if (test.userId.toString() !== userId.toString()) {
    throw new ApiError(403, 'You do not own this test');
  }

  if (test.status !== 'in_progress') {
    throw new ApiError(400, 'Test is no longer in progress');
  }

  const now = new Date();
  const gracePeriodMs = 10 * 1000;
  const isExpired = now.getTime() > test.expiresAt.getTime() + gracePeriodMs;

  test.status = isExpired ? 'expired' : 'submitted';
  await test.save();

  const answersList = answersData.answers || [];
  
  const validQuestionIds = test.questionIds.map(q => q._id.toString());
  const processedAnswers = [];
  const seenQuestions = new Set();
  
  let score = 0;
  let timeTakenSec = 0;

  for (const ans of answersList) {
    if (!validQuestionIds.includes(ans.questionId) || seenQuestions.has(ans.questionId)) {
      continue;
    }
    seenQuestions.add(ans.questionId);
    
    const qDoc = test.questionIds.find(q => q._id.toString() === ans.questionId);
    const isCorrect = qDoc.correctIndex === ans.selectedIndex;
    if (isCorrect) score += 1;
    
    processedAnswers.push({
      questionId: ans.questionId,
      selectedIndex: ans.selectedIndex,
      isCorrect,
      timeSpentSec: ans.timeSpentSec
    });
    timeTakenSec += (ans.timeSpentSec || 0);
  }
  
  const attempt = await Attempt.create({
    testId: test._id,
    userId,
    topicId: test.topicId,
    answers: processedAnswers,
    score,
    total: test.questionIds.length,
    accuracy: test.questionIds.length > 0 ? (score / test.questionIds.length) * 100 : 0,
    timeTakenSec,
    submittedAt: now
  });

  return {
    status: test.status,
    attempt,
    questions: test.questionIds 
  };
};

export const getTestResult = async (testId, userId) => {
  const test = await Test.findById(testId).populate('questionIds');
  if (!test) throw new ApiError(404, 'Test not found');

  if (test.userId.toString() !== userId.toString()) {
    throw new ApiError(403, 'You do not own this test');
  }

  if (test.status === 'in_progress') {
    throw new ApiError(400, 'Cannot view result while test is in progress');
  }

  const attempt = await Attempt.findOne({ testId, userId });

  return {
    test,
    attempt,
    questions: test.questionIds
  };
};
