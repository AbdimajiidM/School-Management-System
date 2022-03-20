const catchAsync = require("./../utils/catchAsync");
const Invoice = require("../models/invoiceModel");
const createInvoiceFn = require("./functions/createInvoceFn");
const appError = require("../utils/appError");

exports.getAllInvoices = catchAsync(async (req, res, next) => {
  const invoices = await Invoice.find().populate("transactions");
  res.status(200).json({
    message: "Sucess",
    count: invoices.length,
    data: {
        invoices,
    },
  });
});

exports.getInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id);
  res.status(200).json({
    message: "Sucess",
    data: {
        invoice
    },
  });
});

exports.createInvoice = catchAsync(async (req, res, next) => {
  const transactions = req.body.transactions;
  const payer = req.body.payer;
  const message = await createInvoiceFn(transactions,payer);
  res.status(201).json({
    status: "Success",
    data: {
        message,
    },
  });
});

