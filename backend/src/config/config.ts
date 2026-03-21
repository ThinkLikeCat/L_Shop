import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Базовый путь к данным (относительно скомпилированного файла в dist/config/)
const dataDir = path.join(__dirname, '../../data');

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
    usersPath: path.join(dataDir, 'users.json'),
    productsPath: path.join(dataDir, 'products.json'),
    cartsPath: path.join(dataDir, 'carts.json'),
    ordersPath: path.join(dataDir, 'orders.json'),
    categoriesPath: path.join(dataDir, 'categories.json')
  }
};
