const catchAsync = require("../utils/catchAsync");
const Transaction = require("../models/transactionModel");
const createTransactionFn = require("./functions/createTransactionFn")
const cancelTransactionFn = require("./functions/cancelTransactinFn");
const ExamCharge = require("../models/examChargeModel");
const FeeCharge = require("../models/feeChargeModel");
const appError = require("../utils/appError");
const Student = require("../models/studentModel");

exports.getAllTransaction = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find().populate('student');
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

exports.getAllTransactionByTransactionId = catchAsync(async (req, res, next) => {
  const transactionId = req.params.transactionId;
  const transaction = await Transaction.findOne({ transactionId });
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
  const studentTransactions = await Transaction.find({ student: studentId });
  res.json({
    status: "success",
    studentTransactions,
  });
});

exports.getStudentPaymentTransactions = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;
  const transactions = await Transaction.find({ student: studentId }).where("credit").ne(null);
  res.json({
    status: "success",
    message: {
      transactions
    }
  })
});

exports.getStudentChargeTransactions = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;
  const transactions = await Transaction.find({ student: studentId }).where("debit").ne(null);
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

exports.postExamCharges = catchAsync(async (req, res, next) => {

  // get the student id and the class needed to assign from params
  const students = req.query.students.split(',');
  const examId = req.query.examId;

  if (!students || !examId) {
    return next(new appError("Exam charge and students are required!"), 400)
  }

  const exam = await ExamCharge.findById(examId);

  if (!exam) {
    return next(new appError("No exam found with that ID"), 400);
  }

  if (!exam.price || !exam.description) {
    return next(new appError("Exam price and description are needed!"), 400);
  }

  // check if the students Ids are all valid, send error if not
  for (let index = 0; index < students.length; index++) {
    const studentId = students[index].trim();
    const student = await Student.findById(studentId);
    if (!student) {
      return next(new appError("Invalid Student ID were found!, please check that the IDs are all valid students id"))
    };
  }

  // create charge transaction with every student
  for (let index = 0; index < students.length; index++) {
    const studentId = students[index].trim();
    const student = await Student.findById(studentId).populate("transactions");
    const transaction = await Transaction.create({
      description: exam.description,
      debit: exam.price,
      student: student._id,
      balance: student.balance + exam.price,
      status: "Posted",
      transactionType: "Charge"
    })

    student.transactions.push(transaction._id);
    student.save();
  }


  res.json({
    status: "sucess",
    message: `${students.length} Student(s) were charged`
  })

});

exports.postFeeCharges = catchAsync(async (req, res, next) => {
  // get the student id and the class needed to assign from params
  const students = req.query.students.split(',');
  const feeChargeId = req.query.feeChargeId;

  if (!students || !feeChargeId) {
    return next(new appError("Fee Charge and students are required!"), 400)
  }

  const feeCharge = await FeeCharge.findById(feeChargeId);

  if (!feeCharge) {
    return next(new appError("No Fee Charge found with that ID"), 400);
  }

  if (!feeCharge.months || !feeCharge.description) {
    return next(new appError(" Charge Month(s) and description are required!"), 400);
  }

  // check if the students Ids are all valid, send error if not
  for (let index = 0; index < students.length; index++) {
    const studentId = students[index].trim();
    const student = await Student.findById(studentId);
    if (!student) {
      return next(new appError("Invalid Student ID were found!, please check that the IDs are all valid students id"))
    };
  }

  // create charge transaction with every student
  for (let index = 0; index < students.length; index++) {
    const studentId = students[index].trim();
    const student = await Student.findById(studentId).populate("transactions").populate("class");
    if (!student.class) {
      continue;
    }

    const discount = student.discount ? student.discount : 0;
    const discountPercentage = discount / 100;
    // price - (price * discountPercentage)
    const price = student.monthlyFee * feeCharge.months.length;
    const fee = price - (price * discountPercentage);
    const discountDescription = discount ? `(${discount}% discount)` : ''
    const description = `${feeCharge.description.trim()} ${discountDescription}`

    const balance = student.balance + fee;

    const transaction = await Transaction.create({
      description,
      debit: fee,
      student: student._id,
      balance,
      status: "Posted",
      transactionType: "Charge"
    })

    student.transactions.push(transaction._id);
    student.save();
  }


  res.json({
    status: "sucess",
    message: `${feeCharge.name} were charge on ${students.length} Student(s)`
  })
})
