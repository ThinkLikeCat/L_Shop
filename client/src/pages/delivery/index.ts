import './index.css';
import { DeliveryAPI, IDeliveryRequest } from '../../api/delivery';

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

    public init(currentUser: any, onSuccess: () => void): void {
        if (currentUser) {
            (document.getElementById('order-email') as HTMLInputElement).value = currentUser.email || '';
            (document.getElementById('order-phone') as HTMLInputElement).value = currentUser.phone || '';
        }

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

            try {
                const result = await DeliveryAPI.createOrder(orderData);
                if (result.success) {
                    alert('Заказ успешно создан! Номер заказа: ' + result.order.id);
                    onSuccess();
                } else {
                    alert('Ошибка: ' + result.message);
                }
            } catch (e) {
                alert('Сетевая ошибка при создании заказа');
            }
        });
    }
}