import './index.css';

export class Footer {
    public render(): string {
        return `
            <footer class="footer">
                <div class="container">

                    <div class="footer__grid">

                        <div class="footer__col">
                            <h3 class="footer__title">Бренды</h3>
                            <ul class="footer__list">
                                <li>Hamilton</li>
                                <li>Tag Heuer</li>
                                <li>Rado</li>
                                <li>Oris</li>
                                <li>Tissot</li>
                                <li>Swatch</li>
                            </ul>
                        </div>

                        <div class="footer__col">
                            <h3 class="footer__title">Каталог</h3>
                            <ul class="footer__list">
                                <li>Новинки</li>
                                <li>Распродажа</li>
                                <li>Мужские</li>
                                <li>Женские</li>
                            </ul>
                        </div>

                        <div class="footer__col">
                            <h3 class="footer__title">О компании</h3>
                            <ul class="footer__list">
                                <li>Карта клиента</li>
                                <li>Оплата</li>
                                <li>Доставка</li>
                                <li>Подарочный сертификат</li>
                                <li>Наша команда</li>
                            </ul>
                        </div>

                        <div class="footer__col">
                            <h3 class="footer__title">Контакты</h3>
                            <ul class="footer__list">
                                <li>royalseconds@gmail.com</li>
                                <li>+375 29 856 75 83</li>
                            </ul>
                        </div>

                        <div class="footer__col">
                            <h3 class="footer__title">Соц.сети</h3>
                            <ul class="footer__list">
                                <li><a href="https://instagram.com" target="_blank" class="footer-underline">Instagram</a></li>
                                <li><a href="https://youtube.com" target="_blank" class="footer-underline">Youtube</a></li>
                                <li><a href="https://x.com" target="_blank" class="footer-underline">X</a></li>
                            </ul>
                        </div>

                        <div class="footer__col">
                            <h3 class="footer__title">Партнеры</h3>
                            <ul class="footer__list">
                                <li><a href="https://www.instagram.com/22rt_trackday/" target="_blank" class="footer-underline">22RT</a></li>
                                <li><a href="https://racerent.by/" target="_blank" class="footer-underline">RaceRent</a></li>
                                <li><a href="https://applejam.by/" target="_blank" class="footer-underline">AppleJam</a></li>
                            </ul>
                        </div>

                    </div>

                    <div class="footer__payments">
                        <img src="/images/Оплата.png" alt="Способы оплаты">
                    </div>

                    <p class="footer__copy">Copyright © 2026 RoyalSeconds</p>

                </div>
            </footer>
        `;
    }
}
