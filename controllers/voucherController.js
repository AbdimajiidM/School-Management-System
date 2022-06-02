const catchAsync = require("./../utils/catchAsync");
const Voucher = require("../models/voucherModel");
const createVoucherFn = require("./functions/createVoucher");
const appError = require("../utils/appError");

exports.getAllVouchers = catchAsync(async (req, res, next) => {
  const vouchers = await Voucher.find().populate("transactions");
  res.status(200).json({
    message: "Sucess",
    count: vouchers.length,
    data: {
      vouchers,
    },
  });
});

exports.getVoucher = catchAsync(async (req, res, next) => {
  const voucher = await Voucher.findById(req.params.id);
  res.status(200).json({
    message: "Sucess",
    data: {
      voucher
    },
  });
});

exports.createVoucher = catchAsync(async (req, res, next) => {
  const transactions = req.body.transactions;
  const payer = req.body.payer;
  const message = await createVoucherFn(transactions, payer);
  res.status(201).json({
    status: "Success",
    data: {
      message,
    },
  });
});

