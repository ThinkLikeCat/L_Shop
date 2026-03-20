import './index.css';
import { Footer } from '../../components/footer/index';

export interface IBasketItem {
    id: number;
    title: string;
    price: string;
    image: string;
}

export const BasketStore: IBasketItem[] = [];

export class BasketPage {
    private footer = new Footer();

    public render(): string {
        return `
            <div class="basket-page">
                <div class="container basket-page__content">
                    ${BasketStore.length === 0 ? this.renderEmpty() : this.renderFull()}
                </div>
                ${this.footer.render()}
            </div>
        `;
    }

    private renderEmpty(): string {
        return `
            <div class="basket-header">
                <h1 class="basket-title">Корзина</h1>
                <a href="/" class="back-link" data-link>Вернуться в каталог</a>
            </div>
            <div class="basket-empty">
                <div class="basket-empty__icon">
                    <img src="/images/корзиныч.png" alt="Пусто">
                </div>
                <h2 class="basket-empty__title">Ваша корзина пуста</h2>
                <p class="basket-empty__text">
                    Нажмите <a href="/" data-link>здесь</a>, чтобы продолжить покупки
                </p>
            </div>
        `;
    }

    private renderFull(): string {
        return `
            <div class="basket-header">
                <h1 class="basket-title">Корзина</h1>
                <a href="/" class="back-link" data-link>Вернуться в каталог</a>
            </div>
            <div class="basket-layout">
                <div class="basket-main">
                    <div class="basket-tabs"><span class="tab-active">Товары в корзине</span></div>
                    <div class="basket-list">
                        ${BasketStore.map(item => `
                            <div class="basket-item">
                                <div class="item-pic"><img src="${item.image}"></div>
                                <div class="item-info">
                                    <h3 class="item-name" data-title="basket">${item.title}</h3>
                                    <p class="item-meta">Артикул: ${item.id}</p>
                                </div>
                                <div class="item-actions">
                                    <span class="current-price" data-price="basket">${item.price}</span>
                                    <button class="item-del" data-id="${item.id}">✕</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <aside class="basket-sidebar">
                    <div class="total-card">
                        <div class="total-row">
                            <span>Итого:</span>
                            <span class="total-val">${BasketStore[0].price}</span>
                        </div>
                        <button class="checkout-btn" id="to-checkout">Перейти к оформлению</button>
                    </div>
                </aside>
            </div>
        `;
    }

    public init(onNavigateToDelivery: () => void): void {
        document.getElementById('to-checkout')?.addEventListener('click', () => {
            onNavigateToDelivery();
        });


        document.querySelectorAll('.item-del').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number((e.target as HTMLElement).dataset.id);
                const index = BasketStore.findIndex(i => i.id === id);
                if (index > -1) {
                    BasketStore.splice(index, 1);
                    const main = document.getElementById('main-content');
                    if (main) {
                        main.innerHTML = this.render();
                        this.init(onNavigateToDelivery);
                    }
                }
            });
        });
    }
}
