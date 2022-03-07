const express = require("express");
const teacherController = require("./../controllers/teachController");

const router = express.Router();

router
  .route("/")
  .get(teacherController.getAllTeachers)
  .post(teacherController.createTeacher);

router
  .route("/:id")
  .get(teacherController.getTeacher)
  .post(teacherController.assingTeacherToClasses)
  .patch(teacherController.updateTeacher)
  .delete(teacherController.deleteTeacher);

router.route("/trash/:id").post(teacherController.trashTeacher);
router.route("/:teacherId").post(teacherController.assingTeacherToClasses);
router.route("/removeTeacherFromClasses/:id").post(teacherController.removeTeacherFromClassess);

module.exports = router;
