import { Router } from 'express';
import seed from '../controllers/goSeed';

const router = Router();

router.get('/', seed.getAllSeeds);

export default router;
