const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures")
const Period = require("../models/periodModel");
const appError = require("../utils/appError");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

exports.getAllPeriods = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Period.find(), req.query).filter().sort().limitFields().paginate()
    const periods = await features.query;

    res.status(200).json({
        message: "Sucess",
        count: periods.length,
        data: {
            periods,
        },
    });
});

exports.getPeriod = catchAsync(async (req, res, next) => {
    const period = await Period.findById(req.params.id);
    res.status(200).json({
        message: "Sucess",
        data: {
            period
        },
    });
});

exports.createPeriod = catchAsync(async (req, res, next) => {

    const periods = await Period.insertMany(req.body)
    res.status(201).json({
        status: "Success",
        data: {
            periods
        },
    });


});

exports.updatePeriod = catchAsync(async (req, res, next) => {
    const { day, courseId, startTime, endTime, teacherId, classId } = req.body;
    const body = {
        day,
        course: courseId,
        teacher: teacherId,
        startDate: startTime,
        endDate: endTime,
        class: classId
    };

    const period = await Period.findByIdAndUpdate(req.params.id, body, {
        new: true,
        // runValidators: true,
    });

    if (!period) {
        return next(new appError("no period found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            period,
        },
    });
});

exports.deletePeriod = catchAsync(async (req, res, next) => {
    const period = await Period.findByIdAndDelete(req.params.id);

    if (!period) {
        return next(new appError("no Period found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.getPeriodsByClass = catchAsync(async (req, res, next) => {
    const classId = req.params.classId;

    // if no class return with error
    if (!classId) {
        return next(new AppError('please tell us the class ID ', 400));
    }

    // find class periods
    const features = new APIFeatures(Period.find({ class: classId }).populate('class').populate('course').populate('teacher'), req.query).filter().sort().limitFields().paginate()
    const periods = await features.query;

    // design periods as timetable
    let periodsByDay = {
        'saturday': [], 'sunday': [], 'monday': [], 'tuesday': [], 'wednesday': [], 'thursday': [], 'friday': []
    }

    for (let index = 0; index < periods.length; index++) {
        const period = periods[index]
        periodsByDay[period.day].push(period)
    }

    // send response
    res.status(200).json({
        status: "success",
        length: periods.length,
        periods: periodsByDay,
    })
})

