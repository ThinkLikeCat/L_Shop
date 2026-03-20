export class Features {
    render(): string {
        return `
            <section class="features">
                <div class="container features__container">
                    <div class="features__item">
                        <img src="/images/доставка.png" alt="Доставка" class="features__icon">
                        <span class="features__text">Бесплатная доставка по РБ</span>
                    </div>
                    <div class="features__item">
                        <img src="/images/расрочка.png" alt="Рассрочка" class="features__icon">
                        <span class="features__text">Рассрочка под 0%</span>
                    </div>
                    <div class="features__item">
                        <img src="/images/гарантия.png" alt="Гарантия" class="features__icon">
                        <span class="features__text">Гарантия качества товара</span>
                    </div>
                </div>
            </section>
        `;
    }
}