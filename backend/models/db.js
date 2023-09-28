const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

pool.connect((err, pool) => {
  if (err) {
    console.log("ERROR", err.message);
    return;
  }
  console.log("connected to", pool.user);
});

module.exports = {pool}