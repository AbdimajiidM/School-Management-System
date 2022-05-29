const catchAsync = require("./../utils/catchAsync");
const ExamCharge = require("../models/examChargeModel");
const appError = require("../utils/appError");


exports.getAllExamCharges = catchAsync(async (req, res, next) => {
    const examCharges = await ExamCharge.find();
    res.status(200).json({
        message: "Sucess",
        count: examCharges.length,
        data: {
            examCharges,
        },
    });
});

exports.createExamCharge = catchAsync(async (req, res, next) => {

    const createdExamCharge = await ExamCharge.create(req.body);

    // Send Response
    res.status(201).json({
        status: "Success",
        data: {
            createdExamCharge,
        },
    });
});

exports.updateExamCharge = catchAsync(async (req, res, next) => {

    const examCharge = await ExamCharge.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    // if user does not exist send error
    if (!examCharge) {
        return next(new appError("no Exam Charge found with that ID", 404));
    }

    // Send Response
    res.status(200).json({
        status: "success",
        data: {
            examCharge
        },
    });
});

exports.deleteExamCharge = catchAsync(async (req, res, next) => {
    const examCharge = await ExamCharge.findByIdAndDelete(req.params.id);

    if (!examCharge) {
        return next(new appError("no Fee Charge found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});


