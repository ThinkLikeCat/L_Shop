import { Request, Response } from 'express';
import AuthService from '../services/authService';
import { setSessionCookie, clearSessionCookie } from '../utils/cookieHelper';
import { validateRegistration, validateLogin } from '../utils/validators';
import { toSafeUser } from '../models/User';

/**
 * Регистрация пользователя
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, login, phone, password } = req.body;
    
    const validation = validateRegistration({ name, email, login, phone, password });
    
    if (!validation.valid) {
      res.status(400).json({
        success: false,
        errors: validation.errors
      });
      return;
    }
    
    const user = await AuthService.register({ 
      id: '', 
      name, 
      email, 
      login, 
      phone, 
      password 
    });
    
    const { sessionId } = await AuthService.login(login, password);
    
    setSessionCookie(res, sessionId);
    
    res.status(201).json({
      success: true,
      message: 'Регистрация успешна',
      user: toSafeUser(user)
    });
  } catch (error) {
    const authError = error as { statusCode?: number; message: string; code?: string };
    res.status(authError.statusCode ?? 500).json({
      success: false,
      message: authError.message,
      code: authError.code ?? 'INTERNAL_ERROR'
    });
  }
}

/**
 * Авторизация пользователя
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { login, password } = req.body;
    
    const validation = validateLogin({ login, password });
    
    if (!validation.valid) {
      res.status(400).json({
        success: false,
        errors: validation.errors
      });
      return;
    }
    
    const { user, sessionId } = await AuthService.login(login, password);
    
    setSessionCookie(res, sessionId);
    
    res.json({
      success: true,
      message: 'Вход выполнен',
      user: toSafeUser(user)
    });
  } catch (error) {
    const authError = error as { statusCode?: number; message: string; code?: string };
    res.status(authError.statusCode ?? 500).json({
      success: false,
      message: authError.message,
      code: authError.code ?? 'INTERNAL_ERROR'
    });
  }
}

/**
 * Выход из системы
 */
export async function logout(req: Request, res: Response): Promise<void> {
  const userId = req.user?.id;
  
  if (userId) {
    await AuthService.logout(userId);
  }
  
  clearSessionCookie(res);
  
  res.json({
    success: true,
    message: 'Выход выполнен'
  });
}

/**
 * Получение текущего пользователя
 */
export async function getMe(req: Request, res: Response): Promise<void> {
  const user = req.user;
  
  if (!user) {
    res.status(401).json({
      success: false,
      message: 'Не авторизован'
    });
    return;
  }
  
  res.json({
    success: true,
    user: toSafeUser(user)
  });
}