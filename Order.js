/**
 * @typedef {Object} Address
 * @property {string} city
 * @property {string} street
 * @property {string} house
 * @property {string} apartment
 * @property {string} postalCode
 */
/**
 * @typedef {Object} OrderItem
 * @property {string} productId
 * @property {string} productName
 * @property {number} quantity
 * @property {number} price
 * @property {string} image
 */
/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {OrderItem[]} items
 * @property {Address} deliveryAddress
 * @property {string} phone
 * @property {string} email
 * @property {string} deliveryDate
 * @property {string} deliveryTime
 * @property {string} comment
 * @property {string} status
 * @property {string} paymentStatus
 * @property {string} paymentMethod
 * @property {number} totalPrice
 * @property {string} trackingNumber
 * @property {string} createdAt
 * @property {string} updatedAt
 */