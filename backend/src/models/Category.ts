/**
 * Интерфейс категории
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  description: string | null;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Данные для создания категории
 */
export interface CreateCategoryData {
  id: string;
  name: string;
  slug?: string;
  parentId?: string | null;
  description?: string | null;
  image?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string;
}

/**
 * Создает объект категории с значениями по умолчанию
 */
export function createCategory(data: CreateCategoryData): Category {
  const now = new Date().toISOString();
  return {
    id: data.id,
    name: data.name,
    slug: data.slug ?? generateSlug(data.name),
    parentId: data.parentId ?? null,
    description: data.description ?? null,
    image: data.image ?? null,
    sortOrder: data.sortOrder ?? 0,
    isActive: data.isActive !== undefined ? data.isActive : true,
    createdAt: data.createdAt ?? now,
    updatedAt: now
  };
}

/**
 * Преобразует название категории в slug
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}