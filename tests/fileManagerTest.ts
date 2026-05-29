import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { readJSON, writeJSON, insert, findOne, findAll, update, remove } from '../backend/src/utils/fileManager';

describe('FileManager', () => {
  let tmpDir: string;
  let filePath: string;

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'l_shop_test_'));
    filePath = path.join(tmpDir, 'data.json');
  });

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  test('readJSON returns [] when file does not exist', async () => {
    const data = await readJSON<{ id: string }>(filePath);
    expect(data).toEqual([]);
  });

  test('writeJSON and readJSON work together', async () => {
    const sample = [{ id: '1' }, { id: '2' }];
    await writeJSON(filePath, sample);
    const data = await readJSON<{ id: string }>(filePath);
    expect(data).toEqual(sample);
  });

  test('insert adds a new item', async () => {
    const item = { id: 'abc' };
    const inserted = await insert(filePath, item);
    expect(inserted).toEqual(item);
    const stored = await readJSON<{ id: string }>(filePath);
    expect(stored).toEqual([item]);
  });

  test('findOne returns the first matching element', async () => {
    await writeJSON(filePath, [{ id: '1' }, { id: '2' }]);
    const found = await findOne<{ id: string }>(filePath, (item) => item.id === '2');
    expect(found).toEqual({ id: '2' });
  });

  test('findAll returns all items matching predicate', async () => {
    await writeJSON(filePath, [{ id: '1' }, { id: '2' }, { id: '1' }]);
    const found = await findAll<{ id: string }>(filePath, (item) => item.id === '1');
    expect(found).toEqual([{ id: '1' }, { id: '1' }]);
  });

  test('update modifies the matching item', async () => {
    await writeJSON(filePath, [{ id: '1', name: 'old' }]);
    const updated = await update<{ id: string; name: string }>(filePath, (item) => item.id === '1', { name: 'new' });
    expect(updated).toEqual({ id: '1', name: 'new' });
    const stored = await readJSON<{ id: string; name: string }>(filePath);
    expect(stored).toEqual([{ id: '1', name: 'new' }]);
  });

  test('update returns null when nothing is matched', async () => {
    await writeJSON(filePath, [{ id: '1' }]);
    const updated = await update<{ id: string }>(filePath, (item) => item.id === '2', { id: '2' });
    expect(updated).toBeNull();
  });

  test('remove deletes the matching item', async () => {
    await writeJSON(filePath, [{ id: '1' }, { id: '2' }]);
    const removed = await remove<{ id: string }>(filePath, (item) => item.id === '1');
    expect(removed).toBe(true);
    const stored = await readJSON<{ id: string }>(filePath);
    expect(stored).toEqual([{ id: '2' }]);
  });

  test('remove returns false when no item is deleted', async () => {
    await writeJSON(filePath, [{ id: '1' }]);
    const removed = await remove<{ id: string }>(filePath, (item) => item.id === '2');
    expect(removed).toBe(false);
  });
});
