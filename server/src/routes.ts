import { Router } from 'express';

//import authMiddleware from './middleware/authMiddleware';

import DrugstoreController from './controllers/DrugstoreController';
import SessionController from './controllers/SessionController';

const router = Router();

router.post('/drugstore', DrugstoreController.create);
//router.get('/verify', DrugstoreController.index);
router.post('/session', SessionController.create);
//router.get('/users', authMiddleware, UserController.index);

export { router };