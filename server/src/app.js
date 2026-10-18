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

const configuredOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

console.log('[CORS] Allowed origins from CLIENT_URL:', configuredOrigins);

const vercelPreviewRegex = /^https:\/\/aptitude-practice-platform.*\.vercel\.app$/;

const corsOptions = {
  origin: (origin, callback) => {
    // 1. Allow if there is no origin (Postman, curl, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    const cleanOrigin = origin.trim().replace(/\/+$/, '');

    // 2. Allow if listed in comma-separated CLIENT_URL (trimmed of spaces and trailing slashes)
    if (configuredOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    }

    // 3. Allow if matches Vercel production / preview deployment URL pattern
    if (vercelPreviewRegex.test(cleanOrigin)) {
      return callback(null, true);
    }

    // 4. Allow local development ports
    if (cleanOrigin === 'http://localhost:5173' || cleanOrigin === 'http://localhost:3000') {
      return callback(null, true);
    }

    // Otherwise reject
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// 1. CORS middleware and preflight handler registered before all routes
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// 2. Security & body parser middleware (after CORS)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

import path from 'path';
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

// 3. Public Health Check Routes (no auth, no rate limiting)
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok' }));

// 4. Rate limiting on API routes
app.use('/api', generalLimiter);

// 5. Mount API routes
app.use('/api', apiRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Not Found - ${req.originalUrl}` });
});

// Central Error Handler
app.use(errorHandler);

export default app;
