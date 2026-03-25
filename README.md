# 🛒 L_Shop - Интернет-магазин

## 📋 Описание проекта

L_Shop - полнофункциональный интернет-магазин с системой авторизации, каталогом товаров, корзиной и оформлением доставки. Бэкенд написан на TypeScript с использованием Express.js.

## 🏗️ Структура проекта

```
L_Shop/
├── package.json              # Зависимости корневого проекта
├── PROJECT_STRUCTURE_REPORT.md # Отчет о структуре проекта
├── README.md                 # Документация
│
├── backend/                  # Backend на TypeScript
│   ├── package.json          # Зависимости backend
│   ├── tsconfig.json         # Конфигурация TypeScript
│   ├── jest.config.js        # Конфигурация тестов
│   ├── start.js              # Точка входа (компилированный JS)
│   │
│   ├── data/                 # Хранение данных (JSON)
│   │   ├── users.json        # Пользователи
│   │   ├── products.json     # Товары
│   │   ├── carts.json        # Корзины
│   │   ├── orders.json       # Заказы
│   │   └── categories.json   # Категории
│   │
│   └── src/
│       ├── server.ts         # Точка входа сервера
│       │
│       ├── config/
│       │   └── config.ts     # Конфигурация сервера
│       │
│       ├── controllers/
│       │   ├── authController.ts     # Авторизация
│       │   ├── cartController.ts     # Корзина
│       │   ├── deliveryController.ts # Доставка
│       │   └── productController.ts  # Товары
│       │
│       ├── middlewares/
│       │   ├── authMiddleware.ts  # Проверка авторизации
│       │   └── errorHandler.ts    # Обработка ошибок
│       │
│       ├── models/
│       │   ├── User.ts       # Модель пользователя
│       │   ├── Product.ts     # Модель товара
│       │   ├── Cart.ts        # Модель корзины
│       │   ├── Order.ts       # Модель заказа
│       │   └── Category.ts    # Модель категории
│       │
│       ├── routes/
│       │   ├── authRoutes.ts     # Маршруты авторизации
│       │   ├── cartRoutes.ts     # Маршруты корзины
│       │   ├── deliveryRoutes.ts # Маршруты доставки
│       │   └── productRoutes.ts  # Маршруты товаров
│       │
│       ├── services/
│       │   ├── authService.ts    # Сервис авторизации
│       │   ├── cartService.ts    # Сервис корзины
│       │   ├── deliveryService.ts # Сервис доставки
│       │   └── productService.ts  # Сервис товаров
│       │
│       └── utils/
│           ├── fileManager.ts    # Работа с JSON файлами
│           ├── cookieHelper.ts   # Работа с cookies
│           └── validators.ts     # Валидаторы данных
│
└── client/                   # Frontend на TypeScript (Vite)
    ├── index.html            # Точка входа HTML
    ├── package.json          # Зависимости client
    ├── vite.config.ts        # Конфигурация Vite
    │
    ├── public/               # Статические ресурсы
    │   ├── images/           # Изображения (баннеры, логотипы, товары)
    │   └── video/            # Видеофайлы
    │
    └── src/
        ├── main.ts           # Точка входа TypeScript
        ├── style.css         # Глобальные стили
        │
        ├── api/
        │   └── product.ts    # API для работы с товарами
        │
        ├── components/       # Компоненты интерфейса
        │   ├── categories/   # Категории товаров
        │   ├── features/     # Преимущества
        │   ├── footer/       # Подвал сайта
        │   ├── hamilton/     # Блок Hamilton
        │   ├── header/       # Шапка сайта
        │   ├── infa/         # Информационный блок
        │   ├── news/         # Новинки
        │   ├── products/     # Карточки товаров
        │   ├── tag-heuer/    # Блок Tag Heuer
        │   └── videobanner/  # Видеобаннер
        │
        └── pages/            # Страницы приложения
            ├── home/         # Главная страница
            ├── registration/ # Регистрация/Авторизация
            └── trash/        # Корзина
```

---

## 🚀 Установка и запуск

### 📋 Предварительные требования

- **Node.js** >= 16.x
- **npm** >= 8.x

### 📦 Установка зависимостей

```bash
# Установка зависимостей в корневой папке (для TypeScript и общих инструментов)
npm install

# Установка зависимостей backend
cd backend && npm install

# Установка зависимостей client
cd ../client && npm install
```

---

## 🖥️ Запуск проекта

### ⚡ Быстрый старт (режим разработки)

Откройте **два терминала** и выполните команды в указанном порядке:

#### Терминал 1 — Backend API (порт 3001)

```bash
# Из корневой папки проекта
d:\L_Shop\node_modules\.bin\tsc -p d:\L_Shop\backend\tsconfig.json && node d:\L_Shop\backend\dist\server.js
```

После запуска вы увидите:
```
🚀 Сервер запущен на порту 3001
📁 Режим: development
⏰ Время жизни сессии: 10 минут
```

#### Терминал 2 — Frontend (порт 3000)

```bash
cd client
npm run dev
```

После запуска Vite откроет браузер автоматически по адресу http://localhost:3000

---

### 🌐 Адреса серверов

| Сервис | Порт | URL | Что открывается |
|--------|------|-----|------------------|
| **Frontend (Vite)** | 3000 | `http://localhost:3000` | Главная страница магазина |
| **Backend API** | 3001 | `http://localhost:3001` | REST API сервер |
| **Health Check** | 3001 | `http://localhost:3001/api/health` | Проверка состояния сервера |
| **Products API** | 3001 | `http://localhost:3001/api/products` | Список товаров (JSON) |

---

### 📋 Порядок запуска

1. **Сначала запустите Backend** (порт 3001) — сервер должен показать сообщение о запуске
2. **Затем запустите Frontend** (порт 3000) — Vite автоматически откроет браузер
3. **Проверьте связь** — откройте http://localhost:3001/api/health, должно вернуть `{"status":"ok"}`

---

### 🔧 Альтернативные способы запуска

#### Backend через npm скрипты (если настроены)

```bash
cd backend

# Компиляция TypeScript
npm run build

# Запуск скомпилированного сервера
npm start

# Или через ts-node напрямую (требуется глобальная установка)
npx ts-node src/server.ts
```

#### Frontend

```bash
cd client

# Режим разработки
npm run dev

# Сборка для продакшн
npm run build

# Превью собранного проекта
npm run preview
```

---

### 🔧 Продакшн режим

```bash
# Сборка и запуск backend
cd backend
npm run build        # Компиляция TypeScript в dist/
npm start            # Запуск скомпилированного сервера

# Сборка frontend
cd client
npm run build        # Сборка в dist/
npm run preview      # Превью собранного проекта
```

---

## 📡 API Proxy

В режиме разработки Vite проксирует запросы `/api/*` на backend сервер:

```
Frontend: http://localhost:3000/api/products
    ↓ (proxy)
Backend:  http://localhost:3001/api/products
```

---

## 📡 API Документация

### Базовый URL
```
http://localhost:3001
```

---

## 🔐 Аутентификация (`/api/auth`)

### Регистрация пользователя
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "login": "ivan_ivanov",
  "phone": "+79001234567",
  "password": "securePassword123"
}
```

**Особенности:**
- Создает HttpOnly cookie с токеном сессии
- Время жизни cookie: 10 минут
- Cookie не доступна через `document.cookie`

---

### Авторизация пользователя
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "login": "ivan_ivanov",
  "password": "securePassword123"
}
```

---

### Выход из системы
```
POST /api/auth/logout
```

**Требует авторизации:** ✅

---

### Проверка авторизации
```
GET /api/auth/me
```

---

## 📦 Товары (`/api/products`)

### Получить список товаров
```
GET /api/products
```

**Query параметры:**
- `search` - поиск по названию/описанию
- `category` - фильтр по категории
- `minPrice` - минимальная цена
- `maxPrice` - максимальная цена
- `inStock` - только в наличии (true/false)
- `sort` - сортировка (price_asc, price_desc, name, rating)
- `page` - страница (по умолчанию 1)
- `limit` - товаров на странице (по умолчанию 10)

---

### Получить товар по ID
```
GET /api/products/:id
```

---

## 🛒 Корзина (`/api/cart`)

**Все маршруты требуют авторизации** ✅

### Получить корзину
```
GET /api/cart
```

### Добавить товар в корзину
```
POST /api/cart/items
```

**Request Body:**
```json
{
  "productId": "uuid-string",
  "quantity": 2
}
```

### Изменить количество товара
```
PUT /api/cart/items/:productId
```

**Request Body:**
```json
{
  "quantity": 3
}
```

### Удалить товар из корзины
```
DELETE /api/cart/items/:productId
```

### Очистить корзину
```
DELETE /api/cart
```

---

## 🚚 Доставка (`/api/delivery`)

**Все маршруты требуют авторизации** ✅

### Создать заказ
```
POST /api/delivery
```

**Request Body:**
```json
{
  "deliveryAddress": {
    "city": "Москва",
    "street": "ул. Пушкина",
    "house": "10",
    "apartment": "25"
  },
  "phone": "+79001234567",
  "email": "ivan@example.com",
  "deliveryDate": "2026-03-20",
  "deliveryTime": "10:00-14:00",
  "comment": "Позвонить перед доставкой",
  "paymentMethod": "card"
}
```

### Получить заказы пользователя
```
GET /api/delivery
```

### Получить заказ по ID
```
GET /api/delivery/:id
```

---

## 📝 Модели данных

### User (Пользователь)
```typescript
interface User {
  id: string;                    // UUID
  name: string;                  // Имя пользователя
  email: string;                 // Email (уникальный)
  login: string;                 // Логин (уникальный)
  phone: string;                 // Телефон
  password: string;              // Пароль (хешированный)
  avatar?: string;               // URL аватара
  cartId?: string;               // ID активной корзины
  sessionId: string;             // ID сессии
  sessionExpires: Date;          // Время истечения сессии
  createdAt: Date;               // Дата регистрации
  updatedAt: Date;               // Дата обновления
}
```

### Product (Товар)
```typescript
interface Product {
  id: string;                    // UUID
  name: string;                  // Название
  description: string;           // Описание
  price: number;                 // Цена
  discountPrice?: number;        // Цена со скидкой
  categoryId: string;            // ID категории
  images: string[];              // Массив URL изображений
  stock: number;                 // Количество на складе
  isActive: boolean;             // Активен ли товар
  rating: number;                // Рейтинг (1-5)
  reviewsCount: number;          // Количество отзывов
  characteristics: Record<string, unknown>;  // Характеристики
  tags: string[];                // Теги для поиска
  createdAt: Date;
  updatedAt: Date;
}
```

### Cart (Корзина)
```typescript
interface Cart {
  id: string;                    // UUID
  userId: string;                // ID пользователя
  items: CartItem[];             // Товары в корзине
  totalItems: number;            // Общее количество товаров
  totalPrice: number;            // Общая цена
  discountPrice: number;         // Цена со скидками
  isActive: boolean;             // Активная корзина
  createdAt: Date;
  updatedAt: Date;
}
```

### Order (Заказ)
```typescript
interface Order {
  id: string;                    // UUID
  userId: string;                // ID пользователя
  items: OrderItem[];            // Товары в заказе
  deliveryAddress: Address;      // Адрес доставки
  phone: string;                 // Телефон
  email: string;                 // Email
  deliveryDate: Date;            // Дата доставки
  deliveryTime: string;          // Время доставки
  comment?: string;              // Комментарий
  status: OrderStatus;           // Статус заказа
  paymentStatus: PaymentStatus;  // Статус оплаты
  paymentMethod: PaymentMethod;  // Способ оплаты
  totalPrice: number;            // Общая сумма
  trackingNumber?: string;       // Номер отслеживания
  createdAt: Date;
  updatedAt: Date;
}
```

---

## ⚠️ Обработка ошибок

Все ошибки возвращаются в едином формате:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Описание ошибки"
  }
}
```

### Коды ошибок

| Код | HTTP Status | Описание |
|-----|-------------|----------|
| `UNAUTHORIZED` | 401 | Не авторизован |
| `FORBIDDEN` | 403 | Доступ запрещен |
| `NOT_FOUND` | 404 | Ресурс не найден |
| `VALIDATION_ERROR` | 400 | Ошибка валидации |
| `DUPLICATE_ENTRY` | 409 | Дублирование данных |
| `SESSION_EXPIRED` | 401 | Сессия истекла |
| `OUT_OF_STOCK` | 400 | Товар закончился |

---

## 🔧 Переменные окружения

Создайте файл `.env` в папке `backend/`:

```env
PORT=3001
NODE_ENV=development
SESSION_SECRET=your-secret-key
SESSION_LIFETIME=600000
COOKIE_NAME=session_token
```

---

## 📌 Особенности реализации

1. **TypeScript** - полная типизация без использования `any`
2. **HttpOnly Cookies** - безопасное хранение сессий (не доступны через document.cookie)
3. **Сессия 10 минут** - автоматическое разлогинивание по истечении времени
4. **JSON хранилище** - данные хранятся в JSON файлах
5. **Query параметры** - поддержка фильтрации, сортировки и пагинации

---

## 👨‍💻 Команда разработки

Проект разработан группой **Т-394**

| Роль | Разработчик |
|------|-------------|
| 🎯 Тимлид | Зыбайло Михаил |
| 🎨 Frontend | Вольфович Арсений |
| ⚙️ Backend | Коляда Антоний, Охременко Дмитрий |
