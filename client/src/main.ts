import './style.css';

import './components/header/index.css';
import './components/header/okno.css';
import './components/videobanner/index.css';
import './components/features/index.css';
import './components/categories/style.css';
import './components/products/style.css';
import './components/tag-heuer/index.css';
import './components/hamilton/index.css';
import './components/news/index.css';
import './components/infa/index.css';
import './components/footer/index.css';

import './pages/registration/index.css';
import './pages/trash/index.css'; 

import { Header } from './components/header/index';
import { VideoBanner } from './components/videobanner/index';
import { Features } from './components/features/index';
import { Categories } from './components/categories/index';
import { ProductsGrid } from './components/products/index';
import { TagHeuer } from './components/tag-heuer/index';
import { Hamilton } from './components/hamilton/index';
import { NewsSection } from './components/news/index';
import { InfaSection } from './components/infa/index';
import { Footer } from './components/footer/index';

import { RegistrationPage } from './pages/registration/index';
import { BasketPage } from './pages/trash/index'; 

const app = document.getElementById('app');

if (app) {
    const header = new Header();
    const registrationPage = new RegistrationPage();
    const basketPage = new BasketPage(); 
    
    const videoBanner = new VideoBanner();
    const features = new Features();
    const categories = new Categories();
    const productsGrid = new ProductsGrid();
    const tagHeuer = new TagHeuer();
    const hamilton = new Hamilton();
    const newsSection = new NewsSection();
    const infaSection = new InfaSection();
    const footer = new Footer();

    const renderHome = () => {
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
                ${footer.render()}
            </main>
        `;
        
        header.init();
        videoBanner.init();
        tagHeuer.init();
        newsSection.initSlider();
        if ((hamilton as any).init) (hamilton as any).init();
        if ((productsGrid as any).afterRender) (productsGrid as any).afterRender();

        initNavigation(); 
    };

    const initNavigation = () => {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        const userBtn = document.querySelector('[data-registration]');
        userBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            mainContent.innerHTML = registrationPage.render();
            registrationPage.init();
            window.history.pushState({}, '', '/registration');
            window.scrollTo(0, 0);
        });

        const cartBtn = document.getElementById('open-cart');
        cartBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            mainContent.innerHTML = basketPage.render();
            basketPage.init();
            window.history.pushState({}, '', '/basket');
            window.scrollTo(0, 0);
        });
    };

    renderHome();

    window.addEventListener('popstate', () => {
        const path = window.location.pathname;
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        if (path === '/registration') {
            mainContent.innerHTML = registrationPage.render();
            registrationPage.init();
        } else if (path === '/basket') {
            mainContent.innerHTML = basketPage.render();
            basketPage.init();
        } else {
            renderHome();
        }
    });

} else {
    console.error("Ошибка: элемент #app не найден");
}
