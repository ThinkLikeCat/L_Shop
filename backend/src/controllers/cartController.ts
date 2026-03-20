import { Request, Response } from 'express';
import * as cartService from '../services/cartService';

/**
 * Получить корзину пользователя
 */
export async function getCart(req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? null;
  
  const cart = await cartService.getUserCart(userId);
  
  res.json({
    success: true,
    cart
  });
}

/**
 * Добавить товар в корзину
 */
export async function addToCart(req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? null;
  const { productId, count = 1 } = req.body;
  
  if (!productId) {
    res.status(400).json({
      success: false,
      message: 'Не указан ID товара'
    });
    return;
  }
  
  try {
    const cart = await cartService.addToCart(productId, count, userId);
    
    res.json({
      success: true,
      message: 'Товар добавлен в корзину',
      cart
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Ошибка добавления товара'
    });
  }
}

/**
 * Обновить количество товара в корзине
 */
export async function updateCartCount(req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? null;
  const productId = req.params.productId as string;
  const { count } = req.body;
  
  if (count === undefined || count < 0) {
    res.status(400).json({
      success: false,
      message: 'Некорректное количество'
    });
    return;
  }
  
  try {
    const cart = await cartService.updateCount(productId, count, userId);
    
    res.json({
      success: true,
      message: count === 0 ? 'Товар удален из корзины' : 'Количество обновлено',
      cart
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Ошибка обновления'
    });
  }
}

/**
 * Удалить товар из корзины
 */
export async function removeFromCart(req: Request, res: Response): Promise<void> {
  const userId = req.user?.id ?? null;
  const productId = req.params.productId as string;
  
  try {
    const cart = await cartService.removeFromCart(productId, userId);
    
    res.json({
      success: true,
      message: 'Товар удален из корзины',
      cart
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Ошибка удаления'
    });
  }
}