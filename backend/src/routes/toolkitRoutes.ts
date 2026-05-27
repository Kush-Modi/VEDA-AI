import { Router } from 'express';
import { toolkitController } from '../controllers/toolkitController';

const router = Router();

router.post('/lesson-plan', toolkitController.generateLessonPlan);

export default router;
