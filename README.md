# 🛒 L_Shop - Интернет-магазин

## 📋 Описание проекта

L_Shop - это полнофункциональный бэкенд для интернет-магазина с системой регистрации пользователей, каталогом товаров, корзиной и оформлением доставки.

## 🏗️ Структура проекта

```
L_Shop/
├── server.js                 # Точка входа сервера
├── package.json              # Зависимости проекта
├── README.md                 # Документация
├── .env                      # Переменные окружения
│
├── config/
│   └── config.js             # Конфигурация сервера
│
├── controllers/
│   ├── authController.js     # Контроллер авторизации
│   ├── userController.js     # Контроллер пользователей
│   ├── productController.js  # Контроллер товаров
│   ├── cartController.js     # Контроллер корзины
│   └── deliveryController.js # Контроллер доставки
│
├── middlewares/
│   ├── authMiddleware.js     # Проверка авторизации
│   ├── errorHandler.js       # Обработка ошибок
│   └── validateMiddleware.js # Валидация данных
│
├── models/
│   ├── User.js               # Модель пользователя
│   ├── Product.js            # Модель товара
│   ├── Cart.js               # Модель корзины
│   ├── Order.js              # Модель заказа
│   └── Category.js           # Модель категории
│
├── routes/
│   ├── authRoutes.js         # Маршруты авторизации
│   ├── userRoutes.js         # Маршруты пользователей
│   ├── productRoutes.js      # Маршруты товаров
│   ├── cartRoutes.js         # Маршруты корзины
│   └── deliveryRoutes.js     # Маршруты доставки
│
├── services/
│   ├── authService.js        # Сервис авторизации
│   ├── productService.js     # Сервис товаров
│   ├── cartService.js        # Сервис корзины
│   └── deliveryService.js    # Сервис доставки
│
├── utils/
│   ├── fileManager.js        # Работа с JSON файлами
│   ├── cookieHelper.js       # Работа с cookies
│   └── validators.js         # Валидаторы данных
│
└── data/
    ├── users.json            # Данные пользователей
    ├── products.json         # Данные товаров
    ├── carts.json            # Данные корзин
    ├── orders.json           # Данные заказов
    └── categories.json       # Данные категорий
```

---

## 🚀 Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Запуск в продакшн режиме
npm start
```

---

## 📡 API Документация

### Базовый URL
```
http://localhost:3000/api
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

**Response (201):**
```json
{
  "success": true,
  "message": "Пользователь успешно зарегистрирован",
  "user": {
    "id": "uuid-string",
    "name": "Иван Иванов",
    "email": "ivan@example.com",
    "login": "ivan_ivanov",
    "phone": "+79001234567",
    "createdAt": "2026-03-13T18:00:00.000Z"
  }
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

**Response (200):**
```json
{
  "success": true,
  "message": "Авторизация успешна",
  "user": {
    "id": "uuid-string",
    "name": "Иван Иванов",
    "email": "ivan@example.com",
    "login": "ivan_ivanov",
    "phone": "+79001234567"
  }
}
```

---

### Выход из системы
```
POST /api/auth/logout
```

**Response (200):**
```json
{
  "success": true,
  "message": "Вы успешно вышли из системы"
}
```

---

### Проверка авторизации
```
GET /api/auth/me
```

**Response (200):**
```json
{
  "success": true,
  "authenticated": true,
  "user": {
    "id": "uuid-string",
    "name": "Иван Иванов",
    "email": "ivan@example.com"
  }
}
```

---

## 👤 Пользователи (`/api/users`)

### Получить профиль пользователя
```
GET /api/users/profile
```

**Требует авторизации:** ✅

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid-string",
    "name": "Иван Иванов",
    "email": "ivan@example.com",
    "login": "ivan_ivanov",
    "phone": "+79001234567",
    "createdAt": "2026-03-13T18:00:00.000Z",
    "cartId": "cart-uuid",
    "orders": []
  }
}
```

---

### Обновить профиль пользователя
```
PUT /api/users/profile
```

**Требует авторизации:** ✅

**Request Body:**
```json
{
  "name": "Иван Петров",
  "phone": "+79009876543"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Профиль обновлен",
  "user": {
    "id": "uuid-string",
    "name": "Иван Петров",
    "phone": "+79009876543"
  }
}
```

---

## 📦 Товары (`/api/products`)

### Получить список товаров
```
GET /api/products
```

**Query Parameters:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `search` | string | Поиск по названию/описанию |
| `category` | string | Фильтр по категории |
| `minPrice` | number | Минимальная цена |
| `maxPrice` | number | Максимальная цена |
| `inStock` | boolean | Только в наличии |
| `sortBy` | string | Сортировка: `price`, `name`, `createdAt` |
| `sortOrder` | string | Порядок: `asc`, `desc` |
| `page` | number | Номер страницы (по умолчанию 1) |
| `limit` | number | Количество на странице (по умолчанию 20) |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid-string",
        "name": "Смартфон Samsung Galaxy",
        "description": "Флагманский смартфон",
        "price": 59990,
        "discountPrice": 49990,
        "category": "electronics",
        "images": ["image1.jpg", "image2.jpg"],
        "stock": 15,
        "rating": 4.5,
        "reviews": 128,
        "characteristics": {
          "color": "black",
          "memory": "256GB"
        },
        "createdAt": "2026-03-13T18:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 100,
      "itemsPerPage": 20
    }
  }
}
```

---

### Получить товар по ID
```
GET /api/products/:id
```

**Response (200):**
```json
{
  "success": true,
  "product": {
    "id": "uuid-string",
    "name": "Смартфон Samsung Galaxy",
    "description": "Флагманский смартфон с лучшими характеристиками",
    "price": 59990,
    "discountPrice": 49990,
    "category": {
      "id": "cat-uuid",
      "name": "Электроника",
      "slug": "electronics"
    },
    "images": ["image1.jpg", "image2.jpg"],
    "stock": 15,
    "rating": 4.5,
    "reviews": [
      {
        "id": "review-uuid",
        "userId": "user-uuid",
        "userName": "Иван",
        "rating": 5,
        "comment": "Отличный товар!",
        "createdAt": "2026-03-13T18:00:00.000Z"
      }
    ],
    "characteristics": {
      "color": "black",
      "memory": "256GB",
      "screen": "6.7 дюймов"
    },
    "createdAt": "2026-03-13T18:00:00.000Z",
    "updatedAt": "2026-03-13T18:00:00.000Z"
  }
}
```

---

### Получить категории товаров
```
GET /api/products/categories
```

**Response (200):**
```json
{
  "success": true,
  "categories": [
    {
      "id": "cat-uuid",
      "name": "Электроника",
      "slug": "electronics",
      "icon": "📱",
      "productCount": 150
    },
    {
      "id": "cat-uuid-2",
      "name": "Одежда",
      "slug": "clothing",
      "icon": "👕",
      "productCount": 320
    }
  ]
}
```

---

## 🛒 Корзина (`/api/cart`)

> ⚠️ Все эндпоинты корзины требуют авторизации

### Получить корзину пользователя
```
GET /api/cart
```

**Response (200):**
```json
{
  "success": true,
  "cart": {
    "id": "cart-uuid",
    "userId": "user-uuid",
    "items": [
      {
        "id": "item-uuid",
        "productId": "product-uuid",
        "product": {
          "id": "product-uuid",
          "name": "Смартфон Samsung Galaxy",
          "price": 59990,
          "discountPrice": 49990,
          "images": ["image1.jpg"],
          "stock": 15
        },
        "quantity": 2,
        "price": 99980
      }
    ],
    "totalItems": 2,
    "totalPrice": 99980,
    "discountPrice": 83980,
    "createdAt": "2026-03-13T18:00:00.000Z",
    "updatedAt": "2026-03-13T18:00:00.000Z"
  }
}
```

---

### Добавить товар в корзину
```
POST /api/cart/items
```

**Request Body:**
```json
{
  "productId": "product-uuid",
  "quantity": 2
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Товар добавлен в корзину",
  "cartItem": {
    "id": "item-uuid",
    "productId": "product-uuid",
    "quantity": 2,
    "price": 99980
  }
}
```

---

### Обновить количество товара в корзине
```
PUT /api/cart/items/:itemId
```

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Количество обновлено",
  "cartItem": {
    "id": "item-uuid",
    "quantity": 3,
    "price": 149970
  }
}
```

---

### Удалить товар из корзины
```
DELETE /api/cart/items/:itemId
```

**Response (200):**
```json
{
  "success": true,
  "message": "Товар удален из корзины"
}
```

---

### Очистить корзину
```
DELETE /api/cart
```

**Response (200):**
```json
{
  "success": true,
  "message": "Корзина очищена"
}
```

---

## 🚚 Доставка (`/api/delivery`)

> ⚠️ Все эндпоинты доставки требуют авторизации

### Создать заказ на доставку
```
POST /api/delivery
```

**Request Body:**
```json
{
  "address": {
    "city": "Москва",
    "street": "ул. Пушкина",
    "house": "10",
    "apartment": "25",
    "postalCode": "123456"
  },
  "phone": "+79001234567",
  "email": "ivan@example.com",
  "deliveryDate": "2026-03-20",
  "deliveryTime": "10:00-14:00",
  "comment": "Позвонить перед доставкой",
  "paymentMethod": "card"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Заказ успешно оформлен",
  "order": {
    "id": "order-uuid",
    "userId": "user-uuid",
    "items": [...],
    "deliveryAddress": {
      "city": "Москва",
      "street": "ул. Пушкина",
      "house": "10",
      "apartment": "25",
      "postalCode": "123456"
    },
    "phone": "+79001234567",
    "email": "ivan@example.com",
    "deliveryDate": "2026-03-20",
    "deliveryTime": "10:00-14:00",
    "totalPrice": 99980,
    "status": "pending",
    "paymentStatus": "pending",
    "paymentMethod": "card",
    "createdAt": "2026-03-13T18:00:00.000Z"
  }
}
```

---

### Получить список заказов пользователя
```
GET /api/delivery
```

**Response (200):**
```json
{
  "success": true,
  "orders": [
    {
      "id": "order-uuid",
      "items": [
        {
          "productId": "product-uuid",
          "productName": "Смартфон Samsung Galaxy",
          "quantity": 2,
          "price": 99980,
          "image": "image1.jpg"
        }
      ],
      "status": "delivered",
      "totalPrice": 99980,
      "deliveryDate": "2026-03-20",
      "createdAt": "2026-03-13T18:00:00.000Z"
    }
  ]
}
```

---

### Получить заказ по ID
```
GET /api/delivery/:orderId
```

**Response (200):**
```json
{
  "success": true,
  "order": {
    "id": "order-uuid",
    "userId": "user-uuid",
    "items": [...],
    "deliveryAddress": {...},
    "phone": "+79001234567",
    "email": "ivan@example.com",
    "status": "processing",
    "paymentStatus": "paid",
    "paymentMethod": "card",
    "totalPrice": 99980,
    "deliveryDate": "2026-03-20",
    "deliveryTime": "10:00-14:00",
    "comment": "Позвонить перед доставкой",
    "trackingNumber": "TRACK123456",
    "createdAt": "2026-03-13T18:00:00.000Z",
    "updatedAt": "2026-03-13T18:00:00.000Z"
  }
}
```

---

### Отменить заказ
```
PUT /api/delivery/:orderId/cancel
```

**Response (200):**
```json
{
  "success": true,
  "message": "Заказ отменен",
  "order": {
    "id": "order-uuid",
    "status": "cancelled"
  }
}
```

---

### Подтвердить оплату (с капчей)
```
POST /api/delivery/:orderId/pay
```

**Request Body:**
```json
{
  "captchaToken": "captcha-response-token",
  "cardNumber": "****1234",
  "cardExpiry": "12/26",
  "cardCvv": "***"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Оплата успешно проведена",
  "order": {
    "id": "order-uuid",
    "paymentStatus": "paid",
    "status": "processing"
  }
}
```

---

## 📊 Статусы заказа

| Статус | Описание |
|--------|----------|
| `pending` | Ожидает оплаты |
| `processing` | В обработке |
| `shipped` | Отправлен |
| `delivered` | Доставлен |
| `cancelled` | Отменен |

---

## 🔒 Статусы оплаты

| Статус | Описание |
|--------|----------|
| `pending` | Ожидает оплаты |
| `paid` | Оплачено |
| `failed` | Ошибка оплаты |
| `refunded` | Возврат средств |

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
  password: string;              // Хешированный пароль
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
  characteristics: object;       // Характеристики
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

interface CartItem {
  id: string;                    // UUID
  cartId: string;                // ID корзины
  productId: string;             // ID товара
  quantity: number;              // Количество
  price: number;                 // Цена за количество
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
    "message": "Описание ошибки",
    "details": {}
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
| `PAYMENT_FAILED` | 402 | Ошибка оплаты |

---

## 🔧 Переменные окружения (.env)

```env
PORT=3000
NODE_ENV=development
SESSION_SECRET=your-secret-key
SESSION_LIFETIME=600000
COOKIE_NAME=session_token
```

---

## 📌 Примечания

1. **Сессии**: Используются HttpOnly cookies для безопасности. Сессия истекает через 10 минут.
2. **Валидация**: Все входящие данные валидируются перед обработкой.
3. **Хранение**: Данные хранятся в JSON файлах в папке `/data`.
4. **Типизация**: Используется JSDoc/TSDoc для документирования типов.

---

## 👨‍💻 Автор

Разработано в рамках учебного проекта L_Shop.
Тимлид: Зыбайло М.Д.