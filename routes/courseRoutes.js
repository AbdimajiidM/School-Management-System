const express = require('express');
const courseController = require('./../controllers/courseController');

const router = express.Router();


router
  .route('/')
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);

router
  .route('/:id')
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCours);

  router.route("/:courseId/:stageId").post(courseController.assignCourseToStage);

module.exports = router;
