import { Router } from 'express';
import { getPaperByAssignmentId, getLibrary } from '../controllers/paperController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.get('/library', getLibrary);
router.get('/:assignmentId', getPaperByAssignmentId);

export default router;
