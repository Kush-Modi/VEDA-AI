import { Router } from 'express';
import { signup, login, updateProfile, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/settings', protect, updateProfile);
router.get('/me', protect, getMe);

export default router;
