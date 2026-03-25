import './index.css';
import { Footer } from '../../components/footer/index';
import { cartApi, productsApi, type Product, type Cart } from '../../api/index';
import { getCurrentUser } from '../registration/index';

export interface IBasketItem {
    id: string;
    productId: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

// Локальное хранилище корзины (для неавторизованных)
export const BasketStore: IBasketItem[] = [];

// Загруженная корзина с сервера
let serverCart: Cart | null = null;

// Получить товары корзины
export async function getCartItems(): Promise<IBasketItem[]> {
    const user = getCurrentUser();
    
    if (user) {
        // Авторизованный пользователь - получаем корзину с сервера
        const response = await cartApi.getCart();
        if (response.success && response.data) {
            const cartData = response.data as { cart?: Cart };
            serverCart = cartData.cart || null;
            
            if (serverCart && serverCart.items) {
                return serverCart.items.map(item => ({
                    id: item.productId,
                    productId: item.productId,
                    title: item.product?.name || 'Товар',
                    price: item.product?.discountPrice || item.product?.price || 0,
                    image: item.product?.images?.[0] || '/images/watch.png',
                    quantity: item.quantity,
                }));
            }
        }
        return [];
    }
    
    // Неавторизованный - используем локальное хранилище
    return BasketStore;
}

// Добавить товар в корзину
export async function addToCart(product: { id: string; title: string; price: number; image: string }): Promise<boolean> {
    const user = getCurrentUser();
    
    if (user) {
        // Авторизованный - отправляем на сервер
        const response = await cartApi.addItem(product.id, 1);
        return response.success;
    } else {
        // Неавторизованный - добавляем локально
        const existingIndex = BasketStore.findIndex(item => item.productId === product.id);
        if (existingIndex >= 0) {
            BasketStore[existingIndex].quantity++;
        } else {
            BasketStore.push({
                id: product.id,
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            });
        }
        return true;
    }
}

// Удалить товар из корзины
export async function removeFromCart(productId: string): Promise<boolean> {
    const user = getCurrentUser();
    
    if (user) {
        const response = await cartApi.removeItem(productId);
        return response.success;
    } else {
        const index = BasketStore.findIndex(item => item.productId === productId);
        if (index >= 0) {
            BasketStore.splice(index, 1);
            return true;
        }
        return false;
    }
}

export class BasketPage {
    private footer = new Footer();
    private items: ICartItem[] = [];

    public render(): string {
        return `
            <div class="basket-page">
                <div class="container basket-page__content" id="basket-container">
                    <p>Загрузка корзины...</p>
                </div>
                ${this.footer.render()}
            </div>
        `;
    }

    public async loadData(): Promise<void> {
        const items = await getCartItems();
        // Очищаем и заполняем BasketStore данными с сервера
        BasketStore.length = 0;
        items.forEach(item => BasketStore.push(item));
    }

    private renderEmpty(): string {
        return `
            <div class="basket-header">
                <h1 class="basket-title">Корзина</h1>
                <a href="/" class="back-link">Вернуться в каталог</a>
            </div>
            <div class="basket-empty">
                <div class="basket-empty__icon">
                    <img src="/images/корзиныч.png" alt="Пусто">
                </div>
                <h2 class="basket-empty__title">Ваша корзина пуста</h2>
                <p class="basket-empty__text">
                    Нажмите <a href="/">здесь</a>, чтобы продолжить покупки
                </p>
            </div>
        `;
    }

    private renderFull(): string {
        const totalPrice = this.items.reduce((acc, item) => {
            return acc + (item.product.price * item.count);
        }, 0);

        return `
            <div class="basket-header">
                <h1 class="basket-title">Корзина</h1>
                <a href="/" class="back-link">Вернуться в каталог</a>
            </div>
            <div class="basket-layout">
                <div class="basket-main">
                    <div class="basket-tabs"><span class="tab-active">Товары в корзине</span></div>
                    <div class="basket-list">
                        ${this.items.map(item => `
                            <div class="basket-item">
                                <div class="item-pic"><img src="${item.product.images[0]}"></div>
                                <div class="item-info">
                                    <h3 class="item-name" data-title="basket">${item.product.name}</h3>
                                    <p class="item-meta">Артикул: ${item.product.id.substring(0, 8)}</p>
                                    <div class="item-count">
                                        <button class="count-btn" data-id="${item.product.id}" data-action="minus">-</button>
                                        <span>${item.count}</span>
                                        <button class="count-btn" data-id="${item.product.id}" data-action="plus">+</button>
                                    </div>
                                </div>
                                <div class="item-actions">
                                    <span class="current-price" data-price="basket">${(item.product.price * item.count).toLocaleString()} руб.</span>
                                    <button class="item-del" data-id="${item.product.id}">✕</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <aside class="basket-sidebar">
                    <div class="total-card">
                        <div class="total-row">
                            <span>Итого:</span>
                            <span class="total-val">${totalPrice.toLocaleString()} руб.</span>
                        </div>
                        <button class="checkout-btn" id="to-checkout">Перейти к оформлению</button>
                    </div>
                </aside>
            </div>
        `;
    }

    public async init(onNavigateToDelivery: () => void): Promise<void> {
        const container = document.getElementById('basket-container');
        try {
            const data = await CartAPI.getCart();
            if (data.success) {
                this.items = data.cart.basket;
                if (container) container.innerHTML = this.renderContent();
            }
        } catch (e) {
            console.error("Ошибка загрузки корзины", e);
        }
        this.setupEventListeners(onNavigateToDelivery);
    }

    private setupEventListeners(onNavigateToDelivery: () => void): void {
        const container = document.getElementById('basket-container');

        document.getElementById('to-checkout')?.addEventListener('click', onNavigateToDelivery);
        document.querySelectorAll('.item-del').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const productId = (e.target as HTMLElement).dataset.id;
                if (!productId) return;
                
                // Удаляем через API
                await removeFromCart(productId);
                
                // Также удаляем из локального хранилища
                const index = BasketStore.findIndex(i => i.productId === productId);
                if (index > -1) {
                    BasketStore.splice(index, 1);
                }
                
                // Перерисовываем
                const main = document.getElementById('main-content');
                if (main) {
                    main.innerHTML = this.render();
                    this.init(onNavigateToDelivery);
                }
            });
        });
    }
}