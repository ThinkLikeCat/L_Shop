import { Product } from './Product';

/**
 * Товар в корзине
 */
export interface CartItem {
  count: number;
  product: Product;
}

/**
 * Интерфейс корзины
 */
export interface Cart {
  id: string;
  userId: string;
  basket: CartItem[];
}

/**
 * Данные для создания корзины
 */
export interface CreateCartData {
  id?: string;
  userId: string;
  basket?: CartItem[];
}

/**
 * Создает объект корзины с значениями по умолчанию
 */
export function createCart(data: CreateCartData): Cart {
  return {
    id: data.id ?? Date.now().toString(),
    userId: data.userId,
    basket: data.basket ?? []
  };
}

/**
 * Создает элемент корзины
 */
export function createCartItem(product: Product, count: number = 1): CartItem {
  return {
    count,
    product
  };
}

/**
 * Вычисляет общую стоимость корзины
 */
export function calculateCartTotal(cart: Cart): number {
  return cart.basket.reduce((total, item) => {
    const price = item.product.discountPrice ?? item.product.price;
    return total + price * item.count;
  }, 0);
}

/**
 * Вычисляет общее количество товаров в корзине
 */
export function calculateCartItemsCount(cart: Cart): number {
  return cart.basket.reduce((total, item) => total + item.count, 0);
}