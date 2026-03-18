const cartService = require("../services/cartService");
async function getCart(req, res) {
  try {
    const cart = await cartService.getUserCart();
    res.json({ success: true, cart });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
}
async function addItem(req, res) {
  try {
    const { productId, count } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: "productId required" });
    }
    const cart = await cartService.addToCart(productId, count ?? 1);
    res.status(201).json({
      success: true,
      message: "Товар добавлен",
      cart
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
}
async function updateItem(req, res) {
  try {
    const { productId } = req.params;
    const { count } = req.body;
    const cart = await cartService.updateCount(productId, count);
    res.json({ success: true, message: "Количество обновлено", cart });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
}
async function deleteItem(req, res) {
  try {
    const { productId } = req.params;
    const cart = await cartService.removeFromCart(productId);
    res.json({ success: true, message: "Удалено", cart });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
}
module.exports = {
  getCart,
  addItem,
  updateItem,
  deleteItem
};