const config = require('../config/config');

function setSessionCookie(res, sessionId) {
  res.cookie(config.session.cookieName, sessionId, {
    httpOnly: true,
    maxAge: config.session.lifetime,
    secure: config.nodeEnv === 'production',
    sameSite: 'strict',
    path: '/'
  });
}

function clearSessionCookie(res) {
  res.clearCookie(config.session.cookieName, {
    httpOnly: true,
    path: '/'
  });
}

function getSessionId(req) {
  return req.cookies[config.session.cookieName] || null;
}

module.exports = {
  setSessionCookie,
  clearSessionCookie,
  getSessionId
};