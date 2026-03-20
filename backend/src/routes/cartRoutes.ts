import { Router } from 'express';
import * as cartController from '../controllers/cartController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Все маршруты корзины требуют авторизации
router.use(authMiddleware);

/**
 * @route GET /api/cart
 * @description Получить корзину пользователя
 */
router.get('/', cartController.getCart);

/**
 * @route POST /api/cart
 * @description Добавить товар в корзину
 */
router.post('/', cartController.addToCart);

/**
 * @route PUT /api/cart/:productId
 * @description Обновить количество товара в корзине
 */
router.put('/:productId', cartController.updateCartCount);

/**
 * @route DELETE /api/cart/:productId
 * @description Удалить товар из корзины
 */
router.delete('/:productId', cartController.removeFromCart);

export default router;