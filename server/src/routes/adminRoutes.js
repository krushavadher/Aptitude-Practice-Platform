import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validate.js';
import { topicSchema } from '../validators/topicSchemas.js';
import { questionSchema, getQuestionsQuerySchema } from '../validators/questionSchemas.js';
import { generateQuestionsSchema, reviewQuestionSchema } from '../validators/aiSchemas.js';
import { 
  createTopic, updateTopic, deleteTopic,
  createQuestion, getQuestions, updateQuestion, deleteQuestion,
  generateAiQuestions, reviewQuestion, getAdminStats, getUsers
} from '../controllers/adminController.js';
import { loginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(authMiddleware, roleMiddleware('admin'));

// Topics
router.post('/topics', validate(topicSchema), createTopic);
router.put('/topics/:id', validate(topicSchema), updateTopic);
router.delete('/topics/:id', deleteTopic);

// Questions
router.post('/questions', validate(questionSchema), createQuestion);
router.get('/questions', validate(getQuestionsQuerySchema, 'query'), getQuestions);
router.put('/questions/:id', validate(questionSchema.partial()), updateQuestion);
router.delete('/questions/:id', deleteQuestion);

// AI & Review
router.post('/ai/generate', loginLimiter, validate(generateQuestionsSchema), generateAiQuestions);
router.patch('/questions/:id/review', validate(reviewQuestionSchema), reviewQuestion);

// Users
router.get('/users', getUsers);

// Stats
router.get('/stats', getAdminStats);

export default router;
