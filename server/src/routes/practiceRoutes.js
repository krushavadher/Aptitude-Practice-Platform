import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { getPracticeQuerySchema, checkPracticeBodySchema } from '../validators/practiceSchemas.js';
import { getPractice, checkPractice } from '../controllers/practiceController.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/:topicId', validate(getPracticeQuerySchema, 'query'), getPractice);
router.post('/check', validate(checkPracticeBodySchema, 'body'), checkPractice);

export default router;
