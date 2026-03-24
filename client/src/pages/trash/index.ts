import './index.css';
import { Footer } from '../../components/footer/index';
import { CartAPI, ICartItem } from '../../api/cart';

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

    private renderContent(): string {
        return this.items.length === 0 ? this.renderEmpty() : this.renderFull();
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
                const id = (e.target as HTMLElement).dataset.id;
                if (id) {
                    const data = await CartAPI.remove(id);
                    if (data.success) {
                        this.items = data.cart.basket;
                        if (container) container.innerHTML = this.renderContent();
                        this.setupEventListeners(onNavigateToDelivery); 
                    }
                }
            });
        });
        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = (e.target as HTMLElement).dataset.id;
                const action = (e.target as HTMLElement).dataset.action;
                const currentItem = this.items.find(i => i.product.id === id);

                if (id && currentItem) {
                    const newCount = action === 'plus' ? currentItem.count + 1 : currentItem.count - 1;
                    
                    if (newCount > 0) {
                        const data = await CartAPI.update(id, newCount);
                        if (data.success) {
                            this.items = data.cart.basket;
                            if (container) container.innerHTML = this.renderContent();
                            this.setupEventListeners(onNavigateToDelivery);
                        }
                    } else {
                        const data = await CartAPI.remove(id);
                        if (data.success) {
                            this.items = data.cart.basket;
                            if (container) container.innerHTML = this.renderContent();
                            this.setupEventListeners(onNavigateToDelivery);
                        }
                    }
                }
            });
        });
    }
}