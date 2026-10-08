import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';
import Topic from '../models/Topic.js';
import connectDB from '../config/db.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const seedQuestions = async () => {
  await connectDB();
  console.log('Seeding questions...');

  const topics = await Topic.find({});
  if (topics.length === 0) {
    console.log('No topics found. Run seedTopics.js first.');
    process.exit();
  }

  const existingCount = await Question.countDocuments();
  if (existingCount > 0) {
    console.log('Questions already exist, skipping seed to prevent duplicates.');
    process.exit();
  }

  const sampleQuestions = [];

  for (const topic of topics) {
    for (let i = 1; i <= 5; i++) {
      sampleQuestions.push({
        topicId: topic._id,
        subtopic: topic.subtopics[i % topic.subtopics.length] || 'General',
        text: `Sample question ${i} for ${topic.name}?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctIndex: i % 4,
        explanation: `This is the explanation for sample question ${i} under ${topic.name}.`,
        difficulty: 'medium',
        source: 'manual',
        status: 'approved'
      });
    }
  }

  await Question.insertMany(sampleQuestions);
  console.log(`Seeded ${sampleQuestions.length} questions successfully!`);
  process.exit();
};

seedQuestions();
