const express = require("express");
const router = express.Router();
const {
    addSymptom,
    getSymptoms,
    getSymptomsByDate,
    getSymptomsByWeek,
    updateSymptom,
    deleteSymptom,
  } = require("../controller/symptomController");
const verifyJWT = require('../middleware/verifyJWT')


router.post("/", verifyJWT, addSymptom);
router.get("/",verifyJWT, getSymptoms);
router.get("/date/:date",verifyJWT, getSymptomsByDate);
router.get("/week/:week",verifyJWT, getSymptomsByWeek);
router.put("/:id",verifyJWT, updateSymptom);
router.delete("/:id",verifyJWT, deleteSymptom);

module.exports = router;