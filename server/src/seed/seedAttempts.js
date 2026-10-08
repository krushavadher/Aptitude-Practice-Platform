import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Topic from '../models/Topic.js';
import Test from '../models/Test.js';
import Attempt from '../models/Attempt.js';
import connectDB from '../config/db.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const seedAttempts = async () => {
  await connectDB();
  console.log('Seeding students and attempts...');

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);
  
  const studentData = [
    { name: 'Alice Smith', email: 'alice@test.com' },
    { name: 'Bob Jones', email: 'bob@test.com' },
    { name: 'Charlie Brown', email: 'charlie@test.com' },
    { name: 'Diana Prince', email: 'diana@test.com' }
  ];

  const students = [];
  for (const s of studentData) {
    let user = await User.findOne({ email: s.email });
    if (!user) {
      user = await User.create({ ...s, passwordHash, role: 'student' });
    }
    students.push(user);
  }

  const topic = await Topic.findOne();
  if (!topic) {
    console.log('No topics found. Please run seedTopics.js first.');
    process.exit();
  }

  await Attempt.deleteMany({ userId: { $in: students.map(s => s._id) } });
  await Test.deleteMany({ userId: { $in: students.map(s => s._id) } });

  const attemptsToCreate = [
    { uIdx: 0, score: 9, time: 100 },
    { uIdx: 0, score: 8, time: 90 },
    { uIdx: 1, score: 9, time: 90 },
    { uIdx: 2, score: 10, time: 120 },
    { uIdx: 3, score: 5, time: 50 }
  ];

  const now = new Date();

  for (const a of attemptsToCreate) {
    const user = students[a.uIdx];
    
    const test = await Test.create({
      userId: user._id,
      topicId: topic._id,
      questionIds: [], 
      durationSec: 300,
      startedAt: now,
      expiresAt: new Date(now.getTime() + 300000),
      status: 'submitted'
    });

    await Attempt.create({
      testId: test._id,
      userId: user._id,
      topicId: topic._id,
      answers: [],
      score: a.score,
      total: 10,
      accuracy: (a.score / 10) * 100,
      timeTakenSec: a.time,
      submittedAt: now
    });
  }

  console.log('Successfully seeded attempts!');
  process.exit();
};

seedAttempts();
