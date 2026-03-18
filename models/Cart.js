/**
 * @typedef {Object} BasketProduct
 * @property {number} count
 * @property {import("./Product").Product} product
 */
/**
 * @typedef {Object} Basket
 * @property {string} id
 * @property {string} userId
 * @property {BasketProduct[]} basket
 */