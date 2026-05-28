import { Router } from 'express';
import multer from 'multer';
import { assignmentController } from '../controllers/assignmentController';
import { protect } from '../middleware/authMiddleware';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.use(protect);

router.post('/', upload.single('file'), assignmentController.createAssignment);
router.get('/', assignmentController.getAssignments);
router.delete('/:id', assignmentController.deleteAssignment);

export default router;
