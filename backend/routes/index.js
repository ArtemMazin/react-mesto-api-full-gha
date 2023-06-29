import { Router } from 'express';
import checkAuth from '../middlewares/auth.js';
import userRoutes from './users.js';
import cardRoutes from './cards.js';
import { register, login } from '../controllers/users.js';
import NotFoundError from '../errors/NotFoundError.js';
import { loginValidation, registerValidation } from '../utils/validationConfig.js';

const router = Router();

router.post('/signin', loginValidation, login);

router.post('/signup', registerValidation, register);

router.use(checkAuth);

router.use('/users', userRoutes);

router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => next(new NotFoundError('Указан некорректный маршрут')));

export default router;
