# API Документация L_Shop

Базовый URL: `http://localhost:3000/api`

---

## Аутентификация

### POST /api/auth/register

**Принимает:**
```json
{
  "name": "string",
  "email": "string",
  "login": "string",
  "phone": "string",
  "password": "string"
}
```

**Возвращает:**
```json
{
  "success": true,
  "message": "Регистрация успешна",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "login": "string",
    "phone": "string",
    "avatar": null,
    "cartId": null,
    "sessionId": null,
    "sessionExpires": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### POST /api/auth/login

**Принимает:**
```json
{
  "login": "string",
  "password": "string"
}
```

**Возвращает:**
```json
{
  "success": true,
  "message": "Вход выполнен",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "login": "string",
    "phone": "string",
    "avatar": null,
    "cartId": "string",
    "sessionId": null,
    "sessionExpires": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### POST /api/auth/logout

Требует авторизации (cookie `sessionId`).

**Возвращает:**
```json
{
  "success": true,
  "message": "Выход выполнен"
}
```

---

### GET /api/auth/me

Требует авторизации (cookie `sessionId`).

**Возвращает:**
```json
{
  "success": true,
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "login": "string",
    "phone": "string",
    "avatar": null,
    "cartId": "string",
    "sessionId": null,
    "sessionExpires": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Товары

### GET /api/products

**Принимает (query params):**
| Параметр | Тип | Описание |
|----------|-----|----------|
| search | string | Поиск по названию/описанию |
| category | string | Фильтр по ID категории |
| available | boolean | Только доступные |
| minPrice | number | Минимальная цена |
| maxPrice | number | Максимальная цена |
| sort | string | price_asc, price_desc, name_asc, name_desc, rating |

**Возвращает:**
```json
{
  "success": true,
  "count": 10,
  "products": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": 50000,
      "discountPrice": 45000,
      "categoryId": "string",
      "images": ["url1", "url2"],
      "stock": 10,
      "isActive": true,
      "rating": 4.5,
      "reviewsCount": 25,
      "characteristics": {
        "brand": "TAG Heuer",
        "mechanism": "Автоматический",
        "waterResistance": "100м",
        "caseMaterial": "Нержавеющая сталь",
        "strapMaterial": "Кожа"
      },
      "tags": ["luxury", "sport"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET /api/products/:id

**Возвращает:**
```json
{
  "success": true,
  "product": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": 50000,
    "discountPrice": 45000,
    "categoryId": "string",
    "images": ["url1", "url2"],
    "stock": 10,
    "isActive": true,
    "rating": 4.5,
    "reviewsCount": 25,
    "characteristics": {
      "brand": "TAG Heuer",
      "mechanism": "Автоматический",
      "waterResistance": "100м",
      "caseMaterial": "Нержавеющая сталь",
      "strapMaterial": "Кожа"
    },
    "tags": ["luxury", "sport"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### GET /api/products/search

**Принимает (query params):**
| Параметр | Тип | Описание |
|----------|-----|----------|
| q | string | Поисковый запрос |

**Возвращает:**
```json
{
  "success": true,
  "count": 5,
  "products": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": 50000,
      "discountPrice": 45000,
      "categoryId": "string",
      "images": ["url1", "url2"],
      "stock": 10,
      "isActive": true,
      "rating": 4.5,
      "reviewsCount": 25,
      "characteristics": {},
      "tags": [],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET /api/products/popular

**Принимает (query params):**
| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| limit | number | 10 | Количество товаров |

**Возвращает:**
```json
{
  "success": true,
  "count": 10,
  "products": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": 50000,
      "discountPrice": 45000,
      "categoryId": "string",
      "images": ["url1", "url2"],
      "stock": 10,
      "isActive": true,
      "rating": 4.8,
      "reviewsCount": 100,
      "characteristics": {},
      "tags": [],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET /api/products/categories

**Возвращает:**
```json
{
  "success": true,
  "categories": [
    {
      "id": "string",
      "name": "Мужские часы",
      "slug": "muzhskie-chasy",
      "parentId": null,
      "description": "Описание категории",
      "image": "url",
      "sortOrder": 1,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET /api/products/category/:categoryId

**Возвращает:**
```json
{
  "success": true,
  "count": 15,
  "products": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": 50000,
      "discountPrice": 45000,
      "categoryId": "string",
      "images": ["url1", "url2"],
      "stock": 10,
      "isActive": true,
      "rating": 4.5,
      "reviewsCount": 25,
      "characteristics": {},
      "tags": [],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Корзина

> Все эндпоинты требуют авторизации (cookie `sessionId`)

### GET /api/cart

**Возвращает:**
```json
{
  "success": true,
  "cart": {
    "id": "string",
    "userId": "string",
    "basket": [
      {
        "count": 2,
        "product": {
          "id": "string",
          "name": "string",
          "description": "string",
          "price": 50000,
          "discountPrice": 45000,
          "categoryId": "string",
          "images": ["url1", "url2"],
          "stock": 10,
          "isActive": true,
          "rating": 4.5,
          "reviewsCount": 25,
          "characteristics": {},
          "tags": [],
          "createdAt": "2024-01-01T00:00:00.000Z",
          "updatedAt": "2024-01-01T00:00:00.000Z"
        }
      }
    ]
  }
}
```

---

### POST /api/cart

**Принимает:**
```json
{
  "productId": "string",
  "count": 1
}
```

**Возвращает:**
```json
{
  "success": true,
  "message": "Товар добавлен в корзину",
  "cart": {
    "id": "string",
    "userId": "string",
    "basket": [
      {
        "count": 1,
        "product": {}
      }
    ]
  }
}
```

---

### PUT /api/cart/:productId

**Принимает:**
```json
{
  "count": 3
}
```

**Возвращает:**
```json
{
  "success": true,
  "message": "Количество обновлено",
  "cart": {
    "id": "string",
    "userId": "string",
    "basket": [
      {
        "count": 3,
        "product": {}
      }
    ]
  }
}
```

---

### DELETE /api/cart/:productId

**Возвращает:**
```json
{
  "success": true,
  "message": "Товар удален из корзины",
  "cart": {
    "id": "string",
    "userId": "string",
    "basket": []
  }
}
```

---

## Заказы

> Все эндпоинты требуют авторизации (cookie `sessionId`)

### GET /api/delivery

**Возвращает:**
```json
{
  "success": true,
  "orders": [
    {
      "id": "string",
      "userId": "string",
      "items": [
        {
          "productId": "string",
          "productName": "TAG Heuer Carrera",
          "quantity": 1,
          "price": 50000,
          "image": "url"
        }
      ],
      "deliveryAddress": {
        "city": "Москва",
        "street": "Тверская",
        "house": "1",
        "apartment": "10",
        "postalCode": "123456"
      },
      "phone": "+79991234567",
      "email": "user@email.com",
      "deliveryDate": "2024-01-15",
      "deliveryTime": "10:00-14:00",
      "comment": "Позвонить перед доставкой",
      "status": "pending",
      "paymentStatus": "pending",
      "paymentMethod": "card",
      "totalPrice": 50000,
      "trackingNumber": "",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET /api/delivery/:id

**Возвращает:**
```json
{
  "success": true,
  "order": {
    "id": "string",
    "userId": "string",
    "items": [
      {
        "productId": "string",
        "productName": "TAG Heuer Carrera",
        "quantity": 1,
        "price": 50000,
        "image": "url"
      }
    ],
    "deliveryAddress": {
      "city": "Москва",
      "street": "Тверская",
      "house": "1",
      "apartment": "10",
      "postalCode": "123456"
    },
    "phone": "+79991234567",
    "email": "user@email.com",
    "deliveryDate": "2024-01-15",
    "deliveryTime": "10:00-14:00",
    "comment": "Позвонить перед доставкой",
    "status": "pending",
    "paymentStatus": "pending",
    "paymentMethod": "card",
    "totalPrice": 50000,
    "trackingNumber": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### POST /api/delivery

**Принимает:**
```json
{
  "city": "Москва",
  "street": "Тверская",
  "house": "1",
  "apartment": "10",
  "postalCode": "123456",
  "phone": "+79991234567",
  "email": "user@email.com",
  "deliveryDate": "2024-01-15",
  "deliveryTime": "10:00-14:00",
  "comment": "Позвонить перед доставкой",
  "paymentMethod": "card"
}
```

**Возвращает:**
```json
{
  "success": true,
  "message": "Заказ создан",
  "order": {
    "id": "1704067200000",
    "userId": "string",
    "items": [
      {
        "productId": "string",
        "productName": "TAG Heuer Carrera",
        "quantity": 1,
        "price": 50000,
        "image": "url"
      }
    ],
    "deliveryAddress": {
      "city": "Москва",
      "street": "Тверская",
      "house": "1",
      "apartment": "10",
      "postalCode": "123456"
    },
    "phone": "+79991234567",
    "email": "user@email.com",
    "deliveryDate": "2024-01-15",
    "deliveryTime": "10:00-14:00",
    "comment": "Позвонить перед доставкой",
    "status": "pending",
    "paymentStatus": "pending",
    "paymentMethod": "card",
    "totalPrice": 50000,
    "trackingNumber": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### PUT /api/delivery/:id/cancel

**Возвращает:**
```json
{
  "success": true,
  "message": "Заказ отменен",
  "order": {
    "id": "string",
    "userId": "string",
    "status": "cancelled"
  }
}