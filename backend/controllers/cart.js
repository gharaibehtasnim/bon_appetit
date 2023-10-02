const { pool } = require("../models/db");

const addToCart = (req, res) => {

  const user=req.token.userId;
  const product_id=req.params.product_id;
  const values = [user,product_id];

  const query = `INSERT INTO cart(user_id, product_id) VALUES ($1,$2) RETURNING *`;

  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({
        success: true,
        product: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err,
      });
    });
};

const viewCart = (req, res) => {
  const user=req.token.userId;
    console.log(user)
const query = `SELECT products.*,user_id FROM cart 
INNER JOIN products ON products.product_id= cart.product_id
WHERE user_id=$1
`;
  pool
    .query(query, [user])
    .then((result) => {
      res.status(201).json({
        success: true,
        product: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err,
      });
    });
};



const deleteProductInCart = (req, res) => {
  const id = req.params.id;

  const query = `Delete from cart where product_id=$1 RETURNING *`;

  pool
    .query(query, [id])
    .then((result) => {
      res.status(201).json({
        success: true,
        product: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err,
      });
    });
};
module.exports = { addToCart, viewCart,deleteProductInCart
    
};
