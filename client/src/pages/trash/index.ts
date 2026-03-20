import './index.css';
import { Footer } from '../../components/footer/index';

interface IBasketItem {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
}

export class BasketPage {
    private footer = new Footer();
    private items: IBasketItem[] = [];

    public render(): string {
        return `
            <div class="basket-page">
                <div class="container basket-page__content">
                    ${this.items.length === 0 ? this.renderEmptyState() : this.renderFullState()}
                </div>
                
                ${this.footer.render()}
            </div>
        `;
    }

    private renderEmptyState(): string {
        return `
            <div class="basket-header">
                <h1 class="basket-title">Корзина</h1>
                <a href="/" class="back-link" data-link>Вернуться в каталог</a>
            </div>
            
            <div class="basket-empty">
                <div class="basket-empty__icon">
                    <img src="/images/корзиныч.png" alt="Корзина пуста">
                </div>
                <h2 class="basket-empty__title">Ваша корзина пуста</h2>
                <p class="basket-empty__text">
                    Нажмите <a href="/" data-link class="home-link">здесь</a>, чтобы продолжить покупки
                </p>
            </div>
        `;
    }

    private renderFullState(): string {
        const total = this.items.reduce((acc, item) => acc + item.price, 0);

        return `
            <div class="basket-header">
                <h1 class="basket-title">Корзина</h1>
                <a href="/" class="back-link" data-link>Вернуться в каталог</a>
            </div>

            <div class="basket-layout">
                <div class="basket-main">
                    <div class="basket-tabs">
                        <span class="tab-active">Товары в корзине</span>
                        <button class="clear-all" onclick="location.reload()">Очистить ✕</button>
                    </div>

                    <div class="basket-list">
                        ${this.items.map(item => `
                            <div class="basket-item">
                                <div class="item-pic"><img src="${item.image}"></div>
                                <div class="item-info">
                                    <h3 class="item-name" data-title="basket">${item.title}</h3>
                                    <p class="item-meta">${item.description}</p>
                                </div>
                                <div class="item-actions">
                                    <div class="price-wrap">
                                        <span class="current-price" data-price="basket">${item.price} руб.</span>
                                    </div>
                                    <button class="item-del">✕</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <aside class="basket-sidebar">
                    <div class="total-card">
                        <div class="total-row">
                            <span>Итого:</span>
                            <span class="total-val">${total.toLocaleString()} руб.</span>
                        </div>
                        <button class="checkout-btn" id="to-checkout">Перейти к оформлению</button>
                    </div>
                </aside>
            </div>
        `;
    }

    public init(): void {
        const btn = document.getElementById('to-checkout');
        if (btn) {
            btn.addEventListener('click', () => {
                alert('Переход к оформлению доставки...');
            });
        }
    }
}
