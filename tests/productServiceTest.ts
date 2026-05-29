import * as FileManager from '../backend/src/utils/fileManager';
import * as ProductService from '../backend/src/services/productService';
import { Product } from '../backend/src/models/Product';
import { Category } from '../backend/src/models/Category';

jest.mock('../backend/src/utils/fileManager', () => ({
  readJSON: jest.fn(),
  writeJSON: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  remove: jest.fn()
}));

const mockedFileManager = FileManager as jest.Mocked<typeof FileManager>;

describe('ProductService', () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Black Watch',
      description: 'Luxury black watch',
      price: 500,
      discountPrice: 450,
      categoryId: 'cat1',
      images: [],
      stock: 10,
      isActive: true,
      rating: 4.5,
      reviewsCount: 10,
      characteristics: {},
      tags: ['luxury', 'black'],
      createdAt: '2026-01-01T12:00:00.000Z',
      updatedAt: '2026-01-01T12:00:00.000Z'
    },
    {
      id: '2',
      name: 'Sport Watch',
      description: 'Active sports watch',
      price: 250,
      discountPrice: null,
      categoryId: 'cat2',
      images: [],
      stock: 0,
      isActive: true,
      rating: 4.8,
      reviewsCount: 5,
      characteristics: {},
      tags: ['sport'],
      createdAt: '2026-05-01T12:00:00.000Z',
      updatedAt: '2026-05-01T12:00:00.000Z'
    },
    {
      id: '3',
      name: 'Vintage Watch',
      description: 'Retro style watch',
      price: 300,
      discountPrice: 280,
      categoryId: 'cat1',
      images: [],
      stock: 5,
      isActive: false,
      rating: 4.2,
      reviewsCount: 2,
      characteristics: {},
      tags: ['vintage'],
      createdAt: '2026-03-01T12:00:00.000Z',
      updatedAt: '2026-03-01T12:00:00.000Z'
    }
  ];

  const categories: Category[] = [
    { id: 'cat1', name: 'Watches', slug: 'watches', parentId: null, description: null, image: null, sortOrder: 1, isActive: true, createdAt: '2025-01-01T12:00:00.000Z', updatedAt: '2025-01-01T12:00:00.000Z' },
    { id: 'cat2', name: 'Sports', slug: 'sports', parentId: null, description: null, image: null, sortOrder: 2, isActive: true, createdAt: '2025-02-01T12:00:00.000Z', updatedAt: '2025-02-01T12:00:00.000Z' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getProducts returns all items when no filters are provided', async () => {
    mockedFileManager.readJSON.mockResolvedValue(products);
    const result = await ProductService.getProducts();
    expect(result).toEqual(products);
  });

  test('getProducts filters by search query using name, description, and tags', async () => {
    mockedFileManager.readJSON.mockResolvedValue(products);
    const result = await ProductService.getProducts({ search: 'luxury' });
    expect(result).toEqual([products[0]]);
  });

  test('getProducts filters by category id', async () => {
    mockedFileManager.readJSON.mockResolvedValue(products);
    const result = await ProductService.getProducts({ category: 'cat1' });
    expect(result).toEqual([products[0], products[2]]);
  });

  test('getProducts filters by availability', async () => {
    mockedFileManager.readJSON.mockResolvedValue(products);
    const result = await ProductService.getProducts({ available: true });
    expect(result).toEqual([products[0]]);
  });

  test('getProducts applies minPrice, maxPrice, and sorting', async () => {
    mockedFileManager.readJSON.mockResolvedValue(products);
    const result = await ProductService.getProducts({ minPrice: 260, maxPrice: 500, sort: 'price_desc' });
    expect(result).toEqual([products[0], products[2]]);
  });

  test('getProductById returns the correct product', async () => {
    mockedFileManager.readJSON.mockResolvedValue(products);
    const result = await ProductService.getProductById('2');
    expect(result).toEqual(products[1]);
  });

  test('getCategories returns category list', async () => {
    mockedFileManager.readJSON.mockResolvedValue(categories);
    const result = await ProductService.getCategories();
    expect(result).toEqual(categories);
  });

  test('getCategoryById returns the correct category', async () => {
    mockedFileManager.readJSON.mockResolvedValue(categories);
    const result = await ProductService.getCategoryById('cat1');
    expect(result).toEqual(categories[0]);
  });

  test('getProductsByCategory returns appropriate products', async () => {
    mockedFileManager.readJSON.mockResolvedValue(products);
    const result = await ProductService.getProductsByCategory('cat1');
    expect(result).toEqual([products[0], products[2]]);
  });

  test('getPopularProducts returns only active popular products', async () => {
    mockedFileManager.readJSON.mockResolvedValue(products);
    const result = await ProductService.getPopularProducts(2);
    expect(result).toEqual([products[1], products[0]]);
  });

  test('getNewProducts returns newest active products ordered by createdAt', async () => {
    mockedFileManager.readJSON.mockResolvedValue(products);
    const result = await ProductService.getNewProducts(2);
    expect(result).toEqual([products[1], products[0]]);
  });

  test('searchProducts delegates to getProducts with a search query', async () => {
    mockedFileManager.readJSON.mockResolvedValue(products);
    const result = await ProductService.searchProducts('retro');
    expect(result).toEqual([products[2]]);
  });
});
