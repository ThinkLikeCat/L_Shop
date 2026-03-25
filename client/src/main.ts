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

import { RegistrationPage, checkAuth } from './pages/registration/index';
import { BasketPage, BasketStore, addToCart, getCartItems } from './pages/trash/index';
import { DeliveryPage } from './pages/delivery/index';
import { LoginPage } from './pages/login/index';
import { BasketPage } from './pages/trash/index';
import { DeliveryPage } from './pages/delivery/index';

import { logout } from './api/auth/logout';
import { checkAuth } from './api/auth/me';
import { CartAPI } from './api/cart';

const app = document.getElementById('app');
let currentUser: any = null;

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
            await productsGrid.init(onBuyHandler, { search: query });
        });

        header.updateAuthStatus(!!currentUser);
        setupNavigationListeners();

        productsGrid.init(async (product) => {
            // Добавляем товар через API
            await addToCart({
                id: String(product.id),
                title: product.title,
                price: product.price,
                image: product.img
            });
            renderBasket(); 
        });

        try {
            const res = await CartAPI.add(product.id, 1);
            if (res.success) {
                await renderBasket();
            }
        } catch (error) {
            console.error('Ошибка добавления:', error);
        }
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
        if (!currentUser) return renderLogin();
        
        const main = document.getElementById(mainContentId);
        if (main) {
            main.innerHTML = deliveryPage.render();
            deliveryPage.init(currentUser, () => {
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
                currentUser = null;
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
        if (path !== '/') {
            app.innerHTML = `
                ${header.render()}
                <main id="${mainContentId}"></main>
                ${footer.render()}
            `;
            header.init(async (q) => await renderHome({ search: q }));
            header.updateAuthStatus(!!currentUser);
            setupNavigationListeners();
        }
        if (path === '/login') renderLogin();
        else if (path === '/registration') renderRegistration();
        else if (path === '/basket') await renderBasket();
        else if (path === '/delivery') renderDelivery();
        else await renderHome();
    };

    initApp();
    window.addEventListener('popstate', async () => {
        const path = window.location.pathname;
        if (path === '/basket') await renderBasket();
        else if (path === '/delivery') renderDelivery();
        else if (path === '/login') renderLogin();
        else await renderHome();
    });

} else {
    console.error("Элемент #app не найден. Проверьте index.html");
}