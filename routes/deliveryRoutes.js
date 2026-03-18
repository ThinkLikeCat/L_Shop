const express = require("express");
const router = express.Router();
const controller = require("../controllers/deliveryController");
router.get("/", controller.getOrders);
router.get("/:id", controller.getOrder);
router.post("/", controller.create);
router.put("/:id/cancel", controller.cancel);
module.exports = router;