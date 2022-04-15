const express = require('express');
const markController = require('./../controllers/markController');

const router = express.Router();


router
  .route('/')
  .get(markController.getAllStudentsMarks)
  .post(markController.createMark);

router
  .route('/:id')
  .get(markController.getStudentMarks)
  .patch(markController.updateMark)
  .delete(markController.deleteMark);

router.route('/classMarks/:classId').get(markController.getStudentsMarksByClass)
router.route('/courseMarks').post(markController.createCourseMarks);
module.exports = router;
