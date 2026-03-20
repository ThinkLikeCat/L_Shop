/**
 * Интерфейс пользователя
 */
export interface User {
  id: string;
  name: string;
  email: string;
  login: string;
  phone: string;
  password: string;
  avatar: string | null;
  cartId: string | null;
  sessionId: string | null;
  sessionExpires: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Данные для создания пользователя
 */
export interface CreateUserData {
  id?: string;
  name: string;
  email: string;
  login: string;
  phone: string;
  password: string;
  avatar?: string | null;
  cartId?: string | null;
  sessionId?: string | null;
  sessionExpires?: string | null;
  createdAt?: string;
}

/**
 * Безопасные данные пользователя (без пароля)
 */
export type SafeUser = Omit<User, 'password'>;

/**
 * Создает объект пользователя с значениями по умолчанию
 */
export function createUser(data: CreateUserData): User {
  const now = new Date().toISOString();
  return {
    id: data.id ?? '',
    name: data.name,
    email: data.email,
    login: data.login,
    phone: data.phone,
    password: data.password,
    avatar: data.avatar ?? null,
    cartId: data.cartId ?? null,
    sessionId: data.sessionId ?? null,
    sessionExpires: data.sessionExpires ?? null,
    createdAt: data.createdAt ?? now,
    updatedAt: now
  };
}

/**
 * Возвращает безопасные данные пользователя (без пароля)
 */
export function toSafeUser(user: User): SafeUser {
  const { password, ...safeUser } = user;
  return safeUser;
}