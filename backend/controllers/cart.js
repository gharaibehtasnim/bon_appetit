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

const getAllProductsInCart = (req, res) => {
    const user=req.token.userId;
const query = `SELECT *
FROM products 
INNER JOIN users ON nestedcomments.user_id = users.user_id
WHERE nestedcomments.is_deleted=0 AND nestedcomments.post_id =$1
AND nestedcomments.comment_id=$2
ORDER BY nestedcomments.created_at DESC
`;
  pool
    .query(query, [])
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

const UpdateProduct = (req, res) => {
  const id = req.params.id;
  const { title, price, category } = req.body;
  const values = [title, price, category, id];
  const query = `UPDATE products SET title=$1, price=$2,category=$3 WHERE id=$4 RETURNING *`;
  // COALESCE(null,null,null,null,"title",null,,,,)
  // IIF(conditionm,yes,no,)
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

const deleteProduct = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE products SET is_deleted=1 WHERE id = $1 RETURNING *`;

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
module.exports = { addToCart, 
    //getAllProducts, UpdateProduct, deleteProduct 
};
