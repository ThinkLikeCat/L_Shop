import { v4 as uuidv4 } from 'uuid';
import * as FileManager from '../utils/fileManager';
import { config } from '../config/config';
import { User, CreateUserData } from '../models/User';

class AuthError extends Error {
  public code: string;
  public statusCode: number;
  
  constructor(message: string, code: string, statusCode: number) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}

class AuthService {
  /**
   * Регистрация нового пользователя
   */
  static async register(userData: CreateUserData): Promise<User> {
    const { name, email, login, phone, password } = userData;
    
    const existingUser = await FileManager.findOne<User>(
      config.data.usersPath,
      (u: User) => u.email === email || u.login === login
    );
    
    if (existingUser) {
      if (existingUser.email === email) {
        throw new AuthError('Пользователь с таким email уже существует', 'DUPLICATE_ENTRY', 409);
      }
      if (existingUser.login === login) {
        throw new AuthError('Пользователь с таким логином уже существует', 'DUPLICATE_ENTRY', 409);
      }
    }
    
    const userId = uuidv4();
    const now = new Date().toISOString();
    
    const newUser: User = {
      id: userId,
      name,
      email,
      login,
      phone,
      password,
      avatar: null,
      cartId: null,
      sessionId: null,
      sessionExpires: null,
      createdAt: now,
      updatedAt: now
    };
    
    await FileManager.insert<User>(config.data.usersPath, newUser);
    
    return newUser;
  }
  
  /**
   * Авторизация пользователя
   */
  static async login(login: string, password: string): Promise<{ user: User; sessionId: string }> {
    const user = await FileManager.findOne<User>(
      config.data.usersPath,
      (u: User) => u.login === login && u.password === password
    );
    
    if (!user) {
      throw new AuthError('Неверный логин или пароль', 'UNAUTHORIZED', 401);
    }
    
    const sessionId = uuidv4();
    const sessionExpires = new Date(Date.now() + config.session.lifetime).toISOString();
    
    await FileManager.update<User>(
      config.data.usersPath,
      (u: User) => u.id === user.id,
      { sessionId, sessionExpires }
    );
    
    return { user, sessionId };
  }
  
  /**
   * Выход из системы
   */
  static async logout(userId: string): Promise<void> {
    await FileManager.update<User>(
      config.data.usersPath,
      (u: User) => u.id === userId,
      { sessionId: null, sessionExpires: null }
    );
  }
  
  /**
   * Получение пользователя по ID сессии
   */
  static async getUserBySessionId(sessionId: string): Promise<User | null> {
    return await FileManager.findOne<User>(
      config.data.usersPath,
      (u: User) => u.sessionId === sessionId && new Date(u.sessionExpires!) > new Date()
    );
  }
  
  /**
   * Получение пользователя по ID
   */
  static async getUserById(userId: string): Promise<User | null> {
    return await FileManager.findOne<User>(
      config.data.usersPath,
      (u: User) => u.id === userId
    );
  }
}

export default AuthService;