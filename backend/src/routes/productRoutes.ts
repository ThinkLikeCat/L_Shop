import { Router } from 'express';
import * as productController from '../controllers/productController';
const router = Router();
/**
 * @swagger
 * {
 * "/api/products": {
 * "get": {
 * "summary": "Получить все товары",
 * "tags": ["Products"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.get('/', productController.getProducts);
/**
 * @swagger
 * {
 * "/api/products/search": {
 * "get": {
 * "summary": "Поиск товаров",
 * "tags": ["Products"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.get('/search', productController.searchProducts);
/**
 * @swagger
 * {
 * "/api/products/popular": {
 * "get": {
 * "summary": "Получить популярные товары",
 * "tags": ["Products"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.get('/popular', productController.getPopularProducts);
/**
 * @swagger
 * {
 * "/api/products/categories": {
 * "get": {
 * "summary": "Получить все категории",
 * "tags": ["Products"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.get('/categories', productController.getCategories);
/**
 * @swagger
 * {
 * "/api/products/category/{categoryId}": {
 * "get": {
 * "summary": "Получить товары по категории",
 * "tags": ["Products"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.get('/category/:categoryId', productController.getProductsByCategory);
/**
 * @swagger
 * {
 * "/api/products/{id}": {
 * "get": {
 * "summary": "Получить товар по ID",
 * "tags": ["Products"],
 * "responses": { "200": { "description": "Успешно" } }
 * }
 * }
 * }
 */
router.get('/:id', productController.getProductById);
export default router;
