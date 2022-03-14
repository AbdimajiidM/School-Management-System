const express = require('express');
const studentChargeController = require('./../controllers/studentChargeController');

const router = express.Router();


router
  .route('/')
  .get(studentChargeController.getStudentChareges)
  .post(studentChargeController.createStudentCharge)


module.exports = router;
