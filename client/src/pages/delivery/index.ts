import './index.css';
import { deliveryApi } from '../../api/index';
import { getCurrentUser } from '../registration/index';
import { BasketStore } from '../trash/index';

export class DeliveryPage {
    public render(): string {
        return `
            <div class="delivery-page">
                <div class="container delivery-container">
                    <h1 class="delivery-main-title">ОФОРМЛЕНИЕ ЗАКАЗА</h1>
                    <div class="order-steps">
                        
                        <div class="order-step order-step--active" id="step-1">
                            <div class="order-step__marker">1</div>
                            <div class="order-step__content">
                                <h2 class="order-step__title">КОНТАКТНЫЕ ДАННЫЕ</h2>
                                <div class="order-step__body">
                                    <div class="order-input-group">
                                        <label>Email *</label>
                                        <input type="email" id="order-email" placeholder="example@mail.com" required>
                                    </div>
                                    <div class="order-input-group">
                                        <label>Телефон *</label>
                                        <input type="tel" id="order-phone" placeholder="+7 (___) ___-__-__" required>
                                    </div>
                                    <button class="order-btn-black" id="to-step-2">ДАЛЕЕ К АДРЕСУ</button>
                                </div>
                            </div>
                        </div>

                        <div class="order-step" id="step-2">
                            <div class="order-step__marker">2</div>
                            <div class="order-step__content">
                                <h2 class="order-step__title">АДРЕС ДОСТАВКИ</h2>
                                <div class="order-step__body">
                                    <div class="order-grid">
                                        <div class="order-input-group">
                                            <label>Город</label>
                                            <input type="text" id="order-city" placeholder="Москва">
                                        </div>
                                        <div class="order-input-group">
                                            <label>Улица</label>
                                            <input type="text" id="order-street" placeholder="Тверская">
                                        </div>
                                        <div class="order-input-row">
                                            <input type="text" id="order-house" placeholder="Дом">
                                            <input type="text" id="order-apt" placeholder="Кв/Офис">
                                            <input type="text" id="order-zip" placeholder="Индекс">
                                        </div>
                                    </div>
                                    <button class="order-btn-black" id="to-step-3">ДАЛЕЕ К ОПЛАТЕ</button>
                                </div>
                            </div>
                        </div>

                        <div class="order-step" id="step-3">
                            <div class="order-step__marker">3</div>
                            <div class="order-step__content">
                                <h2 class="order-step__title">ОПЛАТА И ПОДТВЕРЖДЕНИЕ</h2>
                                <div class="order-step__body">
                                    <div class="order-input-group">
                                        <label>Метод оплаты</label>
                                        <select id="order-payment">
                                            <option value="card">Банковская карта</option>
                                            <option value="cash">Наличными курьеру</option>
                                        </select>
                                    </div>
                                    <div class="order-input-group">
                                        <label>Комментарий к заказу</label>
                                        <textarea id="order-comment" placeholder="Например: позвонить за час"></textarea>
                                    </div>
                                    <button class="order-btn-gold" id="final-checkout">ПОДТВЕРДИТЬ ЗАКАЗ</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `;
    }

    public init(onGuestClick: () => void): void {
        const user = getCurrentUser();
        
        // Если пользователь авторизован, показываем форму доставки сразу
        if (user) {
            this.showStep2();
        }

        const btnTo2 = document.getElementById('btn-to-step-2');
        const emailInput = document.getElementById('delivery-email') as HTMLInputElement;

        const steps = ['step-1', 'step-2', 'step-3'];

        const goToStep = (stepNum: number) => {
            document.querySelectorAll('.order-step').forEach(s => s.classList.remove('order-step--active'));
            document.getElementById(`step-${stepNum}`)?.classList.add('order-step--active');
        };

        document.getElementById('to-step-2')?.addEventListener('click', () => goToStep(2));
        document.getElementById('to-step-3')?.addEventListener('click', () => goToStep(3));

        document.getElementById('final-checkout')?.addEventListener('click', async () => {
            const orderData: IDeliveryRequest = {
                city: (document.getElementById('order-city') as HTMLInputElement).value,
                street: (document.getElementById('order-street') as HTMLInputElement).value,
                house: (document.getElementById('order-house') as HTMLInputElement).value,
                apartment: (document.getElementById('order-apt') as HTMLInputElement).value,
                postalCode: (document.getElementById('order-zip') as HTMLInputElement).value,
                phone: (document.getElementById('order-phone') as HTMLInputElement).value,
                email: (document.getElementById('order-email') as HTMLInputElement).value,
                deliveryDate: new Date().toISOString().split('T')[0],
                deliveryTime: "10:00-18:00",
                comment: (document.getElementById('order-comment') as HTMLTextAreaElement).value,
                paymentMethod: (document.getElementById('order-payment') as HTMLSelectElement).value as 'card' | 'cash'
            };

        const btnTo3 = document.getElementById('btn-to-step-3');
        const step3 = document.getElementById('step-3');
        
        btnTo3?.addEventListener('click', async () => {
            // Собираем данные формы
            const city = (document.querySelector('[data-delivery-city]') as HTMLInputElement)?.value;
            const address = (document.querySelector('[data-delivery-address]') as HTMLInputElement)?.value;
            
            if (!city || !address) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            const user = getCurrentUser();
            if (!user) {
                alert('Необходимо авторизоваться для оформления заказа');
                return;
            }
            
            // Рассчитываем общую сумму
            const totalPrice = BasketStore.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Создаем заказ через API
            try {
                const response = await deliveryApi.createOrder({
                    deliveryAddress: {
                        city: city,
                        street: address,
                        house: '',
                    },
                    phone: user.phone || '',
                    email: user.email || '',
                    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +3 дня
                    deliveryTime: '10:00-18:00',
                    paymentMethod: 'card',
                });
                
                if (response.success) {
                    step3?.classList.add('order-step--active');
                    
                    // Очищаем корзину
                    BasketStore.length = 0;
                    
                    alert('Заказ успешно сформирован! Спасибо за выбор RoyalSeconds.');
                    
                    // Перенаправляем на главную
                    window.history.pushState({}, '', '/');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                } else {
                    alert(response.message || 'Ошибка при создании заказа');
                }
            } catch (error) {
                console.error('Ошибка создания заказа:', error);
                alert('Произошла ошибка при оформлении заказа');
            }
        });
    }
    
    private showStep2(): void {
        const step2 = document.getElementById('step-2');
        const formContainer = document.getElementById('delivery-form-container');
        const step1 = document.getElementById('step-1');
        
        step1?.classList.remove('order-step--active');
        step2?.classList.add('order-step--active');
        formContainer?.classList.remove('hidden');
    }
}
