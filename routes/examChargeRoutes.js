const express = require('express');
const examChargeController = require('../controllers/examChargeController');

const router = express.Router();


router
    .route('/')
    .get(examChargeController.getAllExamCharges)
    .post(examChargeController.createExamCharge)

router
    .route('/:id')
    .patch(examChargeController.updateExamCharge)
    .delete(examChargeController.deleteExamCharge)
module.exports = router;
