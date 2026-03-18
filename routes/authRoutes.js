const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

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
 * @description Проверка авторизации
 */
router.get('/me', authController.me);

module.exports = router;