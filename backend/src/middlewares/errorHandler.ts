import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

/**
 * Middleware для обработки ошибок
 */
export function errorHandler(
  err: CustomError, 
  _req: Request, 
  res: Response, 
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? 500;
  
  console.error(`[${new Date().toISOString()}] Error:`, err.message);
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    code: err.code ?? 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

/**
 * Создает ошибку с кодом статуса
 */
export function createError(message: string, statusCode: number, code?: string): CustomError {
  const error: CustomError = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
}