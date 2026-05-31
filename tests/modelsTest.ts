import { createUser, toSafeUser } from '../backend/src/models/User';
import { createProduct, getEffectivePrice, isAvailable } from '../backend/src/models/Product';
import { createCategory, generateSlug } from '../backend/src/models/Category';

describe('User model', () => {
  test('createUser fills missing optional fields with defaults', () => {
    const user = createUser({
      name: 'Test',
      email: 'test@example.com',
      login: 'testuser',
      phone: '123',
      password: 'pwd'
    });

    expect(user).toMatchObject({
      name: 'Test',
      email: 'test@example.com',
      login: 'testuser',
      phone: '123',
      password: 'pwd',
      avatar: null,
      cartId: null,
      sessionId: null,
      sessionExpires: null
    });
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });

  test('toSafeUser removes password field', () => {
    const safeUser = toSafeUser({
      id: '1',
      name: 'Test',
      email: 'test@example.com',
      login: 'testuser',
      phone: '123',
      password: 'pwd',
      avatar: null,
      cartId: null,
      sessionId: null,
      sessionExpires: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    expect((safeUser as any).password).toBeUndefined();
    expect(safeUser).toMatchObject({ id: '1', email: 'test@example.com' });
  });
});

describe('Product model', () => {
  test('createProduct fills default values and uses discount price when present', () => {
    const product = createProduct({
      id: '1',
      name: 'Test Product',
      price: 100,
      categoryId: 'cat1'
    });

    expect(product).toMatchObject({
      id: '1',
      name: 'Test Product',
      description: '',
      price: 100,
      discountPrice: null,
      categoryId: 'cat1',
      images: [],
      stock: 0,
      isActive: true,
      rating: 0,
      reviewsCount: 0,
      characteristics: {},
      tags: []
    });
  });

  test('getEffectivePrice returns discount price when lower', () => {
    const product = createProduct({
      id: '1',
      name: 'Discounted',
      price: 200,
      discountPrice: 150,
      categoryId: 'cat1'
    });

    expect(getEffectivePrice(product)).toBe(150);
  });

  test('isAvailable returns true for active product with stock', () => {
    const product = createProduct({
      id: '1',
      name: 'Available',
      price: 100,
      stock: 5,
      categoryId: 'cat1',
      isActive: true
    } as any);

    expect(isAvailable(product)).toBe(true);
  });

  test('isAvailable returns false for inactive or out-of-stock products', () => {
    const inactive = createProduct({
      id: '2',
      name: 'Inactive',
      price: 100,
      stock: 5,
      categoryId: 'cat1',
      isActive: false
    } as any);
    const outOfStock = createProduct({
      id: '3',
      name: 'Empty',
      price: 100,
      stock: 0,
      categoryId: 'cat1'
    });

    expect(isAvailable(inactive)).toBe(false);
    expect(isAvailable(outOfStock)).toBe(false);
  });
});

describe('Category model', () => {
  test('createCategory generates slug when missing', () => {
    const category = createCategory({ id: 'cat1', name: 'New Watches' });
    expect(category.slug).toBe('new-watches');
  });

  test('generateSlug creates a normalized slug', () => {
    expect(generateSlug('Best Watches & Gear')).toBe('best-watches-gear');
  });
});
