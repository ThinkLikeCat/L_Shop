require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  session: {
    secret: process.env.SESSION_SECRET || 'default_secret',
    lifetime: parseInt(process.env.SESSION_LIFETIME) || 600000, // 10 минут
    cookieName: process.env.COOKIE_NAME || 'session_token'
  },
  data: {
    usersPath: './data/users.json'
  }
};