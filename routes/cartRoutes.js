const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");
router.get("/", controller.getCart);
router.post("/", controller.addItem);
router.put("/:productId", controller.updateItem);
router.delete("/:productId", controller.deleteItem);
module.exports = router;