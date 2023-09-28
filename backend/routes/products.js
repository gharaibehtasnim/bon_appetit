const { Router } = require("express");

const productsRouter = Router();
const {
  addProduct,
  getAllProducts,
  UpdateProduct,
  deleteProduct
} = require("../controllers/products");
productsRouter.post("/", addProduct);
productsRouter.get("/", getAllProducts);
productsRouter.put("/:id", UpdateProduct);
productsRouter.delete("/:id", deleteProduct);


module.exports = productsRouter;
