import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/authService';
import { User } from '../models/User';

// Расширяем интерфейс Request для добавления пользователя
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

/**
 * Middleware для проверки авторизации
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const sessionId = req.cookies?.session_token;
  
  if (!sessionId) {
    res.status(401).json({ 
      success: false, 
      message: 'Не авторизован' 
    });
    return;
  }
  
  try {
    const user = await AuthService.getUserBySessionId(sessionId);
    
    if (!user) {
      res.status(401).json({ 
        success: false, 
        message: 'Сессия истекла или не найдена' 
      });
      return;
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера' 
    });
  }
}

/**
 * Опциональный middleware - не блокирует, но добавляет user если есть
 */
export async function optionalAuthMiddleware(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const sessionId = req.cookies?.session_token;
  
  if (sessionId) {
    try {
      const user = await AuthService.getUserBySessionId(sessionId);
      if (user) {
        req.user = user;
      }
    } catch {
      // Игнорируем ошибки
    }
  }
  
  next();
}