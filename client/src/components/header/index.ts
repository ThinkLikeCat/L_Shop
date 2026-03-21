import './index.css';
import { WatchesModal } from './okno'; 

export class Header {
    private watchesModal = new WatchesModal();

    render(): string {
        return `
            <header class="header">
                <div class="container header__container">
                    <nav class="header__nav">
                        <ul class="header__menu">
                            <li><button class="header__menu-btn" id="open-watches">ЧАСЫ</button></li>
                            <!-- Заменили ссылки на span с общим классом -->
                            <li><span class="header__menu-item">КОЛЛЕКЦИИ</span></li>
                            <li><span class="header__menu-item">УСЛУГИ</span></li>
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
                ${this.watchesModal.render()} 
            </header>
        `;
    }

    init(): void {
        const btn = document.getElementById('open-watches');
        const modal = document.getElementById('watches-modal');
        const overlay = document.getElementById('menu-overlay');

        if (!btn || !modal || !overlay) return;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            modal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
}
