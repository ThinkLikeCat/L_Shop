export class Header {
    render(): string {
        return `
            <header class="header">
                <div class="container header__container">
                    <nav class="header__nav">
                        <ul class="header__menu">
                            <li><a href="/watches" data-link>ЧАСЫ</a></li>
                            <li><a href="/collections" data-link>КОЛЛЕКЦИИ</a></li>
                            <li><a href="/services" data-link>УСЛУГИ</a></li>
                        </ul>
                    </nav>

                    <div class="header__logo">
                        <a href="/" data-link class="logo-text">
                            <span class="accent">R</span>oyal<span class="accent">S</span>econds
                        </a>
                    </div>

                    <div class="header__actions">
                        <button class="header__icon-btn">
                            <img src="/images/Поиск.png" alt="Поиск">
                        </button>
                        <button class="header__icon-btn" id="open-cart">
                            <img src="/images/корзина.png" alt="Корзина">
                        </button>
                        <button class="header__icon-btn user-btn" data-registration>
                            <img src="/images/user.png" alt="Профиль">
                        </button>
                    </div>
                </div>
            </header>
        `;
    }
}
