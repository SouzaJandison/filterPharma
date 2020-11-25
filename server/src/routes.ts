import { Router } from 'express';

//import authMiddleware from './middleware/authMiddleware';

import DrugstoreController from './controllers/DrugstoreController';
import SessionController from './controllers/SessionController';
import ProductController from './controllers/ProductController';

const router = Router();

router.post('/drugstore', DrugstoreController.create);
//router.get('/verify', DrugstoreController.index);
router.post('/session', SessionController.create);
//router.get('/users', authMiddleware, UserController.index);

router.get('/list', ProductController.show);

export { router };