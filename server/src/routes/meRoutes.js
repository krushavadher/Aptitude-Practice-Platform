import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { getAttemptsQuerySchema } from '../validators/meSchemas.js';
import { getAttempts, getStats } from '../controllers/meController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/attempts', validate(getAttemptsQuerySchema, 'query'), getAttempts);
router.get('/stats', getStats);

export default router;
