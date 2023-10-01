const { genrateToken } = require("./config");
const { OAuth2Client } = require("google-auth-library");

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
const checkGoogleUser = (req, res) => {
  const token = req.body.credential;
  const CLIENT_ID = req.body.clientId;
  const client = new OAuth2Client(CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    res.json(payload);
  }
  verify().catch((err) => {
    if (err.keyPattern) {
      res.status(409).json({
        success: false,
        message: `Email is already exist`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err.message,
      });
    }
  });
};
const editUserInfo = (req, res) => {
  const user_id = req.token.userId;

  let { firstName, lastName,location } = req.body;
  const data = [firstName, lastName,location, user_id];
  console.log(data)
  const query = `UPDATE users SET 
  firstName = COALESCE($1,firstName), 
  lastName = COALESCE($2, lastName), 
  location = COALESCE($3, location) 
  WHERE user_id=$4 RETURNING *;`;

  pool
    .query(query, data)
    .then((result) => {
    
      if (result.rows.length === 0) {
        return res.status(200).json({
          success: false,
          message: `no data found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `user's info updated sucessfully `,
          result: result.rows[0],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
const profileInfo = (req, res) => {
  const user_id = req.token.userId;
  const query = "SELECT * FROM users WHERE user_id=$1";
  pool
    .query(query, [user_id])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(200).json({
          success: false,
          message: `The user: ${user_id} has no info`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `All info for the user: ${user_id}`,
          info: result.rows[0],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
module.exports = {
  register,
  login,
  checkGoogleUser,
  profileInfo,
  editUserInfo
};
