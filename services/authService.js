const { v4: uuidv4 } = require('uuid');
const FileManager = require('../utils/fileManager');
const config = require('../config/config');

class AuthService {
  static async register(userData) {
    const { name, email, login, phone, password } = userData;
    
    const existingUser = await FileManager.findOne(
      config.data.usersPath,
      u => u.email === email || u.login === login
    );
    
    if (existingUser) {
      if (existingUser.email === email) {
        throw { code: 'DUPLICATE_ENTRY', message: 'Пользователь с таким email уже существует', statusCode: 409 };
      }
      if (existingUser.login === login) {
        throw { code: 'DUPLICATE_ENTRY', message: 'Пользователь с таким логином уже существует', statusCode: 409 };
      }
    }
    
    const userId = uuidv4();
    const now = new Date().toISOString();
    
    const newUser = {
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
    
    await FileManager.insert(config.data.usersPath, newUser);
    
    return newUser;
  }
  
  static async login(login, password) {
    const user = await FileManager.findOne(
      config.data.usersPath,
      u => u.login === login && u.password === password
    );
    
    if (!user) {
      throw { code: 'UNAUTHORIZED', message: 'Неверный логин или пароль', statusCode: 401 };
    }
    
    const sessionId = uuidv4();
    const sessionExpires = new Date(Date.now() + config.session.lifetime).toISOString();
    
    await FileManager.update(
      config.data.usersPath,
      u => u.id === user.id,
      { sessionId, sessionExpires }
    );
    
    return { user, sessionId };
  }
  
  static async logout(userId) {
    await FileManager.update(
      config.data.usersPath,
      u => u.id === userId,
      { sessionId: null, sessionExpires: null }
    );
  }
  
  static async getUserBySessionId(sessionId) {
    const user = await FileManager.findOne(
      config.data.usersPath,
      u => u.sessionId === sessionId && new Date(u.sessionExpires) > new Date()
    );
    
    return user;
  }
  
  static async getUserById(userId) {
    return await FileManager.findOne(
      config.data.usersPath,
      u => u.id === userId
    );
  }
}

module.exports = AuthService;