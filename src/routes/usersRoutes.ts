import { Router } from 'express';
import usersController from '../controllers/usersController';

const router = Router();

router.get('/all', usersController.getAllUsers);
export default router;
