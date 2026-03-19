const path = require("path");
const { readJSON } = require("../utils/fileManager");

const PRODUCTS_PATH = path.join(__dirname, "..", "data", "products.json");

async function getAll(filters) {
  let products = await readJSON(PRODUCTS_PATH);

  if (filters.search) {
    const s = filters.search.toLowerCase();
    products = products.filter(
      p =>
        p.title.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
    );
  }

  if (filters.category) {
    products = products.filter(p => p.category === filters.category);
  }

  if (filters.available) {
    const isAvailable = filters.available === "true";
    products = products.filter(p => p.available === isAvailable);
  }

  if (filters.sort === "price_asc") {
    products.sort((a, b) => a.price - b.price);
  }

  if (filters.sort === "price_desc") {
    products.sort((a, b) => b.price - a.price);
  }

  return products;
}

async function getById(id) {
  const products = await readJSON(PRODUCTS_PATH);
  return products.find(p => p.id === id);
}

module.exports = {
  getAll,
  getById
};
