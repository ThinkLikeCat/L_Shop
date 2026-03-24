import './style.css';
import { IProduct } from '../../api/products';

export class ProductsGrid {
    private products: IProduct[] = [];

    public render(): string {
        return `
            <section class="products">
                <div class="container products__grid" id="products-container">
                    <p class="products__loading">Загрузка эксклюзивных моделей...</p>
                </div>
            </section>
        `;
    }

    private renderCards(products: IProduct[]): string {
        if (!products || products.length === 0) {
            return `
                <div class="products__empty">
                    <p>Товары не найдены. Попробуйте изменить параметры поиска или фильтры.</p>
                </div>
            `;
        }

        return products.map(product => `
            <article class="product-card" data-id="${product.id}">
                <div class="product-card__image-box">
                    <img src="${product.images && product.images[0] ? product.images[0] : '/images/no-photo.png'}" 
                         alt="${product.name}" 
                         class="product-card__img">
                </div>
                
                <div class="product-card__info">
                    <span class="product-card__brand">${product.characteristics?.brand || 'Luxury Watch'}</span>
                    <h3 class="product-card__title" data-title>${product.name}</h3>
                    <p class="product-card__price" data-price>${Number(product.price).toLocaleString()} руб.</p>
                    
                    <div class="product-card__hover-content">
                        <button class="product-card__buy-btn" data-product-id="${product.id}">КУПИТЬ</button>
                        <p class="product-card__installment">от ${(product.price / 12).toFixed(0)} руб. /мес</p>
                    </div>
                </div>
            </article>
        `).join('');
    }

    public async init(onBuy: (product: IProduct) => void, filters: any = {}): Promise<void> {
        const container = document.getElementById('products-container');
        
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const url = `/api/products${queryParams ? `?${queryParams}` : ''}`;

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Ошибка сети: ${response.status}`);
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                this.products = data;
            } else if (data && data.products && Array.isArray(data.products)) {
                this.products = data.products;
            } else {
                this.products = [];
            }
            
            if (container) {
                container.innerHTML = this.renderCards(this.products);
                this.setupListeners(onBuy);
            }
        } catch (error) {
            if (container) {
                container.innerHTML = `
                    <div class="products__error-box">
                        <p class="products__error-text">Не удалось загрузить товары.</p>
                        <button class="products__retry-btn" onclick="location.reload()">ОБНОВИТЬ СТРАНИЦУ</button>
                    </div>
                `;
            }
        }
    }

    private setupListeners(onBuy: (product: IProduct) => void): void {
        const buttons = document.querySelectorAll('.product-card__buy-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.currentTarget as HTMLElement;
                const productId = target.dataset.productId;
                const product = this.products.find(p => p.id === productId);
                
                if (product) {
                    onBuy(product);
                }
            });
        });
    }
}