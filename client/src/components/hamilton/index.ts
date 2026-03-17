import './index.css';

interface Watch {
    id: number;
    brand: string;
    model: string;
    price: string;
    img: string;
    installment: string;
}

export class Hamilton {
    private watches: Watch[] = [
        { id: 201, brand: 'HAMILTON', model: 'Jazzmaster Performer', price: '3 250,00 руб.', installment: '270,83', img: '/images/Hamilton1.png' },
        { id: 202, brand: 'HAMILTON', model: 'American Classic', price: '2 850,00 руб.', installment: '237,50', img: '/images/Hamilton2.png' },
        { id: 203, brand: 'HAMILTON', model: 'Khaki Field Expedition', price: '3 900,00 руб.', installment: '325,00', img: '/images/Hamilton3.png' },
        { id: 204, brand: 'HAMILTON', model: 'Ventura Elvis80', price: '4 150,00 руб.', installment: '345,83', img: '/images/Hamilton4.png' }
    ];

    render(): string {
        return `
            <section class="hamilton">
                <div class="container hamilton__container">
                    <div class="hamilton__grid">
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
                    <div class="hamilton__banner">
                        <img src="/images/HamiltonLogo.png" alt="Hamilton Banner" class="hamilton__banner-img">
                        <button class="hamilton__btn">ВЫБРАТЬ</button>
                    </div>

                </div>
            </section>
        `;
    }
}
