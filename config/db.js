require("dotenv").config();

/* MONGODB CONNECTION FOR USER SIGNIN AND SIGNUP OPERATIONS */
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.log(err);
  });

/* MYSQL CONNECTION FOR KPIS INFORMATION RETRIEVING */
const mysql = require("mysql2/promise");

const con = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_USER_PASS,
  database: process.env.DB_EPDB,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});

module.exports = con;
