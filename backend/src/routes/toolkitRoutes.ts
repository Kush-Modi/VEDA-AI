import { Router } from 'express';
import { toolkitController } from '../controllers/toolkitController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.post('/lesson-planner', toolkitController.generateLessonPlan);

export default router;
