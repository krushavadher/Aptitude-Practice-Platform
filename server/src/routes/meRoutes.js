import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { getAttemptsQuerySchema } from '../validators/meSchemas.js';
import { getAttempts, getStats, updateProfile } from '../controllers/meController.js';

const router = express.Router();

router.use(authMiddleware);

import { upload } from '../middleware/uploadMiddleware.js';

router.get('/attempts', validate(getAttemptsQuerySchema, 'query'), getAttempts);
router.get('/stats', getStats);
router.put('/profile', upload.single('avatar'), updateProfile);

export default router;
