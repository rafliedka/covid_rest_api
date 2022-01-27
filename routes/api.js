//import express
const express = require("express");
//import PatientController
const PatientController = require("../controllers/PatientController.js")

//create express object as router
const router = express.Router();

//Routing endpoint patient
router.get("/patients", PatientController.index);
router.get("/patients/:id", PatientController.show);
router.post("/patients", PatientController.store);
router.put("/patients/:id", PatientController.update);
router.delete("/patients/:id", PatientController.destroy);
router.get("/patients/search/:name", PatientController.search);
router.get("/patients/status/positive", PatientController.positive);
router.get("/patients/status/recovered", PatientController.recovered);
router.get("/patients/status/dead", PatientController.dead);

//export router as module
module.exports = router;