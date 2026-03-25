import { Request, Response } from 'express';
import * as productService from '../services/productService';

/**
 * Получить все товары с фильтрацией и сортировкой
 * Query params: search, category, available, minPrice, maxPrice, sort
 */
export async function getProducts(req: Request, res: Response): Promise<void> {
  const { search, category, available, minPrice, maxPrice, sort } = req.query;
  
  const filters: productService.FilterParams = {};
  
  if (search && typeof search === 'string') {
    filters.search = search;
  }
  
  if (category && typeof category === 'string') {
    filters.category = category;
  }
  
  if (available !== undefined) {
    filters.available = available === 'true';
  }
  
  if (minPrice && typeof minPrice === 'string') {
    filters.minPrice = parseFloat(minPrice);
  }
  
  if (maxPrice && typeof maxPrice === 'string') {
    filters.maxPrice = parseFloat(maxPrice);
  }
  
  if (sort && typeof sort === 'string') {
    filters.sort = sort as 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating';
  }
  
  const products = await productService.getProducts(filters);
  
  res.json({
    success: true,
    count: products.length,
    products
  });
}

/**
 * Получить товар по ID
 */
export async function getProductById(req: Request, res: Response): Promise<void> {
  const productId = req.params.id as string;
  
  const product = await productService.getProductById(productId);
  
  if (!product) {
    res.status(404).json({
      success: false,
      message: 'Товар не найден'
    });
    return;
  }
  
  res.json({
    success: true,
    product
  });
}

/**
 * Получить все категории
 */
export async function getCategories(_req: Request, res: Response): Promise<void> {
  const categories = await productService.getCategories();
  
  res.json({
    success: true,
    categories
  });
}

/**
 * Получить товары по категории
 */
export async function getProductsByCategory(req: Request, res: Response): Promise<void> {
  const categoryId = req.params.categoryId as string;
  
  const products = await productService.getProductsByCategory(categoryId);
  
  res.json({
    success: true,
    count: products.length,
    products
  });
}

/**
 * Получить популярные товары
 */
export async function getPopularProducts(req: Request, res: Response): Promise<void> {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  
  const products = await productService.getPopularProducts(limit);
  
  res.json({
    success: true,
    count: products.length,
    products
  });
}

/**
 * Поиск товаров
 */
export async function searchProducts(req: Request, res: Response): Promise<void> {
  const query = req.query.q as string;
  
  if (!query) {
    res.status(400).json({
      success: false,
      message: 'Не указан поисковый запрос'
    });
    return;
  }
  
  const products = await productService.searchProducts(query);
  
  res.json({
    success: true,
    count: products.length,
    products
  });
}