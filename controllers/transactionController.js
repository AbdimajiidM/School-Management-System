const catchAsync = require("../utils/catchAsync");
const Transaction = require("../models/transactionModel");
const createTransactionFn = require("./functions/createTransactionFn")
const appError = require("../utils/appError");

exports.getAllTransaction = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find();
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
  const transaction = await Transaction.findOne({transactionNumber});
  res.json({
    status: "success",
    transaction
  })
})

exports.createTransaction = catchAsync(async (req, res, next) => {
  const createdTransaction = await createTransactionFn(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      createdTransaction,
    },
  });
});

exports.updateTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      // runValidators: true,
    }
  );

  if (!transaction) {
    return next(new appError("no transaction found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      transaction,
    },
  });
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id);

  if (!transaction) {
    return next(new appError("no transaction found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
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
})

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

