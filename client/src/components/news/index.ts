import './index.css';

interface NewsItem {
    id: number;
    title: string;
    text: string;
    date: string;
    img: string;
}

export class NewsSection {
    private news: NewsItem[] = [
        {
            id: 1,
            title: "Hamilton x Resident Evill",
            text: "В честь выхода новой части Resident Evill компания Hamilton представляет новые часы в ограниченной серии.",
            date: "15.03.2026",
            img: "/images/Resident.png"
        },
        {
            id: 2,
            title: "Новый сезон Formula 1 2026",
            text: "8 марта начинается новый долгожданный сезон Формулы-1 2026 в честь этого компания TAG HEUER демонстрируют новую линейку часов. Предзаказ можно оформить уже сегодня.",
            date: "06.03.2026",
            img: "/images/F12026 Watch.png"
        },
        {
            id: 3,
            title: "Акция на 8 марта",
            text: "В честь праздника на 8 марта мы предоставляем скидку на часы - 20% на любую модель. Успейте воспользоваться и подарить классные эмоции!",
            date: "08.03.2026",
            img: "/images/8 marta.png"
        },
        {
            id: 4,
            title: "McLaren x Richard Mille",
            text: "После презентации McLaren W1 компания Richard Mille представила невероятный RM 65-01 McLaren W1 – четвертое творение, созданное в рамках партнерства с McLaren.",
            date: "18.03.2026",
            img: "/images/McLaren.png"
        },
        {
            id: 5,
            title: "Aston Martin x Breitling",
            text: "Команда Aston Martion представила выпуск коллекции часов Breitling, которые поступят в продажу уже совсем скоро!",
            date: "17.03.2026",
            img: "/images/Aston.png"
        },
        {
            id: 6,
            title: "Hamilton x Call Of Duty Black Ops 7",
            text: "Компания Hamilton объединилась с Call Of Duty, для выпуска специального издания часов ограниченным тиражом.",
            date: "18.03.2026",
            img: "/images/CallOfDuty.png"
        },
        {
            id: 7,
            title: "Tag Heuer x Porsche",
            text: "TAG Heuer и Porsche. Эти две иконы дизайна, качества и инноваций идут параллельно с 1963 года. Пришло время объединиться на одном пути.",
            date: "17.03.2026",
            img: "/images/porche.png"
        },
        {
            id: 8,
            title: "Ferrari collections",
            text: "Scuderia Ferrari представила лимитированную серию часов подготовленную в честь старта нового сезона 2026.",
            date: "15.03.2026",
            img: "/images/ferrari.png"
        }
    ];

    public render(): string {
        return `
            <section class="news">
                <div class="container news__slider-wrapper">
                    <h2 class="news__main-title">Свежие новости</h2>
                    
                    <button class="slider-arrow slider-arrow--left" id="news-prev">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>

                    <div class="news__viewport">
                        <div class="news__grid" id="news-grid">
                            ${this.news.map(item => `
                                <article class="news-card ${item.id === 8 ? 'news-card--8' : ''}">
                                    <div class="news-card__image-box">
                                        <img src="${item.img}" alt="${item.title}" class="news-card__img">
                                    </div>

                                    <div class="news-card__info">
                                        <h3 class="news-card__title">${item.title}</h3>
                                        <p class="news-card__text">${item.text}</p>

                                        <div class="news-card__footer">
                                            <button class="news-card__btn">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                                    <polyline points="9 18 15 12 9 6"></polyline>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            `).join('')}
                        </div>
                    </div>

                    <button class="slider-arrow slider-arrow--right" id="news-next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </section>
        `;
    }

    public initSlider() {
        const grid = document.getElementById('news-grid') as HTMLElement;
        const viewport = document.querySelector('.news__viewport') as HTMLElement;
        const next = document.getElementById('news-next');
        const prev = document.getElementById('news-prev');

        if (!grid || !viewport || !next || !prev) return;

        let currentStep = 0;
        const cardsPerPage = 4;
        const totalPages = Math.ceil(this.news.length / cardsPerPage);

        const updateSlider = () => {
            const shift = viewport.offsetWidth * currentStep;
            grid.style.transform = `translateX(-${shift}px)`;
        };

        next.addEventListener('click', () => {
            if (currentStep < totalPages - 1) {
                currentStep++;
                updateSlider();
            }
        });

        prev.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateSlider();
            }
        });

        window.addEventListener('resize', updateSlider);
    }
}