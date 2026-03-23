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
import './pages/delivery/index.css';
import './pages/login/index.css';

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
import { BasketPage, BasketStore } from './pages/trash/index';
import { DeliveryPage } from './pages/delivery/index';
import { LoginPage } from './pages/login/index';

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
    const footer = new Footer();

    const registrationPage = new RegistrationPage();
    const basketPage = new BasketPage();
    const deliveryPage = new DeliveryPage();
    const loginPage = new LoginPage();

    const mainContentId = 'main-content';

    const renderHome = () => {
        app.innerHTML = `
            ${header.render()}
            <main id="${mainContentId}">
                ${videoBanner.render()}
                ${features.render()}
                ${categories.render()}
                ${productsGrid.render()}
                ${tagHeuer.render()}
                ${hamilton.render()}
                ${newsSection.render()}
                ${infaSection.render()}
            </main>
            ${footer.render()}
        `;

        header.init();
        videoBanner.init();
        tagHeuer.init();
        newsSection.initSlider();
        
        if ((hamilton as any).init) (hamilton as any).init();
        if ((productsGrid as any).afterRender) (productsGrid as any).afterRender();

        productsGrid.init((product) => {
            BasketStore.push({
                id: product.id, title: product.title, price: product.price, image: product.img
            });
            renderBasket(); 
        });

        initHeaderNavigation();
    };
    const renderLogin = () => {
        const main = document.getElementById(mainContentId);
        if (main) {
            main.innerHTML = loginPage.render();
            loginPage.init(() => renderRegistration());
            window.history.pushState({}, '', '/login');
            window.scrollTo(0, 0);
        }
    };

    const renderRegistration = () => {
        const main = document.getElementById(mainContentId);
        if (main) {
            main.innerHTML = registrationPage.render();
            registrationPage.init(); 
            window.history.pushState({}, '', '/registration');
            window.scrollTo(0, 0);
        }
    };

    const renderBasket = () => {
        const main = document.getElementById(mainContentId);
        if (main) {
            main.innerHTML = basketPage.render();
            basketPage.init(() => renderDelivery());
            window.history.pushState({}, '', '/basket');
            window.scrollTo(0, 0);
        }
    };

    const renderDelivery = () => {
        const main = document.getElementById(mainContentId);
        if (main) {
            main.innerHTML = deliveryPage.render();
            deliveryPage.init(() => renderRegistration());
            window.history.pushState({}, '', '/delivery');
            window.scrollTo(0, 0);
        }
    };

    const initHeaderNavigation = () => {
        document.getElementById('open-cart')?.addEventListener('click', (e) => {
            e.preventDefault();
            renderBasket();
        });

        document.querySelector('[data-registration]')?.addEventListener('click', (e) => {
            e.preventDefault();
            renderLogin(); 
        });
        
        document.querySelector('.logo-text')?.addEventListener('click', (e) => {
            e.preventDefault();
            renderHome();
            window.history.pushState({}, '', '/');
        });
    };

    renderHome();
    window.addEventListener('popstate', () => {
        const path = window.location.pathname;
        if (path === '/registration') renderRegistration();
        else if (path === '/login') renderLogin();
        else if (path === '/basket') renderBasket();
        else if (path === '/delivery') renderDelivery();
        else renderHome();
    });

} else {
    console.error("Ошибка: элемент #app не найден");
}
