import { Router } from 'express';
import { getPaperByAssignmentId } from '../controllers/paperController';

const router = Router();

router.get('/:assignmentId', getPaperByAssignmentId);

export default router;
