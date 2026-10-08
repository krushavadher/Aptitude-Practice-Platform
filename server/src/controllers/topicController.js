import { asyncHandler } from '../utils/asyncHandler.js';
import * as topicService from '../services/topicService.js';

export const getTopics = asyncHandler(async (req, res) => {
  const topics = await topicService.getAllTopics();
  res.status(200).json({ success: true, data: topics, message: 'Topics retrieved successfully' });
});

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
