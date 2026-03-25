import { Address } from '../models/Order';

/**
 * Результат валидации
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Проверяет email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Проверяет телефон
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{10,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Проверяет пароль
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Проверяет логин
 */
export function isValidLogin(login: string): boolean {
  const loginRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return loginRegex.test(login);
}

/**
 * Проверяет имя
 */
export function isValidName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
}

/**
 * Данные регистрации
 */
export interface RegistrationData {
  name: string;
  email: string;
  login: string;
  phone: string;
  password: string;
}

/**
 * Валидирует данные регистрации
 */
export function validateRegistration(userData: RegistrationData): ValidationResult {
  const errors: string[] = [];
  
  if (!isValidName(userData.name)) {
    errors.push('Имя должно содержать от 2 до 100 символов');
  }
  
  if (!isValidEmail(userData.email)) {
    errors.push('Некорректный email');
  }
  
  if (!isValidLogin(userData.login)) {
    errors.push('Логин должен содержать от 3 до 20 символов (буквы, цифры, подчеркивание)');
  }
  
  if (!isValidPhone(userData.phone)) {
    errors.push('Некорректный номер телефона');
  }
  
  if (!isValidPassword(userData.password)) {
    errors.push('Пароль должен содержать минимум 6 символов');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Данные входа
 */
export interface LoginData {
  login: string;
  password: string;
}

/**
 * Валидирует данные входа
 */
export function validateLogin(loginData: LoginData): ValidationResult {
  const errors: string[] = [];
  
  if (!loginData.login) {
    errors.push('Не указан логин');
  }
  
  if (!loginData.password) {
    errors.push('Не указан пароль');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Валидирует адрес
 */
export function validateAddress(address: Address | null | undefined): ValidationResult {
  const errors: string[] = [];
  
  if (!address || typeof address !== 'object') {
    errors.push('Не указан адрес доставки');
    return { valid: false, errors };
  }
  
  if (!address.city || address.city.trim().length < 2) {
    errors.push('Укажите город');
  }
  
  if (!address.street || address.street.trim().length < 2) {
    errors.push('Укажите улицу');
  }
  
  if (!address.house || address.house.trim().length < 1) {
    errors.push('Укажите номер дома');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Данные заказа
 */
export interface OrderValidationData {
  address: Address | null | undefined;
  phone: string;
  email: string;
  deliveryDate: string;
  deliveryTime: string;
  paymentMethod: string;
}

/**
 * Валидирует данные заказа
 */
export function validateOrder(orderData: OrderValidationData): ValidationResult {
  const errors: string[] = [];
  
  const addressValidation = validateAddress(orderData.address);
  if (!addressValidation.valid) {
    errors.push(...addressValidation.errors);
  }
  
  if (!orderData.phone || !isValidPhone(orderData.phone)) {
    errors.push('Некорректный номер телефона');
  }
  
  if (!orderData.email || !isValidEmail(orderData.email)) {
    errors.push('Некорректный email');
  }
  
  if (!orderData.deliveryDate) {
    errors.push('Укажите дату доставки');
  }
  
  if (!orderData.deliveryTime) {
    errors.push('Укажите время доставки');
  }
  
  if (!orderData.paymentMethod) {
    errors.push('Укажите способ оплаты');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}