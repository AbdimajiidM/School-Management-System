const express = require('express');
const voucherController = require('./../controllers/voucherController');

const router = express.Router();


router
  .route('/')
  .get(voucherController.getAllVouchers)
  .post(voucherController.createVoucher);

// router
//   .route('/:id')
//   .get(stageController.getStage)
//   .patch(stageController.updateStage)
//   .delete(stageController.deleteStage);



module.exports = router;
