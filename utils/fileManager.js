const fs = require('fs').promises;
const path = require('path');

class FileManager {
  static async read(filePath) {
    try {
      const absolutePath = path.resolve(filePath);
      const data = await fs.readFile(absolutePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT')
        return [];
      throw error;
    }
  }

  static async write(filePath, data) {
    const absolutePath = path.resolve(filePath);
    await fs.writeFile(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  static async findOne(filePath, predicate) {
    const data = await this.read(filePath);
    return data.find(predicate) || null;
  }

  static async findMany(filePath, predicate) {
    const data = await this.read(filePath);
    return data.filter(predicate);
  }

  static async insert(filePath, item) {
    const data = await this.read(filePath);
    data.push(item);
    await this.write(filePath, data);
    return item;
  }

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