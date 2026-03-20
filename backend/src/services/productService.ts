import * as FileManager from '../utils/fileManager';
import { config } from '../config/config';
import { Product, isAvailable } from '../models/Product';
import { Category } from '../models/Category';

export interface FilterParams {
  search?: string;
  category?: string;
  available?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating';
}

/**
 * Получить все товары с фильтрацией и сортировкой
 */
export async function getProducts(filters?: FilterParams): Promise<Product[]> {
  let products = await FileManager.readJSON<Product>(config.data.productsPath);
  
  if (!filters) {
    return products;
  }
  
  // Поиск по названию и описанию
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    products = products.filter((p: Product) => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
    );
  }
  
  // Фильтр по категории
  if (filters.category) {
    products = products.filter((p: Product) => p.categoryId === filters.category);
  }
  
  // Фильтр по доступности
  if (filters.available !== undefined) {
    products = products.filter((p: Product) => isAvailable(p) === filters.available);
  }
  
  // Фильтр по минимальной цене
  if (filters.minPrice !== undefined) {
    products = products.filter((p: Product) => {
      const price = p.discountPrice ?? p.price;
      return price >= filters.minPrice!;
    });
  }
  
  // Фильтр по максимальной цене
  if (filters.maxPrice !== undefined) {
    products = products.filter((p: Product) => {
      const price = p.discountPrice ?? p.price;
      return price <= filters.maxPrice!;
    });
  }
  
  // Сортировка
  if (filters.sort) {
    switch (filters.sort) {
      case 'price_asc':
        products.sort((a: Product, b: Product) => {
          const priceA = a.discountPrice ?? a.price;
          const priceB = b.discountPrice ?? b.price;
          return priceA - priceB;
        });
        break;
      case 'price_desc':
        products.sort((a: Product, b: Product) => {
          const priceA = a.discountPrice ?? a.price;
          const priceB = b.discountPrice ?? b.price;
          return priceB - priceA;
        });
        break;
      case 'name_asc':
        products.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        products.sort((a: Product, b: Product) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        products.sort((a: Product, b: Product) => b.rating - a.rating);
        break;
    }
  }
  
  return products;
}

/**
 * Получить товар по ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const products = await FileManager.readJSON<Product>(config.data.productsPath);
  return products.find((p: Product) => p.id === id) ?? null;
}

/**
 * Получить все категории
 */
export async function getCategories(): Promise<Category[]> {
  return await FileManager.readJSON<Category>(config.data.categoriesPath);
}

/**
 * Получить категорию по ID
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  const categories = await FileManager.readJSON<Category>(config.data.categoriesPath);
  return categories.find((c: Category) => c.id === id) ?? null;
}

/**
 * Получить товары по категории
 */
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const products = await FileManager.readJSON<Product>(config.data.productsPath);
  return products.filter((p: Product) => p.categoryId === categoryId);
}

/**
 * Получить популярные товары
 */
export async function getPopularProducts(limit: number = 10): Promise<Product[]> {
  const products = await FileManager.readJSON<Product>(config.data.productsPath);
  return products
    .filter((p: Product) => p.isActive)
    .sort((a: Product, b: Product) => b.rating - a.rating)
    .slice(0, limit);
}

/**
 * Получить новые товары
 */
export async function getNewProducts(limit: number = 10): Promise<Product[]> {
  const products = await FileManager.readJSON<Product>(config.data.productsPath);
  return products
    .filter((p: Product) => p.isActive)
    .sort((a: Product, b: Product) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/**
 * Поиск товаров
 */
export async function searchProducts(query: string): Promise<Product[]> {
  return getProducts({ search: query });
}