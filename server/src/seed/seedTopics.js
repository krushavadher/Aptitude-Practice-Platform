import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../models/Topic.js';
import connectDB from '../config/db.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const topics = [
  { name: 'Quantitative', category: 'quant', subtopics: ['Percentages', 'Profit & Loss', 'Time & Work', 'Time Speed Distance', 'Ratio & Proportion'] },
  { name: 'Logical Reasoning', category: 'logical', subtopics: ['Blood Relations', 'Syllogisms', 'Seating Arrangement', 'Coding-Decoding'] },
  { name: 'Verbal', category: 'verbal', subtopics: ['Synonyms', 'Antonyms', 'Reading Comprehension', 'Sentence Correction'] }
];

const generateSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const seedTopics = async () => {
  await connectDB();
  console.log('Seeding topics...');
  for (const t of topics) {
    const slug = generateSlug(t.name);
    await Topic.updateOne(
      { slug },
      { $setOnInsert: { ...t, slug } },
      { upsert: true }
    );
  }
  console.log('Topics seeded successfully!');
  process.exit();
};

seedTopics();
