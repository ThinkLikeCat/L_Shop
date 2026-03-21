import './okno.css';

export class WatchesModal {
    public render(): string {
        return `
            <div class="watches-modal" id="watches-modal">
                <div class="watches-modal__content">
                    
                    <div class="watches-modal__col">
                        <ul class="watches-modal__list">
                            <li><a href="/catalog" class="watches-modal__link">Посмотреть все часы</a></li>
                            <li><a href="/catalog/auto" class="watches-modal__link">Автоматические часы</a></li>
                            <li><a href="/catalog/men" class="watches-modal__link">Мужские часы</a></li>
                            <li><a href="/catalog/women" class="watches-modal__link">Женские часы</a></li>
                            <li><a href="/catalog/new" class="watches-modal__link">Новые продукты</a></li>
                        </ul>
                    </div>

                    <div class="watches-modal__col watches-modal__col--middle">
                        <ul class="watches-modal__list">
                            <li><a href="/catalog/mech" class="watches-modal__link">Механические часы</a></li>
                            <li><a href="/catalog/divers" class="watches-modal__link">Дайверские часы</a></li>
                            <li><a href="/collections" class="watches-modal__link">Коллекции</a></li>
                        </ul>
                    </div>

                    <div class="watches-modal__promo">
                        <img src="/images/Hamilton x Resident Evill.png" alt="Hamilton x Resident Evil" class="watches-modal__img">
                        <div class="watches-modal__promo-info">
                            <h3 class="watches-modal__promo-title">Hamilton x Resident Evil</h3>
                        </div>
                    </div>

                </div>
            </div>

            <div class="menu-overlay" id="menu-overlay"></div>
        `;
    }
}