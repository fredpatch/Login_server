// IMPORT THE REQUIRED MODULES
const express = require("express");
const dbOperations = express.Router();
const con = require("../config/db");

/* SETTING THE ROUTES */

/* GET DATA FROM OBJECTIF TABLE */
dbOperations.get("/objectifs", (req, res) => {
  const sql = "SELECT * FROM objectifs";
  con.query(sql, function (error, rows, fields) {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(`Database operation : ${sql}`);
      res.json(rows);
    }
  });
});

/* GET DATA FROM SYNTHESE_PRODUCTION TABLE */
dbOperations.get("/synthese-prod", function (req, res) {
  const sql = "SELECT * FROM synthese_production";
  con.query(sql, function (error, rows, fields) {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(`Database operation : ${sql}`);
      res.json(rows);
    }
  });
});

/* GET DATA FROM SYNTHESE_ENCOUR TABLE */
dbOperations.get("/synthese-encour", function (req, res) {
  const sql = "SELECT * FROM synthese_encour";
  con.query(sql, function (error, rows, fields) {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(`Database operation : ${sql}`);
      res.json(rows);
    }
  });
});

/* GET DATA FROM SYNTHESE_IMPAYE TABLE */
dbOperations.get("/synthese-impaye", function (req, res) {
  const sql = "SELECT * FROM synthese_impaye";
  con.query(sql, function (error, rows, fields) {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(`Database operation : ${sql}`);
      res.json(rows);
    }
  });
});

/* GET DATA FROM SYNTHESE_ENCOUR_RECOUVREMENT TABLE */
dbOperations.get("/synthese-encours-recouvrement", function (req, res) {
  const sql = "SELECT * FROM synthese_encours_recouvrement";
  con.query(sql, function (error, rows, fields) {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(`Database operation : ${sql}`);
      res.json(rows);
    }
  });
});

module.exports = dbOperations;
