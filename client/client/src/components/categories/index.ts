export class Categories {
    private items = [
        { title: 'Механические', img: '/images/категория1.png' },
        { title: 'Дайверские', img: '/images/категория2.png' },
        { title: 'Коллаборации', img: '/images/категория3.png' }
    ];

    render(): string {
        return `
            <section class="categories">
                <div class="container">
                    <h2 class="categories__title">Категории</h2>
                    
                    <div class="categories__grid">
                        ${this.items.map(item => `
                            <div class="category-card">
                                <img src="${item.img}" alt="${item.title}" class="category-card__img">
                                <div class="category-card__overlay">
                                    <span class="category-card__text">${item.title}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <h2 class="section-title section-title--new">Новинки</h2>
                </div>
            </section>
        `;
    }
}
