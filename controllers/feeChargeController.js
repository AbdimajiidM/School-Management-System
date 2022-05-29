const catchAsync = require("./../utils/catchAsync");
const FeeCharge = require("../models/feeChargeModel");
const appError = require("../utils/appError");


exports.getAllFeeCharges = catchAsync(async (req, res, next) => {
    const feeCharges = await FeeCharge.find();
    res.status(200).json({
        message: "Sucess",
        count: feeCharges.length,
        data: {
            feeCharges,
        },
    });
});

exports.createFeeCharge = catchAsync(async (req, res, next) => {

    const createdFeeCharge = await FeeCharge.create(req.body);

    // Send Response
    res.status(201).json({
        status: "Success",
        data: {
            createdFeeCharge,
        },
    });
});

exports.updateFeeCharge = catchAsync(async (req, res, next) => {

    const feeCharge = await FeeCharge.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    // if user does not exist send error
    if (!feeCharge) {
        return next(new appError("no Fee Charge found with that ID", 404));
    }

    // Send Response
    res.status(200).json({
        status: "success",
        data: {
            feeCharge
        },
    });
});

exports.deleteFeeCharge = catchAsync(async (req, res, next) => {
    const feeCharge = await FeeCharge.findByIdAndDelete(req.params.id);

    if (!feeCharge) {
        return next(new appError("no Fee Charge found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});


