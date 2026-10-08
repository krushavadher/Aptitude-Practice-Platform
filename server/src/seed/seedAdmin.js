import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import connectDB from '../config/db.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const seedAdmin = async () => {
  await connectDB();
  console.log('Seeding admin...');

  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin already exists, skipping.');
    process.exit();
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  await User.create({
    name: 'Admin User',
    email,
    passwordHash,
    role: 'admin'
  });

  console.log('Admin seeded successfully!');
  process.exit();
};

seedAdmin();
