import express from 'express';
import { getTopics } from '../controllers/topicController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getTopics);

export default router;
