const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  getAllTeachers,
  getAllStudents,
  getAssessmentData,
  getStudentById,
} = require("../controllers/getDataController");

const router = express.Router();

//routes

// GET METHOD || TEACHERS
router.get("/getAllTeachers", getAllTeachers);
// GET METHOD || STUDENTS
router.get("/getAllStudents", getAllStudents);
// GET METHOD || Assessment Data
router.get("/getAssessmentData", getAssessmentData);
// GET METHOD || Student Data
router.get("/getStudentById", getStudentById);

module.exports = router;
