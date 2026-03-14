const express = require("express");
const app = express();

const productsRouter = require("./src/routes/products.routes");

app.use(express.json());
app.use("/products", productsRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

//для проверки
//http://localhost:3000/products?category=smart
//http://localhost:3000/products?available=true
//http://localhost:3000/products
//http://localhost:3000/products?sort=price_asc
//http://localhost:3000/products/b4d9f1e2-8c3a-4f1d-9e2b-7a1c3f8e5d55
