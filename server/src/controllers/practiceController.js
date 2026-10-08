import { asyncHandler } from '../utils/asyncHandler.js';
import * as practiceService from '../services/practiceService.js';

export const getPractice = asyncHandler(async (req, res) => {
  const questions = await practiceService.getPracticeQuestions(req.params.topicId, req.query);
  res.status(200).json({ success: true, data: questions, message: 'Practice questions retrieved' });
});

export const checkPractice = asyncHandler(async (req, res) => {
  const result = await practiceService.checkPracticeQuestion(req.body.questionId, req.body.selectedIndex);
  res.status(200).json({ success: true, data: result, message: 'Answer checked' });
});
