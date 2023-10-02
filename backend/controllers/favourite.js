const { pool } = require("../models/db");

const addToFav = (req, res) => {
  const user = req.token.userId;
  const product_id = req.params.product_id;
  const values = [user, product_id];

  const query = `INSERT INTO favourite(user_id, product_id) VALUES ($1,$2) RETURNING *`;

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

const viewFav = (req, res) => {
  const user = req.token.userId;
  console.log(user);
  const query = `SELECT products.*,user_id FROM favourite 
INNER JOIN products ON products.product_id= favourite.product_id
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

module.exports = { addToFav, viewFav };
