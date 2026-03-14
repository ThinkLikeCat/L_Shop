const express = require("express");
const router = express.Router();
const controller = require("../controllers/products.controller");

router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);

module.exports = router;
