import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  port: number;
  nodeEnv: string;
  session: {
    secret: string;
    lifetime: number;
    cookieName: string;
  };
  data: {
    usersPath: string;
    productsPath: string;
    cartsPath: string;
    ordersPath: string;
    categoriesPath: string;
  };
}

export const config: Config = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  session: {
    secret: process.env.SESSION_SECRET ?? 'default_secret',
    lifetime: parseInt(process.env.SESSION_LIFETIME ?? '600000', 10),
    cookieName: process.env.COOKIE_NAME ?? 'session_token'
  },
  data: {
    usersPath: '../data/users.json',
    productsPath: '../data/products.json',
    cartsPath: '../data/carts.json',
    ordersPath: '../data/orders.json',
    categoriesPath: '../data/categories.json'
  }
};