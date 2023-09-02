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
const mysql = require("mysql2");
const cors = require("cors");
const express = require("express")();
express.use(cors());

var body_Parser = require("body-parser");

express.use(body_Parser.json({ type: "application/json" })); // for parsing application/json
express.use(body_Parser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const con = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_USER_PASS || "root",
  database: process.env.DB_EPDB || "epdb",
});

con.connect(function (error) {
  if (error) {
    console.error("Error connecting to MySQL:", error);
  } else {
    console.log(`Connected to MySQL database `);
  }
});

module.exports = con;
