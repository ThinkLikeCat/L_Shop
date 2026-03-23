import './style.css';
import { productsApi, type Product as ApiProduct } from '../../api/index';

interface Product {
    id: string;
    brand: string;
    title: string;
    price: number;
    installment: string;
    img: string;
}

export class ProductsGrid {
    private products: Product[] = [];
    private loading: boolean = false;

    public async afterRender(): Promise<void> {
        await this.loadProducts();
    }

    private async loadProducts(): Promise<void> {
        this.loading = true;
        
        try {
            const response = await productsApi.getProducts({ available: true, sort: 'rating' });
            
            if (response.success && response.data) {
                const apiProducts = (response.data as { products: ApiProduct[]; count: number }).products;
                
                this.products = apiProducts.map(p => ({
                    id: p.id,
                    brand: p.characteristics?.brand as string || p.name.split(' ')[0],
                    title: p.name,
                    price: p.discountPrice || p.price,
                    installment: Math.round((p.discountPrice || p.price) / 24).toString(),
                    img: p.images?.[0] || '/images/watch.png'
                }));
                
                // Перерисовываем
                const container = document.querySelector('.products__grid');
                if (container) {
                    container.innerHTML = this.renderProducts();
                    this.setupButtons();
                }
            }
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
            // Fallback на статичные товары
            this.products = [
                { id: '1', brand: 'Tag Heuer', title: 'Carrera Chronograph', price: 23000, installment: '895,50', img: '/images/Новинки1.png' },
                { id: '2', brand: 'Longines', title: 'Spirit Zulu Time', price: 4870, installment: '475,49', img: '/images/Новинки2.png' },
                { id: '3', brand: 'Hamilton', title: 'Jazzmaster Skeleon Auto', price: 4500, installment: '443,12', img: '/images/Новинки3.png' },
                { id: '4', brand: 'Wenger', title: 'Vintage Classic', price: 3750, installment: '376,12', img: '/images/Новинки4.png' }
            ];
        }
        
        this.loading = false;
    }

    private renderProducts(): string {
        if (this.loading) {
            return '<div class="loading">Загрузка товаров...</div>';
        }
        
        return this.products.map(product => `
            <article class="product-card" data-id="${product.id}">
                <div class="product-card__image-box">
                    <img src="${product.img}" alt="${product.brand} ${product.title}" class="product-card__img">
                </div>
                
                <div class="product-card__info">
                    <span class="product-card__brand">${product.brand}</span>
                    <h3 class="product-card__title" data-title>${product.title}</h3>
                    <p class="product-card__price" data-price>${product.price.toLocaleString('ru-RU')} руб.</p>
                    
                    <div class="product-card__hover-content">
                        <button class="product-card__buy-btn" data-product-id="${product.id}">КУПИТЬ</button>
                        <p class="product-card__installment">от ${product.installment} руб. /мес</p>
                    </div>
                </div>
            </article>
        `).join('');
    }

    public render(): string {
        return `
            <section class="products">
                <div class="container products__grid">
                    ${this.renderProducts()}
                </div>
            </section>
        `;
    }

    private setupButtons(): void {
        const buttons = document.querySelectorAll('.product-card__buy-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = (e.currentTarget as HTMLElement).dataset.productId;
                const product = this.products.find(p => p.id === id);
                
                if (product) {
                    // Отправляем событие покупки
                    const event = new CustomEvent('product-buy', { detail: product });
                    document.dispatchEvent(event);
                }
            });
        });
    }

    public init(onBuy: (product: Product) => void): void {
        // Слушаем событие покупки
        document.addEventListener('product-buy', ((e: CustomEvent<Product>) => {
            onBuy(e.detail);
        }) as EventListener);
        
        this.setupButtons();
    }
}
