const catchAsync = require("./../utils/catchAsync");
const appError = require("../utils/appError");
const ClassGroup = require("../models/classGroupModel");


exports.getAllClassGroups = catchAsync(async (req, res, next) => {
    const classGroups = await ClassGroup.find();
    res.status(200).json({
        message: "Sucess",
        count: classGroups.length,
        data: {
            classGroups,
        },
    });
});

;

exports.createClassGroup = catchAsync(async (req, res, next) => {

    const createdClassGroup = await ClassGroup.create(req.body);

    // Send Response
    res.status(201).json({
        status: "Success",
        data: {
            createdClassGroup,
        },
    });
});

exports.updateClassGroup = catchAsync(async (req, res, next) => {

    const classGroup = await ClassGroup.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    // if user does not exist send error
    if (!classGroup) {
        return next(new appError("no classGroup found with that ID", 404));
    }

    // Send Response
    res.status(200).json({
        status: "success",
        data: {
            classGroup
        },
    });
});

exports.deleteClassGroup = catchAsync(async (req, res, next) => {
    const classGroup = await ClassGroup.findByIdAndDelete(req.params.id);

    if (!classGroup) {
        return next(new appError("no classGroup found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});


