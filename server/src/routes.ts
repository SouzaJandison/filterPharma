import { Router } from 'express';

//import authMiddleware from './middleware/authMiddleware';

import DrugstoreController from './controllers/DrugstoreController';
import SessionController from './controllers/SessionController';
import ProductController from './controllers/ProductController';

const router = Router();

router.post('/drugstore', DrugstoreController.create);
router.get('/auth', DrugstoreController.index);
router.post('/session', SessionController.create);
//router.get('/users', authMiddleware, UserController.index);

router.post('/list', ProductController.index);
router.post('/product', ProductController.create);
router.get('/product/:id', ProductController.show);

export { router };