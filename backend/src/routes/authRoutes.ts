import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @route POST /api/auth/register
 * @description Регистрация нового пользователя
 */
router.post('/register', authController.register);

/**
 * @route POST /api/auth/login
 * @description Авторизация пользователя
 */
router.post('/login', authController.login);

/**
 * @route POST /api/auth/logout
 * @description Выход из системы
 */
router.post('/logout', authMiddleware, authController.logout);

/**
 * @route GET /api/auth/me
 * @description Получение текущего пользователя
 */
router.get('/me', authMiddleware, authController.getMe);

export default router;