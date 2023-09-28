// import connection module
const con = require("../config/db");

// db objectifs
exports.objectif = async (req, res) => {
  const sql = "SELECT * FROM objectifs";
  try {
    const [rows, fields] = await con.execute(sql);
    console.log(`Database operation : ${sql}`);
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Production
exports.prodMtn = async (req, res) => {
  const sql = "SELECT cd_famille, mois, mt_prod FROM synthese_production";
  try {
    const [rows, fields] = await con.execute(sql);
    console.log(`Database operation : ${sql}`);
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.prodNbr = async (req, res) => {
  const sql = "SELECT cd_famille, mois, nbr_prod FROM synthese_production";
  try {
    const [rows, fields] = await con.execute(sql);
    console.log(`Database operation : ${sql}`);
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.prodMoy = async (req, res) => {
  const sql = "SELECT cd_famille, mois, moy_duree FROM synthese_production";
  try {
    const [rows, fields] = await con.execute(sql);
    console.log(`Database operation : ${sql}`);
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Synthese
exports.synthMoyMtn = async (req, res) => {
  const sql = "SELECT cd_famille, mois , encours_mt_moy FROM synthese_encour";
  try {
    const [rows, fields] = await con.execute(sql);
    console.log(`Database operation : ${sql}`);
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.synthMoyNbr = async (req, res) => {
  const sql = "SELECT cd_famille, mois,encours_nbr_moy FROM synthese_encour";
  try {
    const [rows, fields] = await con.execute(sql);
    console.log(`Database operation : ${sql}`);
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.synthFinNbr = async (req, res) => {
  const sql = "SELECT cd_famille, mois,nb_encours FROM synthese_encour";
  try {
    const [rows, fields] = await con.execute(sql);
    console.log(`Database operation : ${sql}`);
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.synthFinMtn = async (req, res) => {
  const sql = "SELECT  cd_famille, mois,mt_encours FROM synthese_encour";
  try {
    const [rows, fields] = await con.execute(sql);
    console.log(`Database operation : ${sql}`);
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).send("Internal Server Error");
  }
};

// IMPAYE nombre and montant
// exports.synthImp = (req, res) => {
//   const { cd_famille } = req.params; // Extract the cd_famille from the URL parameter
//   const sql = `SELECT cd_famille, mois, nb_1impay, nb_encours_ctx, nb_encours_dt, nb_encours_pre_dt, nb_encours_rcvt, nb_rep, nb_impay FROM synthese_impaye WHERE cd_famille = ${cd_famille}`;
//   con.getConnection((error, con) => {
//     con.query(sql, function (error, rows, fields) {
//       if (error) {
//         console.error("Error executing MySQL query:", error);
//         res.status(500).send("Internal Server Error");
//       } else {
//         console.log(`Database operation : ${sql}`);
//         res.json(rows);
//       }
//     });
//   });
// };

// IMPAYE nombre and montant
exports.synthImp = async (req, res) => {
  const { cd_famille } = req.params; // Extract the cd_famille from the URL parameter
  const sql = `SELECT * FROM synthese_impaye WHERE cd_famille = ${cd_famille}`;

  try {
    const [rows, fields] = await con.execute(sql);

    console.log(`Database operation : ${sql}`);
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.synthMtn = async (req, res) => {
  const { cd_famille } = req.params; // Extract the cd_famille from the URL parameter
  const sql = `SELECT cd_famille , mois, mt_1impay, mt_encours_1impay, mt_encours_ctx, mt_encours_dt, mt_encours_pre_dt, mt_impay_rcvt, mt_encours_rcvt, mt_encours_rep, mt_impay, mt_encours_impay FROM synthese_impaye WHERE cd_famille = ${cd_famille}`;

  try {
    const [rows, fields] = await con.execute(sql);
    console.log(`Database operation : ${sql}`);
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).send("Internal Server Error");
  }
};

// RETARD
exports.synthRecouvNbr = async (req, res) => {
  const sql = "SELECT * FROM synthese_encours_recouvrement";
  try {
    const [rows, fields] = await con.execute(sql);
    console.log(`Database operation : ${sql}`);
    res.json(rows);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).send("Internal Server Error");
  }
};
