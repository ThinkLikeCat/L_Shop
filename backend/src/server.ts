import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { config } from './config/config';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes';
import deliveryRoutes from './routes/deliveryRoutes';
import productRoutes from './routes/productRoutes';
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'L_Shop API',
      version: '1.0.0',
      description: 'Документация API для интернет-магазина L_Shop',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
      },
    ],
    paths: {},
  },
  apis: ['./src/routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/products', productRoutes);
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/api-docs')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'));
});
app.use(errorHandler);
app.listen(config.port, () => {
  console.log(`🚀 Сервер запущен на порту ${config.port}`);
  console.log(`📁 Режим: ${config.nodeEnv}`);
  console.log(` Swagger доступен по адресу: http://localhost:${config.port}/api-docs`);
});
export default app;
