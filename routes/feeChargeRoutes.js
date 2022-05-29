const express = require('express');
const feeChargeController = require('../controllers/feeChargeController');

const router = express.Router();


router
  .route('/')
  .get(feeChargeController.getAllFeeCharges)
  .post(feeChargeController.createFeeCharge)

router
  .route('/:id')
  .patch(feeChargeController.updateFeeCharge)
  .delete(feeChargeController.deleteFeeCharge)
module.exports = router;
