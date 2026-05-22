import { Router } from 'express';
import * as deliveryController from '../controllers/deliveryController';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = Router();
router.use(authMiddleware);
/**
 * @swagger
 * {
 * "/api/delivery": {
 * "get": {
 * "summary": "Получить все заказы пользователя",
 * "tags": ["Delivery"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.get('/', deliveryController.getOrders);
/**
 * @swagger
 * {
 * "/api/delivery/{id}": {
 * "get": {
 * "summary": "Получить заказ по ID",
 * "tags": ["Delivery"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.get('/:id', deliveryController.getOrderById);
/**
 * @swagger
 * {
 * "/api/delivery": {
 * "post": {
 * "summary": "Создать новый заказ",
 * "tags": ["Delivery"],
 * "responses": { "201": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.post('/', deliveryController.createOrder);
/**
 * @swagger
 * {
 * "/api/delivery/{id}/cancel": {
 * "put": {
 * "summary": "Отменить заказ",
 * "tags": ["Delivery"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.put('/:id/cancel', deliveryController.cancelOrder);
export default router;
