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
const defaultOrigins = ['http://localhost:5173', 'http://localhost:3000'];
const configuredOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
  : [];
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...configuredOrigins]));

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests or same-origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    return callback(new Error(`CORS origin '${origin}' not allowed by server configuration.`));
  },
  credentials: true
}));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

import path from 'path';
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Apply general rate limiter to all API routes
app.use('/api', generalLimiter);

// Mount routes
app.use('/api', apiRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Not Found - ${req.originalUrl}` });
});

// Central Error Handler
app.use(errorHandler);

export default app;
