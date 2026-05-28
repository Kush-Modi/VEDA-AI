import { Router } from 'express';
import { groupController } from '../controllers/groupController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect); // All group routes are protected

router.post('/', groupController.createGroup);
router.get('/', groupController.getGroups);
router.delete('/:id', groupController.deleteGroup);

export default router;
