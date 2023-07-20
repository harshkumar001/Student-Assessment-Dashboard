const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { assessmentController } = require("../controllers/assessmentController");
const {
  getAllTeachers,
  getAllStudents,
  getAssessmentData,
} = require("../controllers/getDataController");

const router = express.Router();

//routes

// Assessment Form || POST
router.post("/createAssessment", assessmentController);

module.exports = router;
