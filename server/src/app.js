import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import apiRoutes from './routes/index.js';

dotenv.config();

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

import path from 'path';
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

// Apply general rate limiter to all API routes
app.use('/api', generalLimiter);

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, data: { status: 'ok' }, message: 'Server is running' });
});

// Mount routes
app.use('/api', apiRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Not Found - ${req.originalUrl}` });
});

// Central Error Handler
app.use(errorHandler);

export default app;
