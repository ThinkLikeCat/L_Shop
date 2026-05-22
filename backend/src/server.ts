import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { config } from './config/config';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes';
import deliveryRoutes from './routes/deliveryRoutes';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
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
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/delivery', deliveryRoutes);
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  console.log(`Swagger documentation available at http://localhost:${config.port}/api-docs`);
});
