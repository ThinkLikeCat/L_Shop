const path = require("path");
const { readJSON, writeJSON } = require("../utils/file");
const PRODUCTS_PATH = path.join(__dirname, "..", "data", "products.json");
const CARTS_PATH = path.join(__dirname, "..", "data", "carts.json");
const TEMP_USER_ID = "test-user";
/**
 * @returns {Promise<import("../models/Cart").Basket[]>}
 */
async function getAllCarts() {
  return readJSON(CARTS_PATH);
}
/**
 * @param {import("../models/Cart").Basket[]} carts
 */
async function saveCarts(carts) {
  await writeJSON(CARTS_PATH, carts);
}
async function getProducts() {
  return readJSON(PRODUCTS_PATH);
}
/**
 * @param {string} userId
 * @returns {Promise<import("../models/Cart").Basket>}
 */
async function getUserCart(userId = TEMP_USER_ID) {
  const carts = await getAllCarts();
  let cart = carts.find(c => c.userId === userId);
  if (!cart) {
    cart = {
      id: Date.now().toString(),
      userId,
      basket: []
    };
    carts.push(cart);
    await saveCarts(carts);
  }
  return cart;
}
/**
 * @param {string} productId
 * @param {number} count
 * @param {string} userId
 */
async function addToCart(productId, count = 1, userId = TEMP_USER_ID) {
  const carts = await getAllCarts();
  let cart = carts.find(c => c.userId === userId);
  if (!cart) {
    cart = {
      id: Date.now().toString(),
      userId,
      basket: []
    };
    carts.push(cart);
  }
  const products = await getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) throw new Error("Product not found");
  const existing = cart.basket.find(i => i.product.id === productId);
  if (existing) {
    existing.count += count;
  } else {
    cart.basket.push({
      count,
      product
    });
  }
  await saveCarts(carts);
  return cart;
}
/**
 * @param {string} productId
 * @param {number} count
 * @param {string} userId
 */
async function updateCount(productId, count, userId = TEMP_USER_ID) {
  const carts = await getAllCarts();
  const cart = carts.find(c => c.userId === userId);
  if (!cart) throw new Error("Cart not found");
  const item = cart.basket.find(i => i.product.id === productId);
  if (!item) throw new Error("Item not found");
  if (count <= 0) {
    cart.basket = cart.basket.filter(i => i.product.id !== productId);
  } else {
    item.count = count;
  }
  await saveCarts(carts);
  return cart;
}
/**
 * @param {string} productId
 * @param {string} userId
 */
async function removeFromCart(productId, userId = TEMP_USER_ID) {
  const carts = await getAllCarts();
  const cart = carts.find(c => c.userId === userId);
  if (!cart) throw new Error("Cart not found");
  cart.basket = cart.basket.filter(i => i.product.id !== productId);
  await saveCarts(carts);
  return cart;
}
module.exports = {
  getUserCart,
  addToCart,
  updateCount,
  removeFromCart
};