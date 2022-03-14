const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router
  .route("/")
  .get(transactionController.getAllTransaction)
  .post(transactionController.createTransaction);

router
  .route("/:id")
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

router
  .route("/studentTransactions/:id")
  .get(transactionController.getStudentTransactions);

router
  .route("/studentTransactions/:id/:startDate/:endDate")
  .get(transactionController.getStudentTransactionsByDate);


router
  .route("/studentPaymentTransactions/:id")
  .get(transactionController.getStudentReceiptTransactions);

router
  .route("/studentChargeTransactions/:id")
  .get(transactionController.getStudentChargeTransactions);

router.route("/getTransaction/:transactionNumber").get(transactionController.getAllTransactionByTransactionNumber)
module.exports = router;
