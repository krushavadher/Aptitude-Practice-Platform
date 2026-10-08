import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

process.env.JWT_SECRET = 'test_secret';
process.env.GEMINI_API_KEY = 'mock_key';
process.env.PORT = '5001';

import { jest } from '@jest/globals';
import User from '../src/models/User.js';
import Topic from '../src/models/Topic.js';
import Question from '../src/models/Question.js';
import { generateToken } from '../src/utils/generateToken.js';

let mongoServer;

jest.setTimeout(60000);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

export const createStudentToken = async (email = 'student@t.com') => {
  const user = await User.create({ name: 'Student', email, passwordHash: 'hash', role: 'student' });
  return generateToken(user._id, 'student');
};

export const createAdminToken = async (email = 'admin@t.com') => {
  const user = await User.create({ name: 'Admin', email, passwordHash: 'hash', role: 'admin' });
  return generateToken(user._id, 'admin');
};

export const seedTopicWithQuestions = async (count = 3) => {
  const topic = await Topic.create({ name: 'Test Topic', slug: 'test-topic', category: 'quant' });
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push({
      topicId: topic._id,
      text: `Q ${i}`,
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 0,
      explanation: 'Exp',
      difficulty: 'easy',
      source: 'manual',
      status: 'approved'
    });
  }
  await Question.insertMany(questions);
  return topic._id;
};
