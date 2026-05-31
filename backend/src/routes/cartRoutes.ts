import { Router } from 'express';
import * as cartController from '../controllers/cartController';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = Router();
router.use(authMiddleware);
/**
 * @swagger
 * {
 * "/api/cart": {
 * "get": {
 * "summary": "Получить корзину пользователя",
 * "tags": ["Cart"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.get('/', cartController.getCart);
/**
 * @swagger
 * {
 * "/api/cart": {
 * "post": {
 * "summary": "Добавить товар в корзину",
 * "tags": ["Cart"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.post('/', cartController.addToCart);
/**
 * @swagger
 * {
 * "/api/cart/{productId}": {
 * "put": {
 * "summary": "Обновить количество товара",
 * "tags": ["Cart"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.put('/:productId', cartController.updateCartCount);
/**
 * @swagger
 * {
 * "/api/cart/{productId}": {
 * "delete": {
 * "summary": "Удалить товар из корзины",
 * "tags": ["Cart"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.delete('/:productId', cartController.removeFromCart);
export default router;
