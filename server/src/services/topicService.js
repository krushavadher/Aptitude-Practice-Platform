import Topic from '../models/Topic.js';
import { ApiError } from '../utils/apiError.js';

const generateSlug = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

export const getAllTopics = async () => {
  return await Topic.find({});
};

export const createTopic = async (topicData) => {
  const slug = generateSlug(topicData.name);
  const existing = await Topic.findOne({ slug });
  if (existing) {
    throw new ApiError(400, 'Topic with this name/slug already exists');
  }
  return await Topic.create({ ...topicData, slug });
};

export const updateTopic = async (id, topicData) => {
  const slug = generateSlug(topicData.name);
  const existing = await Topic.findOne({ slug, _id: { $ne: id } });
  if (existing) {
    throw new ApiError(400, 'Another topic with this name/slug already exists');
  }
  const topic = await Topic.findByIdAndUpdate(id, { ...topicData, slug }, { new: true, runValidators: true });
  if (!topic) throw new ApiError(404, 'Topic not found');
  return topic;
};

export const deleteTopic = async (id) => {
  const topic = await Topic.findByIdAndDelete(id);
  if (!topic) throw new ApiError(404, 'Topic not found');
  return topic;
};
