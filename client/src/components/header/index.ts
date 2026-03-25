import './index.css';
import { WatchesModal } from './okno'; 
import { SearchOverlay } from './poisk'; 

export class Header {
    private watchesModal = new WatchesModal();
    private searchOverlay = new SearchOverlay();

    public render(): string {
        return `
            <header class="header">
                <div class="container header__container">
                    <nav class="header__nav">
                        <ul class="header__menu">
                            <li><button class="header__menu-btn" id="open-watches">ЧАСЫ</button></li>
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
                        <button class="header__icon-btn" id="btn-search-open">
                            <img src="/images/Поиск.png" alt="Поиск">
                        </button>
                        <button class="header__icon-btn" id="open-cart">
                            <img src="/images/корзина.png" alt="Корзина">
                        </button>
                        <button class="header__icon-btn user-btn" id="login-link" data-registration>
                            <img src="/images/user.png" alt="Профиль">
                        </button>
                        <button class="header__icon-btn" id="logout-btn" style="display: none;" title="Выход">
                            <img src="/images/logout.png" alt="Выход" style="width: 20px;">
                        </button>
                    </div>
                </div>
                ${this.watchesModal.render()} 
                ${this.searchOverlay.render()} 
            </header>
        `;
    }

    public init(onSearch?: (query: string) => void): void {
        const btnWatches = document.getElementById('open-watches');
        const modalWatches = document.getElementById('watches-modal');
        const overlayWatches = document.getElementById('menu-overlay');

        btnWatches?.addEventListener('click', (e) => {
            e.preventDefault();
            modalWatches?.classList.toggle('active');
            overlayWatches?.classList.toggle('active');
        });

        overlayWatches?.addEventListener('click', () => {
            modalWatches?.classList.remove('active');
            overlayWatches?.classList.remove('active');
        });

        const btnSearchOpen = document.getElementById('btn-search-open');
        
        btnSearchOpen?.addEventListener('click', () => {
            this.searchOverlay.open();
        });

        this.searchOverlay.init((query) => {
            if (onSearch) onSearch(query);
        });
    }

    public updateAuthStatus(isLoggedIn: boolean): void {
        const loginBtn = document.getElementById('login-link');
        const logoutBtn = document.getElementById('logout-btn');
        if (loginBtn) loginBtn.style.display = isLoggedIn ? 'none' : 'flex';
        if (logoutBtn) logoutBtn.style.display = isLoggedIn ? 'flex' : 'none';
    }
}