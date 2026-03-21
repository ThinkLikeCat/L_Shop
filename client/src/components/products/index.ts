import './style.css';

interface Product {
    id: number;
    brand: string;
    title: string;
    price: string;
    installment: string;
    img: string;
}

export class ProductsGrid {
    private products: Product[] = [
        { id: 1, brand: 'Tag Heuer', title: 'Carrera Chronograph', price: '23 000,00 руб.', installment: '895,50', img: '/images/Новинки1.png' },
        { id: 2, brand: 'Longines', title: 'Spirit Zulu Time', price: '4 870,00 руб.', installment: '475,49', img: '/images/Новинки2.png' },
        { id: 3, brand: 'Hamilton', title: 'Jazzmaster Skeleon Auto', price: '4 500,00 руб.', installment: '443,12', img: '/images/Новинки3.png' },
        { id: 4, brand: 'Wenger', title: 'Vintage Classic', price: '3 750,00 руб.', installment: '376,12', img: '/images/Новинки4.png' }
    ];

    public render(): string {
        return `
            <section class="products">
                <div class="container products__grid">
                    ${this.products.map(product => `
                        <article class="product-card" data-id="${product.id}">
                            <div class="product-card__image-box">
                                <img src="${product.img}" alt="${product.brand} ${product.title}" class="product-card__img">
                            </div>
                            
                            <div class="product-card__info">
                                <span class="product-card__brand">${product.brand}</span>
                                <h3 class="product-card__title" data-title>${product.title}</h3>
                                <p class="product-card__price" data-price>${product.price}</p>
                                
                                <div class="product-card__hover-content">
                                    <button class="product-card__buy-btn" data-product-id="${product.id}">КУПИТЬ</button>
                                    <p class="product-card__installment">от ${product.installment} руб. /мес</p>
                                </div>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;
    }

    public init(onBuy: (product: Product) => void): void {
        const buttons = document.querySelectorAll('.product-card__buy-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = Number((e.currentTarget as HTMLElement).dataset.productId);
                const product = this.products.find(p => p.id === id);
                
                if (product) {
                    onBuy(product);
                }
            });
        });
    }
}
