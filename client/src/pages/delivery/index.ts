import './index.css';

export class DeliveryPage {
    public render(): string {
        return `
            <div class="delivery-page">
                <div class="container delivery-container">
                    <div class="order-steps">
                        
                        <div class="order-step order-step--active" id="step-1">
                            <div class="order-step__marker">1</div>
                            <div class="order-step__content">
                                <h2 class="order-step__title">АВТОРИЗОВАТЬСЯ</h2>
                                <div class="order-step__body">
                                    <div class="auth-guest-box">
                                        <div class="order-input-group">
                                            <label>Адрес электронной почты *</label>
                                            <input type="email" placeholder="example@mail.com" data-delivery-email id="delivery-email" required>
                                        </div>
                                        <p class="order-info-text">
                                            Для оформления заказа вам потребуется зарегистрировать аккаунт.
                                            
                                        </p>
                                        <button class="order-btn-black" id="btn-to-step-2">Зарегистрироваться</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="order-step" id="step-2">
                            <div class="order-step__marker">2</div>
                            <div class="order-step__content">
                                <h2 class="order-step__title">АДРЕС И ДОСТАВКА</h2>
                                <div class="order-step__body hidden" id="delivery-form-container">
                                    <form class="delivery-form" data-delivery-form>
                                        <div class="order-input-group">
                                            <label>Город</label>
                                            <input type="text" placeholder="Минск" data-delivery-city required>
                                        </div>
                                        <div class="order-input-group">
                                            <label>Улица, дом, квартира</label>
                                            <input type="text" placeholder="ул. Центральная, д. 10" data-delivery-address required>
                                        </div>
                                        <div class="order-input-group">
                                            <label>Способ доставки</label>
                                            <select data-delivery-type>
                                                <option value="courier">Курьерская доставка (Royal Express)</option>
                                                <option value="pickup">Самовывоз из бутика</option>
                                            </select>
                                        </div>
                                        <button type="button" class="order-btn-black" id="btn-to-step-3">ДАЛЕЕ К ОПЛАТЕ</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="order-step" id="step-3">
                            <div class="order-step__marker">3</div>
                            <div class="order-step__content">
                                <h2 class="order-step__title">ВАРИАНТ ОПЛАТЫ</h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `;
    }

    public init(onGuestClick: () => void): void {
        const btnTo2 = document.getElementById('btn-to-step-2');
        const emailInput = document.getElementById('delivery-email') as HTMLInputElement;

        btnTo2?.addEventListener('click', () => {
            const emailValue = emailInput?.value.trim();
            
            if (!emailValue || !emailValue.includes('@')) {
                alert('Пожалуйста, введите корректный email');
                return;
            }

            localStorage.setItem('pendingEmail', emailValue);

            onGuestClick();
        });

        const btnTo3 = document.getElementById('btn-to-step-3');
        const step3 = document.getElementById('step-3');
        btnTo3?.addEventListener('click', () => {
            step3?.classList.add('order-step--active');
            alert('Заказ успешно сформирован! Спасибо за выбор RoyalSeconds.');
        });
    }
}
