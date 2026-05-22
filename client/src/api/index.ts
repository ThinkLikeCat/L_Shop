/**
 * API Client для взаимодействия с backend сервером
 * Базовый URL: http://localhost:3001/api
 */

const API_BASE = '/api';

// Типы данных
export interface User {
  id: string;
  name: string;
  email: string;
  login: string;
  phone: string;
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  categoryId: string;
  images: string[];
  stock: number;
  isActive: boolean;
  rating: number;
  reviewsCount: number;
  characteristics: Record<string, unknown>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

export interface Cart {
  id: string;
  userId: string;
  basket: CartItem[];
  totalItems: number;
  totalPrice: number;
  discountPrice: number;
  isActive: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  deliveryAddress: {
    city: string;
    street: string;
    house: string;
    apartment?: string;
  };
  phone: string;
  email: string;
  deliveryDate: string;
  deliveryTime: string;
  comment?: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  totalPrice: number;
  trackingNumber?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Утилита для выполнения запросов
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // Важно для cookies
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Ошибка запроса',
        error: data.error,
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Сетевая ошибка',
    };
  }
}

// ==================== AUTH API ====================

export const authApi = {
  /**
   * Регистрация нового пользователя
   */
  async register(userData: {
    name: string;
    email: string;
    login: string;
    phone: string;
    password: string;
  }): Promise<ApiResponse<{ user: User; message: string }>> {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Авторизация пользователя
   */
  async login(credentials: {
    login: string;
    password: string;
  }): Promise<ApiResponse<{ user: User; message: string }>> {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Выход из системы
   */
  async logout(): Promise<ApiResponse<{ message: string }>> {
    return request('/auth/logout', {
      method: 'POST',
    });
  },

  /**
   * Проверка авторизации
   */
  async me(): Promise<ApiResponse<{ user: User; authenticated: boolean }>> {
    return request('/auth/me');
  },
};

// ==================== PRODUCTS API ====================

export const productsApi = {
  /**
   * Получить список товаров с фильтрацией
   */
  async getProducts(params?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    available?: boolean;
    sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating';
  }): Promise<ApiResponse<{ products: Product[]; count: number }>> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    
    return request(endpoint);
  },

  /**
   * Получить товар по ID
   */
  async getProductById(id: string): Promise<ApiResponse<{ product: Product }>> {
    return request(`/products/${id}`);
  },

  /**
   * Получить категории
   */
  async getCategories(): Promise<ApiResponse<{ categories: { id: string; name: string; description?: string }[] }>> {
    return request('/products/categories');
  },

  /**
   * Получить популярные товары
   */
  async getPopular(limit: number = 10): Promise<ApiResponse<{ products: Product[]; count: number }>> {
    return request(`/products/popular?limit=${limit}`);
  },

  /**
   * Поиск товаров
   */
  async search(query: string): Promise<ApiResponse<{ products: Product[]; count: number }>> {
    return request(`/products/search?q=${encodeURIComponent(query)}`);
  },
};

// ==================== CART API ====================

export const cartApi = {
  /**
   * Получить корзину пользователя
   */
  async getCart(): Promise<ApiResponse<{ cart: Cart }>> {
    return request('/cart');
  },

  /**
   * Добавить товар в корзину
   */
  async addItem(productId: string, quantity: number = 1): Promise<ApiResponse<{ cart: Cart; message: string }>> {
    return request('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, count: quantity }),
    });
  },

  /**
   * Изменить количество товара
   */
  async updateQuantity(productId: string, quantity: number): Promise<ApiResponse<{ cart: Cart; message: string }>> {
    return request(`/cart/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ count: quantity }),
    });
  },

  /**
   * Удалить товар из корзины
   */
  async removeItem(productId: string): Promise<ApiResponse<{ cart: Cart; message: string }>> {
    return request(`/cart/${productId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Очистить корзину
   */
  async clearCart(): Promise<ApiResponse<{ message: string }>> {
    return request('/cart', {
      method: 'DELETE',
    });
  },
};

// ==================== DELIVERY API ====================

export const deliveryApi = {
  /**
   * Создать заказ
   */
  async createOrder(orderData: {
    deliveryAddress: {
      city: string;
      street: string;
      house: string;
      apartment?: string;
    };
    phone: string;
    email: string;
    deliveryDate: string;
    deliveryTime: string;
    comment?: string;
    paymentMethod: 'card' | 'cash' | 'online';
  }): Promise<ApiResponse<{ order: Order; message: string }>> {
    return request('/delivery', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  /**
   * Получить заказы пользователя
   */
  async getOrders(): Promise<ApiResponse<{ orders: Order[]; count: number }>> {
    return request('/delivery');
  },

  /**
   * Получить заказ по ID
   */
  async getOrderById(id: string): Promise<ApiResponse<{ order: Order }>> {
    return request(`/delivery/${id}`);
  },
};

// Экспорт по умолчанию
export default {
  auth: authApi,
  products: productsApi,
  cart: cartApi,
  delivery: deliveryApi,
};