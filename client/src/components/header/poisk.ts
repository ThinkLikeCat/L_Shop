export class SearchOverlay {
    public render(): string {
        return `
            <div class="search-overlay" id="search-overlay">
                <div class="search-overlay__content">
                    <button class="search-overlay__close" id="search-close">✕</button>
                    <div class="search-overlay__field">
                        <input type="text" 
                               id="search-input" 
                               class="search-overlay__input" 
                               placeholder="ПОИСК ПО МОДЕЛЯМ И БРЕНДАМ..." 
                               autocomplete="off">
                        <div class="search-overlay__line"></div>
                    </div>
                    <p class="search-overlay__hint">Нажмите Enter, чтобы найти</p>
                </div>
            </div>
        `;
    }

    public init(onSearch: (query: string) => void): void {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('search-input') as HTMLInputElement;
        const closeBtn = document.getElementById('search-close');

        if (!overlay || !input || !closeBtn) return;

        const close = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = ''; 
            input.value = '';
        };

        closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = input.value.trim();
                onSearch(query);
                close();
            }
            if (e.key === 'Escape') close();
        });
    }

    public open(): void {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('search-input') as HTMLInputElement;
        if (overlay && input) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
            setTimeout(() => input.focus(), 300);
        }
    }
}