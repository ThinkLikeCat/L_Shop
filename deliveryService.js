const path = require("path");
const { readJSON, writeJSON } = require("../utils/fileManager");
const ORDERS_PATH = path.join(__dirname, "..", "data", "orders.json");
const TEMP_USER_ID = "test-user";
async function getAll() {
  return readJSON(ORDERS_PATH);
}
async function saveAll(orders) {
  await writeJSON(ORDERS_PATH, orders);
}
async function getUserOrders(userId = TEMP_USER_ID) {
  const orders = await getAll();
  return orders.filter(o => o.userId === userId);
}
async function getOrderById(id) {
  const orders = await getAll();
  return orders.find(o => o.id === id);
}
async function createOrder(data, userId = TEMP_USER_ID) {
  const orders = await getAll();
  const newOrder = {
    id: Date.now().toString(),
    userId,
    items: data.items ?? [],
    deliveryAddress: data.address,
    phone: data.phone,
    email: data.email,
    deliveryDate: data.deliveryDate,
    deliveryTime: data.deliveryTime,
    comment: data.comment ?? "",
    paymentMethod: data.paymentMethod,
    status: "pending",
    paymentStatus: "pending",
    totalPrice: data.totalPrice ?? 0,
    trackingNumber: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  orders.push(newOrder);
  await saveAll(orders);
  return newOrder;
}
async function cancelOrder(id) {
  const orders = await getAll();
  const order = orders.find(o => o.id === id);
  if (!order) throw new Error("Order not found");
  order.status = "cancelled";
  order.updatedAt = new Date().toISOString();
  await saveAll(orders);
  return order;
}
module.exports = {
  getUserOrders,
  getOrderById,
  createOrder,
  cancelOrder
};