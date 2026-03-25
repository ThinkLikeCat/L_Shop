import * as FileManager from '../utils/fileManager';
import { config } from '../config/config';
import { Cart, CartItem, createCart } from '../models/Cart';
import { Product } from '../models/Product';

/**
 * Получить корзину пользователя по userId
 */
export async function getUserCart(userId: string | null): Promise<Cart> {
  const carts = await FileManager.readJSON<Cart>(config.data.cartsPath);
  const cartId = userId ?? 'guest';
  
  let cart = carts.find((c: Cart) => c.userId === cartId);
  
  if (!cart) {
    cart = createCart({ userId: cartId });
    carts.push(cart);
    await FileManager.writeJSON(config.data.cartsPath, carts);
  }
  
  return cart;
}

/**
 * Добавить товар в корзину
 */
export async function addToCart(productId: string, count: number = 1, userId: string | null): Promise<Cart> {
  const carts = await FileManager.readJSON<Cart>(config.data.cartsPath);
  const cartId = userId ?? 'guest';
  
  let cart = carts.find((c: Cart) => c.userId === cartId);
  
  if (!cart) {
    cart = createCart({ userId: cartId });
    carts.push(cart);
  }
  
  // Получаем продукт
  const products = await FileManager.readJSON<Product>(config.data.productsPath);
  const product = products.find((p: Product) => p.id === productId);
  
  if (!product) {
    throw new Error('Товар не найден');
  }
  
  if (product.stock < count) {
    throw new Error('Недостаточно товара на складе');
  }
  
  const existingItem = cart.basket.find((i: CartItem) => i.product.id === productId);
  
  if (existingItem) {
    existingItem.count += count;
  } else {
    cart.basket.push({
      count,
      product
    });
  }
  
  await FileManager.writeJSON(config.data.cartsPath, carts);
  return cart;
}

/**
 * Обновить количество товара в корзине
 */
export async function updateCount(productId: string, count: number, userId: string | null): Promise<Cart> {
  const carts = await FileManager.readJSON<Cart>(config.data.cartsPath);
  const cartId = userId ?? 'guest';
  
  const cart = carts.find((c: Cart) => c.userId === cartId);
  
  if (!cart) {
    throw new Error('Корзина не найдена');
  }
  
  const item = cart.basket.find((i: CartItem) => i.product.id === productId);
  
  if (!item) {
    throw new Error('Товар не найден в корзине');
  }
  
  if (count <= 0) {
    cart.basket = cart.basket.filter((i: CartItem) => i.product.id !== productId);
  } else {
    item.count = count;
  }
  
  await FileManager.writeJSON(config.data.cartsPath, carts);
  return cart;
}

/**
 * Удалить товар из корзины
 */
export async function removeFromCart(productId: string, userId: string | null): Promise<Cart> {
  const carts = await FileManager.readJSON<Cart>(config.data.cartsPath);
  const cartId = userId ?? 'guest';
  
  const cart = carts.find((c: Cart) => c.userId === cartId);
  
  if (!cart) {
    throw new Error('Корзина не найдена');
  }
  
  cart.basket = cart.basket.filter((i: CartItem) => i.product.id !== productId);
  
  await FileManager.writeJSON(config.data.cartsPath, carts);
  return cart;
}

/**
 * Очистить корзину
 */
export async function clearCart(userId: string | null): Promise<Cart | null> {
  const carts = await FileManager.readJSON<Cart>(config.data.cartsPath);
  const cartId = userId ?? 'guest';
  
  const cart = carts.find((c: Cart) => c.userId === cartId);
  
  if (cart) {
    cart.basket = [];
    await FileManager.writeJSON(config.data.cartsPath, carts);
  }
  
  return cart ?? null;
}