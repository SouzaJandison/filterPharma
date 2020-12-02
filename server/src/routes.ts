import { Router } from 'express';

import DrugstoreController from './controllers/DrugstoreController';
import SessionController from './controllers/SessionController';
import ProductController from './controllers/ProductController';

const router = Router();

router.post('/drugstore', DrugstoreController.create);
router.post('/session', SessionController.create);
router.get('/auth', DrugstoreController.index);

router.post('/list', ProductController.index);
router.post('/productAdd', ProductController.add);
router.post('/productRemove', ProductController.remove);
router.get('/product/:id', ProductController.show);

export { router };