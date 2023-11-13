import { Router } from 'express';
import postsController from '../controllers/postsController';

const router = Router();

router.get('/all', postsController.getAllUsers);

router.post('/create', postsController.createPost);
export default router;
