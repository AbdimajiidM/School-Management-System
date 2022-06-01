const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router.route("/postExamCharges").get(transactionController.postExamCharges);
router.route("/postFeeCharges").get(transactionController.postFeeCharges);

router
  .route("/")
  .get(transactionController.getAllTransaction)
  .post(transactionController.createTransaction);

router
  .route("/:id")
  .get(transactionController.getTransaction)
  .delete(transactionController.cancelTransaction);

router
  .route("/studentTransactions/:id")
  .get(transactionController.getStudentTransactions);

router
  .route("/studentTransactions/:id/:startDate/:endDate")
  .get(transactionController.getStudentTransactionsByDate);


router
  .route("/studentPaymentTransactions/:id")
  .get(transactionController.getStudentPaymentTransactions);

router
  .route("/studentChargeTransactions/:id")
  .get(transactionController.getStudentChargeTransactions);

router.route("/getTransaction/:transactionNumber").get(transactionController.getAllTransactionByTransactionId)

module.exports = router;
