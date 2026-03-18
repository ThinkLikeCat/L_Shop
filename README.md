# 🛒 L_Shop - Система авторизации

## 📋 Описание проекта

L_Shop - система авторизации пользователей с регистрацией, входом в систему и управлением сессиями через HttpOnly cookies.

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
│   └── authController.js     # Контроллер авторизации
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
│   └── authRoutes.js         # Маршруты авторизации
│
├── services/
│   └── authService.js        # Сервис авторизации
│
├── utils/
│   ├── fileManager.js        # Работа с JSON файлами
│   ├── cookieHelper.js       # Работа с cookies
│   └── validators.js         # Валидаторы данных
│
├── data/
│   └── users.json            # Данные пользователей
│
└── tests/
    └── auth.test.js          # Тесты авторизации
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

# Запуск тестов
node tests/auth.test.js
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

**Требует авторизации:** ✅

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
    "login": "ivan_ivanov"
  }
}
```

---

## 📝 Модель пользователя

```typescript
interface User {
  id: string;                    // UUID
  name: string;                  // Имя пользователя
  email: string;                 // Email (уникальный)
  login: string;                 // Логин (уникальный)
  phone: string;                 // Телефон
  password: string;              // Пароль
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