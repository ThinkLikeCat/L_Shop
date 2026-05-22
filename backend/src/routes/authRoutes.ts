import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = Router();
/**
 * @swagger
 * {
 * "/api/auth/register": {
 * "post": {
 * "summary": "Регистрация нового пользователя",
 * "tags": ["Auth"],
 * "responses": {
 * "200": { "description": "Успешно" }
 * }
 * }
 * }
 * }
 */
router.post('/register', authController.register);
/**
 * @swagger
 * {
 * "/api/auth/login": {
 * "post": {
 * "summary": "Авторизация пользователя",
 * "tags": ["Auth"],
 * "responses": {
 * "200": { "description": "Успешно" }
 * }
 * }
 * }
 * }
 */
router.post('/login', authController.login);
/**
 * @swagger
 * {
 * "/api/auth/logout": {
 * "post": {
 * "summary": "Выход из системы",
 * "tags": ["Auth"],
 * "responses": {
 * "200": { "description": "Успешно" }
 * }
 * }
 * }
 * }
 */
router.post('/logout', authMiddleware, authController.logout);
/**
 * @swagger
 * {
 * "/api/auth/me": {
 * "get": {
 * "summary": "Получение текущего пользователя",
 * "tags": ["Auth"],
 * "responses": {
 * "200": { "description": "Успешно" }
 * }
 * }
 * }
 * }
 */
router.get('/me', authMiddleware, authController.getMe);
export default router;
