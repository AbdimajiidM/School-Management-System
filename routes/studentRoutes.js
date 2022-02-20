const express = require("express");
const studentController = require("./../controllers/studentController");

const router = express.Router();

router
  .route("/")
  .get(studentController.getAllAStudents)
  .post(studentController.createdStudent);

router
  .route("/:id")
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);

router.route("/trash/:id").post(studentController.trashStudent);
router.route("/:studentId/:classId").post(studentController.assignStudentToClass);





module.exports = router;
