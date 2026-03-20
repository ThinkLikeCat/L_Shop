/**
 * Адрес доставки
 */
export interface Address {
  city: string;
  street: string;
  house: string;
  apartment?: string;
  postalCode?: string;
}

/**
 * Элемент заказа
 */
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string | null;
}

/**
 * Статус заказа
 */
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

/**
 * Статус оплаты
 */
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

/**
 * Способ оплаты
 */
export type PaymentMethod = 'card' | 'cash' | 'online';

/**
 * Интерфейс заказа
 */
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  deliveryAddress: Address;
  phone: string;
  email: string;
  deliveryDate: string;
  deliveryTime: string;
  comment: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  totalPrice: number;
  trackingNumber: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Данные для создания заказа
 */
export interface CreateOrderData {
  userId: string;
  items: OrderItem[];
  deliveryAddress: Address;
  phone: string;
  email: string;
  deliveryDate: string;
  deliveryTime: string;
  comment?: string;
  paymentMethod: PaymentMethod;
  totalPrice: number;
}

/**
 * Создает объект заказа с значениями по умолчанию
 */
export function createOrder(data: CreateOrderData): Order {
  const now = new Date().toISOString();
  return {
    id: Date.now().toString(),
    userId: data.userId,
    items: data.items,
    deliveryAddress: data.deliveryAddress,
    phone: data.phone,
    email: data.email,
    deliveryDate: data.deliveryDate,
    deliveryTime: data.deliveryTime,
    comment: data.comment ?? '',
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: data.paymentMethod,
    totalPrice: data.totalPrice,
    trackingNumber: '',
    createdAt: now,
    updatedAt: now
  };
}