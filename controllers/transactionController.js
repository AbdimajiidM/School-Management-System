const catchAsync = require("../utils/catchAsync");
const Transaction = require("../models/transactionModel");
const createTransactionFn = require("./functions/createTransactionFn")
const cancelTransactionFn = require("./functions/cancelTransactinFn")
const appError = require("../utils/appError");

exports.getAllTransaction = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find().populate('refrenceId');
  res.status(200).json({
    message: "Sucess",
    count: transactions.length,
    data: {
      transactions,
    },
  });
});

exports.getTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  res.status(200).json({
    message: "Sucess",
    data: {
      transaction,
    },
  });
});

exports.getAllTransactionByTransactionNumber = catchAsync(async (req, res, next) => {
  const transactionNumber = req.params.transactionNumber;
  const transaction = await Transaction.findOne({ transactionNumber });
  res.json({
    status: "success",
    transaction
  })
});

exports.createTransaction = catchAsync(async (req, res, next) => {
  const response = await createTransactionFn(req.body, req, res, next);

  res.status(response.statusCode).json({
    response,
  });
});

exports.cancelTransaction = catchAsync(async (req, res, next) => {
  const transactionId = req.params.id;
  const response = await cancelTransactionFn(transactionId, req, res, next);

  res.status(response.statusCode).json({
    status: "success",
    response,
  });
});

exports.getStudentTransactions = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;
  const studentTransactions = await Transaction.find({ refrenceId: studentId });
  res.json({
    status: "success",
    studentTransactions,
  });
});

exports.getStudentReceiptTransactions = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;
  const transactions = await Transaction.find({ refrenceId: studentId, charge: null });
  res.json({
    status: "success",
    message: {
      transactions
    }
  })
});

exports.getStudentChargeTransactions = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;
  const transactions = await Transaction.find({ refrenceId: studentId, receipt: null });
  res.json({
    status: "success",
    message: {
      transactions
    }
  })
});

exports.getStudentTransactionsByDate = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;

  const studentTransactions = await Transaction.find({
    refrenceId: studentId,
    date: {
      $gt: startDate,
      $lt: endDate,
    },
  });

  res.json({
    status: "success",
    studentTransactions,
  });
});

