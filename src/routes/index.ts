import { Router } from 'express';
import usersRoutes from './usersRoutes';
import postsRoutes from './postsRoutes';
import crud from './crudRoutes';
import seed from './getSeed';
import { errorHandler } from '../middlewares/errorHandler';

const router = Router();

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/resource', crud);
router.use('/seed', seed);

router.use(errorHandler);
export default router;
