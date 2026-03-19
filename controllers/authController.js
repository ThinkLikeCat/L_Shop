const AuthService = require('../services/authService');
const { setSessionCookie, clearSessionCookie, getSessionId } = require('../utils/cookieHelper');
const { validateRegistration, validateLogin } = require('../utils/validators');

async function register(req, res, next) {
  try {
    const validation = validateRegistration(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Ошибка валидации данных',
          details: { errors: validation.errors }
        }
      });
    }

    const user = await AuthService.register(req.body);
    
    const { sessionId } = await AuthService.login(req.body.login, req.body.password);
    setSessionCookie(res, sessionId);

    res.status(201).json({
      success: true,
      message: 'Пользователь успешно зарегистрирован',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        login: user.login,
        phone: user.phone,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const validation = validateLogin(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Ошибка валидации данных',
          details: { errors: validation.errors }
        }
      });
    }

    const { user, sessionId } = await AuthService.login(req.body.login, req.body.password);
    setSessionCookie(res, sessionId);

    res.json({
      success: true,
      message: 'Авторизация успешна',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        login: user.login,
        phone: user.phone
      }
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    if (req.user) {
      await AuthService.logout(req.user.id);
    }
    clearSessionCookie(res);

    res.json({
      success: true,
      message: 'Вы успешно вышли из системы'
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    const sessionId = getSessionId(req);
    
    if (!sessionId) {
      return res.json({
        success: true,
        authenticated: false,
        user: null
      });
    }

    const user = await AuthService.getUserBySessionId(sessionId);

    res.json({
      success: true,
      authenticated: !!user,
      user: user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        login: user.login
      } : null
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  logout,
  me
};