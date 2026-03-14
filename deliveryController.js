const service = require("../services/deliveryService");
async function getOrders(req, res) {
  try {
    const orders = await service.getUserOrders();
    res.json({ success: true, orders });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
}
async function getOrder(req, res) {
  try {
    const order = await service.getOrderById(req.params.id);
    res.json({ success: true, order });
  } catch (e) {
    res.status(404).json({ success: false, message: e.message });
  }
}
async function create(req, res) {
  try {
    const order = await service.createOrder(req.body);
    res.status(201).json({ success: true, message: "Заказ успешно оформлен", order });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
}
async function cancel(req, res) {
  try {
    const order = await service.cancelOrder(req.params.id);
    res.json({ success: true, message: "Заказ отменен", order });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
}
module.exports = { getOrders, getOrder, create, cancel };