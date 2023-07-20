const userModel = require("../models/userModel");
const assessmentModel = require("../models/assessmentModel");

const getAllTeachers = async (req, res) => {
  try {
    const teacher = await userModel.find({ role: "teacher" });
    res.status(200).send({
      success: true,
      message: "Teachers Data",
      data: teacher,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Teachers Data",
      error,
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await userModel.find({ role: "student" });
    res.status(200).send({
      success: true,
      message: "Students Data",
      data: students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Students Data",
      error,
    });
  }
};

const getAssessmentData = async (req, res) => {
  try {
    const assessment = await assessmentModel.find({});
    res.status(200).send({
      success: true,
      message: "Assessments Data",
      data: assessment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Assessments Data",
      error,
    });
  }
};
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the student data by ID using Mongoose findOne method
    const student = await userModel.findOne({ _id: id });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student data found",
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Assessments Data",
      error,
    });
  }
};

module.exports = {
  getAllStudents,
  getAllTeachers,
  getAssessmentData,
  getStudentById,
};
