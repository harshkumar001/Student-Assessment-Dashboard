const assessmentModel = require("../models/assessmentModel");
const userModel = require("../models/userModel");

const assessmentController = async (req, res) => {
  try {
    console.log("before in creating assessment");
    const newAssessment = await assessmentModel({
      ...req.body,
      createdBy: req.body.userId,
    });
    console.log("after in creating assessment");
    await newAssessment.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    if (!adminUser) {
      // Handle the case where adminUser is not found
      return res.status(404).json({
        success: false,
        error: "Admin user not found.",
      });
    }
    const notification1 = adminUser.notification || [];
    notification1.push({
      type: "new-assessment",
      message: `${newAssessment.title} has been added`,
      data: {
        teacherId: newAssessment._id,
        title: newAssessment.title,
        onClickPath: "/admin/assessments",
      },
    });
    const studentUser = await userModel.findOne({ isStudent: true });
    if (!studentUser) {
      // Handle the case where studentUser is not found
      return res.status(404).json({
        success: false,
        error: "Student user not found.",
      });
    }
    const notification2 = studentUser.notification || [];
    notification2.push({
      type: "new-assessment",
      message: `${newAssessment.title} has been added`,
      data: {
        teacherId: newAssessment._id,
        title: newAssessment.title,
        onClickPath: "/student/assessments",
      },
    });

    await userModel.findByIdAndUpdate(adminUser._id, { notification1 });
    await userModel.findByIdAndUpdate(studentUser._id, { notification2 });
    res.status(201).send({
      success: true,
      message: "New Assessment has been added Successfully",
    });
  } catch (error) {
    console.log(error);
    console.log(1);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Creating Assessment",
    });
    console.log(2);
  }
};

module.exports = { assessmentController };
