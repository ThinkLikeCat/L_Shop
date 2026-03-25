export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    categoryId: string;
    images: string[];
    stock: number;
    isActive: boolean;
    rating: number;
    reviewsCount: number;
    characteristics: {
        brand?: string;
        mechanism?: string;
        waterResistance?: string;
        caseMaterial?: string;
        strapMaterial?: string;
    };
    tags: string[];
}

interface IProductsResponse {
    success: boolean;
    count: number;
    products: IProduct[];
}

export interface IProductFilters {
    search?: string;
    category?: string;
    available?: boolean;
    minPrice?: number;
    maxPrice?: number;
    sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating';
}

export const getProducts = async (filters: IProductFilters = {}): Promise<IProductsResponse> => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString());
        }
    });

    const response = await fetch(`/api/products?${params.toString()}`);
    if (!response.ok) throw new Error('Ошибка при загрузке товаров');
    return await response.json();
};