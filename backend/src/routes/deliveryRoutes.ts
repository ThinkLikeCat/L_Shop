import { Router } from 'express';
import * as deliveryController from '../controllers/deliveryController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Все маршруты доставки требуют авторизации
router.use(authMiddleware);

/**
 * @route GET /api/delivery
 * @description Получить все заказы пользователя
 */
router.get('/', deliveryController.getOrders);

/**
 * @route GET /api/delivery/:id
 * @description Получить заказ по ID
 */
router.get('/:id', deliveryController.getOrderById);

/**
 * @route POST /api/delivery
 * @description Создать новый заказ
 */
router.post('/', deliveryController.createOrder);

/**
 * @route PUT /api/delivery/:id/cancel
 * @description Отменить заказ
 */
router.put('/:id/cancel', deliveryController.cancelOrder);

export default router;