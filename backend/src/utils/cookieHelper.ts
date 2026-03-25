import { Response, Request } from 'express';
import { config } from '../config/config';

/**
 * Устанавливает HttpOnly куку сессии
 */
export function setSessionCookie(res: Response, sessionId: string): void {
  res.cookie(config.session.cookieName, sessionId, {
    httpOnly: true,
    maxAge: config.session.lifetime,
    secure: config.nodeEnv === 'production',
    sameSite: 'strict',
    path: '/'
  });
}

/**
 * Удаляет куку сессии
 */
export function clearSessionCookie(res: Response): void {
  res.clearCookie(config.session.cookieName, {
    httpOnly: true,
    path: '/'
  });
}

/**
 * Получает ID сессии из куки
 */
export function getSessionId(req: Request): string | null {
  return req.cookies[config.session.cookieName] ?? null;
}