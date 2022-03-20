const express = require('express');
const invoiceController = require('./../controllers/invoiceController');

const router = express.Router();


router
  .route('/')
  .get(invoiceController.getAllInvoices)
  .post(invoiceController.createInvoice);

// router
//   .route('/:id')
//   .get(stageController.getStage)
//   .patch(stageController.updateStage)
//   .delete(stageController.deleteStage);



module.exports = router;
