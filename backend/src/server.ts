import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config/config';
import { errorHandler } from './middlewares/errorHandler';

// Импорт маршрутов
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes';
import deliveryRoutes from './routes/deliveryRoutes';
import productRoutes from './routes/productRoutes';

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Маршрут не найден'
  });
});

// Error handler
app.use(errorHandler);

// Запуск сервера
app.listen(config.port, () => {
  console.log(`🚀 Сервер запущен на порту ${config.port}`);
  console.log(`📁 Режим: ${config.nodeEnv}`);
  console.log(`⏰ Время жизни сессии: ${config.session.lifetime / 1000 / 60} минут`);
});

export default app;