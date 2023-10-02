const { Router } = require("express");
const authentication = require("../middlewares/authentication");

 const favouriteRouter = Router();
 const {
    addToFav,
  viewFav,
   
 } = require("../controllers/favourite");
 favouriteRouter.post("/:product_id",authentication ,addToFav);
 favouriteRouter.get("/", authentication,viewFav);


 module.exports = favouriteRouter;
