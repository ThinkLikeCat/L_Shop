import * as FileManager from '../utils/fileManager';
import { config } from '../config/config';
import { Order, OrderStatus, PaymentMethod, createOrder, OrderItem } from '../models/Order';
import { Cart, CartItem } from '../models/Cart';
import { clearCart } from './cartService';

interface CreateOrderInput {
  city: string;
  street: string;
  house: string;
  apartment?: string;
  postalCode?: string;
  phone: string;
  email: string;
  deliveryDate: string;
  deliveryTime: string;
  comment?: string;
  paymentMethod: PaymentMethod;
}

/**
 * Получить все заказы пользователя
 */
export async function getUserOrders(userId: string | null): Promise<Order[]> {
  const orders = await FileManager.readJSON<Order>(config.data.ordersPath);
  const cartId = userId ?? 'guest';
  return orders.filter((o: Order) => o.userId === cartId);
}

/**
 * Получить заказ по ID
 */
export async function getOrderById(id: string): Promise<Order | null> {
  const orders = await FileManager.readJSON<Order>(config.data.ordersPath);
  return orders.find((o: Order) => o.id === id) ?? null;
}

/**
 * Создать новый заказ
 */
export async function createNewOrder(data: CreateOrderInput, userId: string | null, cart: Cart): Promise<Order> {
  const orders = await FileManager.readJSON<Order>(config.data.ordersPath);
  const cartId = userId ?? 'guest';
  
  const totalPrice = cart.basket.reduce((sum: number, item: CartItem) => {
    const price = item.product.discountPrice ?? item.product.price;
    return sum + price * item.count;
  }, 0);
  
  const items: OrderItem[] = cart.basket.map((item: CartItem) => ({
    productId: item.product.id,
    productName: item.product.name,
    quantity: item.count,
    price: item.product.discountPrice ?? item.product.price,
    image: item.product.images?.[0] ?? null
  }));
  
  const newOrder = createOrder({
    userId: cartId,
    items,
    deliveryAddress: {
      city: data.city,
      street: data.street,
      house: data.house,
      apartment: data.apartment,
      postalCode: data.postalCode
    },
    phone: data.phone,
    email: data.email,
    deliveryDate: data.deliveryDate,
    deliveryTime: data.deliveryTime,
    comment: data.comment,
    paymentMethod: data.paymentMethod,
    totalPrice
  });
  
  orders.push(newOrder);
  await FileManager.writeJSON(config.data.ordersPath, orders);
  
  // Очищаем корзину после оформления заказа
  await clearCart(userId);
  
  return newOrder;
}

/**
 * Отменить заказ
 */
export async function cancelOrder(id: string, userId: string | null): Promise<Order> {
  const orders = await FileManager.readJSON<Order>(config.data.ordersPath);
  const cartId = userId ?? 'guest';
  
  const order = orders.find((o: Order) => o.id === id && o.userId === cartId);
  
  if (!order) {
    throw new Error('Заказ не найден');
  }
  
  if (order.status === 'cancelled') {
    throw new Error('Заказ уже отменен');
  }
  
  if (order.status === 'delivered') {
    throw new Error('Нельзя отменить доставленный заказ');
  }
  
  order.status = 'cancelled' as OrderStatus;
  order.updatedAt = new Date().toISOString();
  
  await FileManager.writeJSON(config.data.ordersPath, orders);
  return order;
}

/**
 * Обновить статус заказа (для админки)
 */
export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  const orders = await FileManager.readJSON<Order>(config.data.ordersPath);
  const order = orders.find((o: Order) => o.id === id);
  
  if (!order) {
    throw new Error('Заказ не найден');
  }
  
  order.status = status;
  order.updatedAt = new Date().toISOString();
  
  await FileManager.writeJSON(config.data.ordersPath, orders);
  return order;
}