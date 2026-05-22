import { IProduct } from '../products';

export interface ICartItem {
    count: number;
    product: IProduct;
}


export interface ICartResponse {
    success: boolean;
    cart: {
        id: string;
        userId: string;
        basket: ICartItem[];
    };
}

const API_URL = '/api/cart';

export const CartAPI = {
    async getCart(): Promise<ICartResponse> {
        const res = await fetch(API_URL, { credentials: 'include' });
        return res.json();
    },

    async add(productId: string, count: number = 1): Promise<ICartResponse> {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, count }),
            credentials: 'include'
        });
        return res.json();
    },
    async update(productId: string, count: number): Promise<ICartResponse> {
        const res = await fetch(`${API_URL}/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count }),
            credentials: 'include'
        });
        return res.json();
    },

    async remove(productId: string): Promise<ICartResponse> {
        const res = await fetch(`${API_URL}/${productId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        return res.json();
    }
};