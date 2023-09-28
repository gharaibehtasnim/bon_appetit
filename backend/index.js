const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
require("./models/db");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => res.send("Hello World!"));

// const addTable = () => {
//   pool
//     .query(
//       `CREATE TABLE users (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL UNIQUE,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP DEFAULT NOW(),
//         is_deleted SMALLINT DEFAULT 0
//     );

//     CREATE TABLE products (
//         id SERIAL PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         category VARCHAR(255),
//         price INT,
//         img VARCHAR(255),
//         created_at TIMESTAMP DEFAULT NOW(),
//         is_deleted SMALLINT DEFAULT 0
//     );`
//     )
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// addTable()
app.listen(port, () => console.log(`App listening on port ${port}!`));
