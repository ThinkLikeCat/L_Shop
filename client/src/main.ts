import './style.css';

import './components/header/index.css';
import './components/header/okno.css';
import './components/header/poisk.css';
import './components/videobanner/index.css';
import './components/features/index.css';
import './components/categories/style.css';
import './components/products/style.css';
import './components/news/index.css';
import './components/footer/index.css';

import './pages/registration/index.css';
import './pages/trash/index.css';
import './pages/login/index.css';
import './pages/delivery/index.css';

import { Header } from './components/header/index';
import { VideoBanner } from './components/videobanner/index';
import { ProductsGrid } from './components/products/index';
import { Footer } from './components/footer/index';

import { RegistrationPage, checkAuth, getCurrentUser } from './pages/registration/index';
import { BasketPage, BasketStore, addToCart, getCartItems } from './pages/trash/index';
import { DeliveryPage } from './pages/delivery/index';
import { LoginPage } from './pages/login/index';

import { logout } from './api/auth/logout';
import { CartAPI } from './api/cart';

const app = document.getElementById('app');

if (app) {
    const header = new Header();
    const videoBanner = new VideoBanner();
    const productsGrid = new ProductsGrid();
    const footer = new Footer();

    const loginPage = new LoginPage();
    const registrationPage = new RegistrationPage();
    const basketPage = new BasketPage();
    const deliveryPage = new DeliveryPage();

    const mainContentId = 'main-content';
    const renderHome = async (filters = {}) => {
        app.innerHTML = `
            ${header.render()}
            <main id="${mainContentId}">
                ${videoBanner.render()}
                ${productsGrid.render()}
            </main>
            ${footer.render()}
        `;
        header.init(async (query: string) => {
            productsGrid.init(async (product) => {
                await addToCart({
                    id: String(product.id),
                    title: product.title,
                    price: product.price,
                    image: product.img
                });
                renderBasket();
            });
        });

        header.updateAuthStatus(!!getCurrentUser());
        setupNavigationListeners();

        productsGrid.init(async (product) => {
            await addToCart({
                id: String(product.id),
                title: product.title,
                price: product.price,
                image: product.img
            });
            renderBasket();
        });
    };
    const renderLogin = () => {
        const main = document.getElementById(mainContentId);
        if (main) {
            main.innerHTML = loginPage.render();
            loginPage.init(() => renderRegistration());
            window.history.pushState({}, '', '/login');
        }
    };

    const renderRegistration = () => {
        const main = document.getElementById(mainContentId);
        if (main) {
            main.innerHTML = registrationPage.render();
            registrationPage.init();
            window.history.pushState({}, '', '/registration');
        }
    };

    const renderBasket = async () => {
        const main = document.getElementById(mainContentId);
        if (main) {
            // Загружаем данные корзины перед рендерингом
            await basketPage.loadData();
            main.innerHTML = basketPage.render();
            await basketPage.init(() => renderDelivery());
            window.history.pushState({}, '', '/basket');
        }
    };

    const renderDelivery = () => {
        if (!getCurrentUser()) return renderLogin();

        const main = document.getElementById(mainContentId);
        if (main) {
            main.innerHTML = deliveryPage.render();
            deliveryPage.init(() => {
                window.history.pushState({}, '', '/');
                renderHome();
            });
            window.history.pushState({}, '', '/delivery');
        }
    };
    const setupNavigationListeners = () => {
        document.querySelector('.logo-text')?.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.pushState({}, '', '/');
            renderHome();
        });

        document.getElementById('open-cart')?.addEventListener('click', (e) => {
            e.preventDefault();
            renderBasket();
        });

        document.getElementById('login-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            renderLogin();
        });

        document.getElementById('logout-btn')?.addEventListener('click', async (e) => {
            e.preventDefault();
            if (await logout()) {
                window.location.href = '/';
            }
        });
    };

    // Инициализация приложения
    const initApp = async () => {
        // Проверяем авторизацию при загрузке
        await checkAuth();
        
        // Загружаем корзину с сервера если авторизован
        await getCartItems();
        
        // Рендерим главную страницу
        renderHome();
    };

    initApp();
    window.addEventListener('popstate', () => {
        const path = window.location.pathname;
        if (path === '/login') renderLogin();
        else if (path === '/registration') renderRegistration();
        else if (path === '/basket') renderBasket();
        else if (path === '/delivery') renderDelivery();
        else renderHome();
    });

} else {
    console.error("Элемент #app не найден. Проверьте index.html");
}