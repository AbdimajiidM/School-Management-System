const catchAsync = require("./../utils/catchAsync");
const StudentCharge = require("../models/studentChargeModel");
const appError = require("../utils/appError");

exports.getStudentChareges = catchAsync(async (req, res, next) => {
    const studentCharges = await StudentCharge.find();
    console.log(studentCharges);

    res.json({
        studentCharges
    })
});
exports.createStudentCharge = catchAsync(async (req, res, next) => {
    const createdStudentCharge = await StudentCharge.create(req.body);
    res.status(201).json({
        status: "Success",
        data: {
            createdStudentCharge,
        },
    });
});

exports.updateStage = catchAsync(async (req, res, next) => {

    const studentCharge = await StudentCharge.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // runValidators: true,
    });

    if (!StudentCharge) {
        return next(new appError("no studentCharge found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            studentCharge,
        },
    });
});

exports.deleteStage = catchAsync(async (req, res, next) => {
    const studentCharge = await StudentCharge.findByIdAndDelete(req.params.id);

    if (!studentCharge) {
        return next(new appError("no studentCharge found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});

