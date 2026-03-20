import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

/**
 * @route GET /api/products
 * @description Получить все товары с фильтрацией и сортировкой
 * @query search - поиск по названию/описанию
 * @query category - фильтр по категории
 * @query available - только доступные (true/false)
 * @query minPrice - минимальная цена
 * @query maxPrice - максимальная цена
 * @query sort - сортировка (price_asc, price_desc, name_asc, name_desc, rating)
 */
router.get('/', productController.getProducts);

/**
 * @route GET /api/products/search
 * @description Поиск товаров
 * @query q - поисковый запрос
 */
router.get('/search', productController.searchProducts);

/**
 * @route GET /api/products/popular
 * @description Получить популярные товары
 */
router.get('/popular', productController.getPopularProducts);

/**
 * @route GET /api/products/categories
 * @description Получить все категории
 */
router.get('/categories', productController.getCategories);

/**
 * @route GET /api/products/category/:categoryId
 * @description Получить товары по категории
 */
router.get('/category/:categoryId', productController.getProductsByCategory);

/**
 * @route GET /api/products/:id
 * @description Получить товар по ID
 */
router.get('/:id', productController.getProductById);

export default router;