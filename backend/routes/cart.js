const { Router } = require("express");
const authentication = require("../middlewares/authentication");

 const cartRouter = Router();
 const {
   addToCart,
  viewCart,
   deleteProductInCart
 } = require("../controllers/cart");
cartRouter.post("/:product_id",authentication ,addToCart);
cartRouter.get("/", authentication,viewCart);
 cartRouter.delete("/:id", authentication,deleteProductInCart);


 module.exports = cartRouter;
