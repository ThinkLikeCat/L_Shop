export interface IDeliveryRequest {
    city: string;
    street: string;
    house: string;
    apartment: string;
    postalCode: string;
    phone: string;
    email: string;
    deliveryDate: string;
    deliveryTime: string;
    comment: string;
    paymentMethod: 'card' | 'cash';
}

export const DeliveryAPI = {
    async createOrder(data: IDeliveryRequest) {
        const res = await fetch('/api/delivery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        return res.json();
    },

    async getOrders() {
        const res = await fetch('/api/delivery', { credentials: 'include' });
        return res.json();
    }
};