const { pool } = require("../models/db");

const addProduct = (req, res) => {
  const { title, price, category,image } = req.body;
  const values = [title, price, category,image];
  const query = `INSERT INTO products (title, price,category,image) VALUES ($1,$2,$3,$4) RETURNING *`;

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

const getAllProducts = (req, res) => {
  const query = `SELECT * FROM products;`;

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
module.exports = { addProduct, getAllProducts, UpdateProduct, deleteProduct };
