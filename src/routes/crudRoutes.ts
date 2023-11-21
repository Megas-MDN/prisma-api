import { Router } from 'express';
import crudController from '../controllers/crudController';

const router = Router();

router.get('/all/:table', crudController.getAll);
router.get('/:table', crudController.getBy);
router.get('/:table/:id', crudController.getById);
router.put('/:table/:id', crudController.update);
router.delete('/:table/:id', crudController.remove);
router.post('/create', crudController.create);

const routesAvalible = [
  { route: '/all/:table', method: 'GET' },
  { route: '/:table', query: ['key', 'value'], method: 'GET' },
  { route: '/:table/:id', method: 'GET' },
  { route: '/:table/:id', method: 'PUT' },
  { route: '/:table/:id', method: 'DELETE' },
  { route: '/create', method: 'POST' },
];

router.use((_req, res) => {
  return res
    .status(501)
    .send({ message: 'Route not implemented', routes: routesAvalible });
});

export default router;
