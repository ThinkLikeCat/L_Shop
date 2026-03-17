import './index.css';

interface Watch {
    id: number;
    brand: string;
    model: string;
    price: string;
    img: string;
    installment: string;
}

export class TagHeuer {
    private watches: Watch[] = [
        { id: 101, brand: 'TAG HEUER', model: 'Carrera Day-Date', price: '4 450,00 руб.', installment: '370,83', img: '/images/TAGHEUER1.png' },
        { id: 102, brand: 'TAG HEUER', model: 'Carrera Date', price: '5 450,00 руб.', installment: '454,16', img: '/images/TAGHEUER2.png' },
        { id: 103, brand: 'TAG HEUER', model: 'Aquarance Solargraph', price: '7 909,00 руб.', installment: '659,08', img: '/images/TAGHEUER3.png' },
        { id: 104, brand: 'TAG HEUER', model: 'New Balance Edition', price: '2 050,00 руб.', installment: '170,83', img: '/images/TAGHEUER4.png' }
    ];

    render(): string {
        return `
            <section class="tag-heuer">
                <div class="container tag-heuer__container">
                    
                    <div class="tag-heuer__banner">
                        <img 
                            src="/images/TagHeuerLogo.png" 
                            alt="Tag Heuer Promo" 
                            class="tag-heuer__banner-img"
                        >
                        <button class="tag-heuer__btn">ВЫБРАТЬ</button>
                    </div>
                    <div class="tag-heuer__grid">
                        ${this.watches.map(watch => `
                            <article class="product-card">
                                <div class="product-card__image-box">
                                    <img src="${watch.img}" alt="${watch.model}" class="product-card__img">
                                </div>
                                
                                <div class="product-card__info">
                                    <span class="product-card__brand">${watch.brand}</span>
                                    <h3 class="product-card__title" data-title>${watch.model}</h3>
                                    <p class="product-card__price" data-price>${watch.price}</p>
                                    
                                    <div class="product-card__hover-content">
                                        <button class="product-card__buy-btn" data-id="${watch.id}">КУПИТЬ</button>
                                        <p class="product-card__installment">от ${watch.installment} руб. /мес</p>
                                    </div>
                                </div>
                            </article>
                        `).join('')}
                    </div>

                </div>
            </section>
        `;
    }
    init(): void {
        const buttons = document.querySelectorAll('.tag-heuer .product-card__buy-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target as HTMLButtonElement;
                const productId = target.getAttribute('data-id');
                console.log(`Товар с ID ${productId} добавлен в корзину`);
            });
        });
    }
}
