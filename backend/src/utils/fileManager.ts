import fs from 'fs/promises';
import path from 'path';

/**
 * Читает JSON файл
 */
export async function readJSON<T>(filePath: string): Promise<T[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

/**
 * Записывает данные в JSON файл
 */
export async function writeJSON<T>(filePath: string, data: T[]): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Находит один элемент по предикату
 */
export async function findOne<T>(
  filePath: string,
  predicate: (item: T) => boolean
): Promise<T | null> {
  const data = await readJSON<T>(filePath);
  return data.find(predicate) ?? null;
}

/**
 * Находит все элементы по предикату
 */
export async function findAll<T>(
  filePath: string,
  predicate: (item: T) => boolean
): Promise<T[]> {
  const data = await readJSON<T>(filePath);
  return data.filter(predicate);
}

/**
 * Вставляет новый элемент
 */
export async function insert<T>(filePath: string, item: T): Promise<T> {
  const data = await readJSON<T>(filePath);
  data.push(item);
  await writeJSON(filePath, data);
  return item;
}

/**
 * Обновляет элемент по предикату
 */
export async function update<T>(
  filePath: string,
  predicate: (item: T) => boolean,
  updates: Partial<T>
): Promise<T | null> {
  const data = await readJSON<T>(filePath);
  const index = data.findIndex(predicate);
  
  if (index === -1) {
    return null;
  }
  
  data[index] = { ...data[index], ...updates } as T;
  await writeJSON(filePath, data);
  return data[index];
}

/**
 * Удаляет элемент по предикату
 */
export async function remove<T>(
  filePath: string,
  predicate: (item: T) => boolean
): Promise<boolean> {
  const data = await readJSON<T>(filePath);
  const initialLength = data.length;
  const filtered = data.filter(item => !predicate(item));
  
  if (filtered.length === initialLength) {
    return false;
  }
  
  await writeJSON(filePath, filtered);
  return true;
}