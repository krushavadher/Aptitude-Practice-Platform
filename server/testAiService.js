import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { generateQuestions } from './src/services/aiService.js';
import Topic from './src/models/Topic.js';

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    
    // Find a topic
    const topic = await Topic.findOne();
    if (!topic) {
      console.log('No topics found.');
      process.exit(1);
    }

    console.log('Testing generateQuestions for topic:', topic.name);
    const result = await generateQuestions({
      topicId: topic._id,
      subtopic: 'General',
      difficulty: 'easy',
      count: 2,
      verify: false
    });
    
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Test Failed:', err.stack);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

test();
