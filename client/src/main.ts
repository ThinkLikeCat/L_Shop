import './style.css';

import './components/header/index.css';
import './components/videobanner/index.css';
import './components/features/index.css';
import './components/categories/style.css';
import './components/products/style.css';
import './components/tag-heuer/index.css';
import './components/hamilton/index.css';
import './components/news/index.css';
import './components/infa/index.css';

import { Header } from './components/header/index';
import { VideoBanner } from './components/videobanner/index';
import { Features } from './components/features/index';
import { Categories } from './components/categories/index';
import { ProductsGrid } from './components/products/index';
import { TagHeuer } from './components/tag-heuer/index';
import { Hamilton } from './components/hamilton/index';
import { NewsSection } from './components/news/index';
import { InfaSection } from './components/infa/index';

const app = document.getElementById('app');

if (app) {
    const header = new Header();
    const videoBanner = new VideoBanner();
    const features = new Features();
    const categories = new Categories();
    const productsGrid = new ProductsGrid();
    const tagHeuer = new TagHeuer();
    const hamilton = new Hamilton();
    const newsSection = new NewsSection();
    const infaSection = new InfaSection();

    app.innerHTML = `
        ${header.render()}
        
        <main id="main-content">
            ${videoBanner.render()}
            ${features.render()}
            ${categories.render()}
            ${productsGrid.render()}
            ${tagHeuer.render()}
            ${hamilton.render()}
            ${newsSection.render()}
            ${infaSection.render()}
        </main>
    `;

    // Инициализация интерактивных секций
    videoBanner.init();
    tagHeuer.init();

    if ((hamilton as any).init) {
        (hamilton as any).init();
    }

    if ((productsGrid as any).afterRender) {
        (productsGrid as any).afterRender();
    }

    // Инициализация слайдера новостей
    newsSection.initSlider();

} else {
    console.error("Критическая ошибка: элемент #app не найден в index.html.");
}
