const { genrateToken } = require("./config");

const { pool } = require("../models/db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { types } = require("pg");
nodemailer = require("nodemailer");

const register = async (req, res) => {
  const { firstName, lastName, email, password, location } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(password, 7);
    const query = `INSERT INTO users (firstName,lastName,email,role_id,password, location) VALUES ($1,$2,$3, 2,$4,$5) RETURNING *`;
    const data = [
      firstName,
      lastName,
      email.toLowerCase(),
      encryptedPassword,
      location,
    ];
    pool
      .query(query, data)
      .then((result) => {
        const payload = {
          userId: result.rows[0].user_id,
          role: result.rows[0].role_id,
          name: result.rows[0].name,
          lastname: result.rows[0].lastName,
          firstname: result.rows[0].firstName,
        };
        const options = {
          expiresIn: "24h",
        };
        const token = genrateToken(payload, options);
        console.log("ddddd", token);

        res.status(200).json({
          success: true,
          token: token,
          userInfo: result.rows[0],
          userId: result.rows[0].user_id,
          roleId: result.rows[0].role_id,
          message: "Account created successfully",
        });
        //verfiyResjsterByEmail(email,name);
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: "The email already exists",
          err,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const query = `SELECT * FROM users WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].user_id,
              role: result.rows[0].role_id,
              firstname: result.rows[0].firstName,
              lastname: result.rows[0].lastName,
            };

            const options = {
              expiresIn: "24h",
            };
            const token = genrateToken(payload, options);

            if (token) {
              return res.status(200).json({
                success: true,
                message: `Valid login credentials`,
                token,
                userId: result.rows[0].user_id,
                userInfo: result.rows[0],
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err,
      });
    });
};

module.exports = {
  register,
  login,
};
