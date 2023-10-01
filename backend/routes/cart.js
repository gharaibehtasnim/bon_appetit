const { Router } = require("express");
const authentication = require("../middlewares/authentication");

 const cartRouter = Router();
 const {
   addToCart,
//   viewCart,
//   deleteProductInCart
 } = require("../controllers/cart");
cartRouter.post("/:product_id",authentication ,addToCart);
// cartRouter.get("/", viewCart);
// cartRouter.delete("/:id", deleteProductInCart);


 module.exports = cartRouter;
