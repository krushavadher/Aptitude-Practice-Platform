import { asyncHandler } from '../utils/asyncHandler.js';
import * as testService from '../services/testService.js';

export const startTest = asyncHandler(async (req, res) => {
  const result = await testService.startTest(req.user._id, req.body);
  res.status(201).json({ success: true, data: result, message: 'Test started' });
});

export const submitTest = asyncHandler(async (req, res) => {
  const result = await testService.submitTest(req.params.id, req.user._id, req.body);
  res.status(200).json({ success: true, data: result, message: 'Test submitted' });
});

export const getResult = asyncHandler(async (req, res) => {
  const result = await testService.getTestResult(req.params.id, req.user._id);
  res.status(200).json({ success: true, data: result, message: 'Test result retrieved' });
});
