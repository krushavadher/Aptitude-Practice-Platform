import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { startTestBodySchema, submitTestBodySchema } from '../validators/testSchemas.js';
import { startTest, submitTest, getResult } from '../controllers/testController.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/start', validate(startTestBodySchema, 'body'), startTest);
router.post('/:id/submit', validate(submitTestBodySchema, 'body'), submitTest);
router.get('/:id/result', getResult);

export default router;
