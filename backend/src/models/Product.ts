/**
 * Характеристики товара
 */
export interface ProductCharacteristics {
  brand?: string;
  mechanism?: string;
  waterResistance?: string;
  caseMaterial?: string;
  strapMaterial?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Интерфейс товара
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  categoryId: string;
  images: string[];
  stock: number;
  isActive: boolean;
  rating: number;
  reviewsCount: number;
  characteristics: ProductCharacteristics;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Данные для создания товара
 */
export interface CreateProductData {
  id: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number | null;
  categoryId: string;
  images?: string[];
  stock?: number;
  isActive?: boolean;
  rating?: number;
  reviewsCount?: number;
  characteristics?: ProductCharacteristics;
  tags?: string[];
  createdAt?: string;
}

/**
 * Создает объект товара с значениями по умолчанию
 */
export function createProduct(data: CreateProductData): Product {
  const now = new Date().toISOString();
  return {
    id: data.id,
    name: data.name,
    description: data.description ?? '',
    price: data.price,
    discountPrice: data.discountPrice ?? null,
    categoryId: data.categoryId,
    images: data.images ?? [],
    stock: data.stock ?? 0,
    isActive: data.isActive !== undefined ? data.isActive : true,
    rating: data.rating ?? 0,
    reviewsCount: data.reviewsCount ?? 0,
    characteristics: data.characteristics ?? {},
    tags: data.tags ?? [],
    createdAt: data.createdAt ?? now,
    updatedAt: now
  };
}

/**
 * Возвращает цену товара (со скидкой если есть)
 */
export function getEffectivePrice(product: Product): number {
  return product.discountPrice !== null && product.discountPrice < product.price
    ? product.discountPrice
    : product.price;
}

/**
 * Проверяет доступность товара
 */
export function isAvailable(product: Product): boolean {
  return product.isActive && product.stock > 0;
}