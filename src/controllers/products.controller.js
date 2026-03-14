const productService = require("../services/products.service");

async function getProducts(req, res) {
  const { search, category, available, sort } = req.query;

  const products = await productService.getAll({
    search,
    category,
    available,
    sort
  });

  res.json(products);
}

async function getProductById(req, res) {
  const { id } = req.params;
  const product = await productService.getById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
}

module.exports = {
  getProducts,
  getProductById
};
