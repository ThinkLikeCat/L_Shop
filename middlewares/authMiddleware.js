const FileManager = require('../utils/fileManager');
const { getSessionId } = require('../utils/cookieHelper');
const config = require('../config/config');

/**
 * Middleware для проверки авторизации
 */
async function authMiddleware(req, res, next) {
  try {
    const sessionId = getSessionId(req);
    
    if (!sessionId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Не авторизован'
        }
      });
    }
    
    const user = await FileManager.findOne(
      config.data.usersPath,
      u => u.sessionId === sessionId && new Date(u.sessionExpires) > new Date()
    );
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'SESSION_EXPIRED',
          message: 'Сессия истекла'
        }
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authMiddleware;