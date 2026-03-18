const config = require('../config/config');

/**
 * Установка cookie с токеном сессии
 * @param {Response} res - Express Response объект
 * @param {string} sessionId - ID сессии
 */
function setSessionCookie(res, sessionId) {
  res.cookie(config.session.cookieName, sessionId, {
    httpOnly: true,
    maxAge: config.session.lifetime,
    secure: config.nodeEnv === 'production',
    sameSite: 'strict',
    path: '/'
  });
}

/**
 * Удаление cookie сессии
 * @param {Response} res - Express Response объект
 */
function clearSessionCookie(res) {
  res.clearCookie(config.session.cookieName, {
    httpOnly: true,
    path: '/'
  });
}

/**
 * Получение ID сессии из cookies
 * @param {Request} req - Express Request объект
 * @returns {string|null} - ID сессии или null
 */
function getSessionId(req) {
  return req.cookies[config.session.cookieName] || null;
}

module.exports = {
  setSessionCookie,
  clearSessionCookie,
  getSessionId
};