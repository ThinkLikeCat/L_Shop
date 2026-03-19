const fs = require('fs').promises;
const path = require('path');

/**
 * Класс для работы с JSON файлами
 */
class FileManager {
  /**
   * Чтение данных из JSON файла
   * @param {string} filePath - Путь к файлу
   * @returns {Promise<any>} - Данные из файла
   */
  static async read(filePath) {
    try {
      const absolutePath = path.resolve(filePath);
      const data = await fs.readFile(absolutePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Файл не существует, возвращаем пустой массив
        return [];
      }
      throw error;
    }
  }

  /**
   * Запись данных в JSON файл
   * @param {string} filePath - Путь к файлу
   * @param {any} data - Данные для записи
   * @returns {Promise<void>}
   */
  static async write(filePath, data) {
    const absolutePath = path.resolve(filePath);
    await fs.writeFile(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  /**
   * Поиск элемента по условию
   * @param {string} filePath - Путь к файлу
   * @param {Function} predicate - Функция условия
   * @returns {Promise<any|null>} - Найденный элемент или null
   */
  static async findOne(filePath, predicate) {
    const data = await this.read(filePath);
    return data.find(predicate) || null;
  }

  /**
   * Поиск всех элементов по условию
   * @param {string} filePath - Путь к файлу
   * @param {Function} predicate - Функция условия
   * @returns {Promise<any[]>} - Массив найденных элементов
   */
  static async findMany(filePath, predicate) {
    const data = await this.read(filePath);
    return data.filter(predicate);
  }

  /**
   * Добавление нового элемента
   * @param {string} filePath - Путь к файлу
   * @param {any} item - Элемент для добавления
   * @returns {Promise<any>} - Добавленный элемент
   */
  static async insert(filePath, item) {
    const data = await this.read(filePath);
    data.push(item);
    await this.write(filePath, data);
    return item;
  }

  /**
   * Обновление элемента по условию
   * @param {string} filePath - Путь к файлу
   * @param {Function} predicate - Функция условия
   * @param {any} updates - Обновления
   * @returns {Promise<any|null>} - Обновленный элемент или null
   */
  static async update(filePath, predicate, updates) {
    const data = await this.read(filePath);
    const index = data.findIndex(predicate);
    
    if (index === -1) {
      return null;
    }
    
    data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
    await this.write(filePath, data);
    return data[index];
  }

  /**
   * Удаление элемента по условию
   * @param {string} filePath - Путь к файлу
   * @param {Function} predicate - Функция условия
   * @returns {Promise<boolean>} - true если удален, false если не найден
   */
  static async delete(filePath, predicate) {
    const data = await this.read(filePath);
    const index = data.findIndex(predicate);
    
    if (index === -1) {
      return false;
    }
    
    data.splice(index, 1);
    await this.write(filePath, data);
    return true;
  }
}

module.exports = FileManager;