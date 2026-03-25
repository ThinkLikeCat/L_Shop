import { Request, Response } from 'express';
import * as deliveryService from '../services/deliveryService';
import * as cartService from '../services/cartService';
import { validateOrder } from '../utils/validators';
import { PaymentMethod } from '../models/Order';

/**
 * Получить все заказы пользователя
 */
export async function getOrders(req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? null;
  
  const orders = await deliveryService.getUserOrders(userId);
  
  res.json({
    success: true,
    orders
  });
}

/**
 * Получить заказ по ID
 */
export async function getOrderById(req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? null;
  const orderId = req.params.id as string;
  
  const order = await deliveryService.getOrderById(orderId);
  
  if (!order || order.userId !== userId) {
    res.status(404).json({
      success: false,
      message: 'Заказ не найден'
    });
    return;
  }
  
  res.json({
    success: true,
    order
  });
}

/**
 * Создать новый заказ
 */
export async function createOrder(req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? null;
  
  const {
    city,
    street,
    house,
    apartment,
    postalCode,
    phone,
    email,
    deliveryDate,
    deliveryTime,
    comment,
    paymentMethod
  } = req.body;
  
  const validation = validateOrder({
    address: { city, street, house, apartment, postalCode },
    phone,
    email,
    deliveryDate,
    deliveryTime,
    paymentMethod
  });
  
  if (!validation.valid) {
    res.status(400).json({
      success: false,
      errors: validation.errors
    });
    return;
  }
  
  try {
    const cart = await cartService.getUserCart(userId);
    
    if (cart.basket.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Корзина пуста'
      });
      return;
    }
    
    const order = await deliveryService.createNewOrder(
      {
        city,
        street,
        house,
        apartment,
        postalCode,
        phone,
        email,
        deliveryDate,
        deliveryTime,
        comment,
        paymentMethod: paymentMethod as PaymentMethod
      },
      userId,
      cart
    );
    
    res.status(201).json({
      success: true,
      message: 'Заказ создан',
      order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Ошибка создания заказа'
    });
  }
}

/**
 * Отменить заказ
 */
export async function cancelOrder(req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? null;
  const orderId = req.params.id as string;
  
  try {
    const order = await deliveryService.cancelOrder(orderId, userId);
    
    res.json({
      success: true,
      message: 'Заказ отменен',
      order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Ошибка отмены заказа'
    });
  }
}