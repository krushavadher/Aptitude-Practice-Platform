import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../models/Topic.js';
import connectDB from '../config/db.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const cleanupSubtopics = async () => {
  await connectDB();
  console.log('Cleaning up subtopics...');

  const topic = await Topic.findOne({ slug: 'quantitative' });
  if (topic) {
    topic.subtopics = ['Percentages', 'Ratio and Proportion'];
    await topic.save();
    console.log('Successfully updated Quantitative subtopics to only "Percentages" and "Ratio and Proportion".');
  } else {
    console.log('Quantitative topic not found.');
  }

  process.exit();
};

cleanupSubtopics();
