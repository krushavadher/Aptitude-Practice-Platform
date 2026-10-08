import express from 'express';
import authRoutes from './authRoutes.js';
import topicRoutes from './topicRoutes.js';
import adminRoutes from './adminRoutes.js';
import practiceRoutes from './practiceRoutes.js';
import testRoutes from './testRoutes.js';
import meRoutes from './meRoutes.js';
import leaderboardRoutes from './leaderboardRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/topics', topicRoutes);
router.use('/admin', adminRoutes);
router.use('/practice', practiceRoutes);
router.use('/tests', testRoutes);
router.use('/me', meRoutes);
router.use('/leaderboard', leaderboardRoutes);

export default router;
