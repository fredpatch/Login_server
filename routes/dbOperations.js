// IMPORT THE REQUIRED MODULES AND ROUTE DEFINITIONS
const dbOperations = require("express").Router();

// import controllers
const {
  objectif,
  prodMtn,
  prodNbr,
  prodMoy,
  synthRecouvNbr,
  synthRecouvMtn,
  synthMoyNbr,
  synthMoyMtn,
  synthFinNbr,
  synthFinMtn,
  synthImp,
  synthMtn,
} = require("../controllers/db");

/* SETTING THE ROUTES */

/* GET DATA FROM OBJECTIF TABLE */
dbOperations.get("/objectifs", objectif);

/* GET DATA FROM SYNTHESE_PRODUCTION TABLE */
dbOperations.get("/synthese-prod-mtn", prodMtn);
dbOperations.get("/synthese-prod-nbr", prodNbr);
dbOperations.get("/synthese-prod-moy", prodMoy);

/* ECART DATA PROD */
// dbOperations.get("/synthese-prod-ecart-mtn", prodEcartMtn);
// dbOperations.get("/synthese-prod-ecart-nbr", prodEcartNbr);

/* GET DATA FROM SYNTHESE_ENCOUR */
dbOperations.get("/synthese-moyen-nombre", synthMoyNbr);
dbOperations.get("/synthese-moyen-montant", synthMoyMtn);
dbOperations.get("/synthese-fin-nombre", synthFinNbr);
dbOperations.get("/synthese-fin-montant", synthFinMtn);

/* ECART DATA ENCOURS */
// dbOperations.get("/synthese-encours-ecart-mtn", prodEcartMtn);
// dbOperations.get("/synthese-encours-ecart-nbr", prodEcartNbr);

/* GET DATA FROM SYNTHESE_IMPAYE */
dbOperations.get("/synthese-impaye/:cd_famille", synthImp);
// dbOperations.get("/synthese-impaye-montant/:cd_famille", synthMtn);

/* GET DATA FROM SYNTHESE_RECOUVREMENT 'RETARD'*/
// dbOperations.get("/synthese-recouvrement-nombre", synthRecouvNbr);
// dbOperations.get("/synthese-recouvrement-montant", synthRecouvMtn);

module.exports = dbOperations;
