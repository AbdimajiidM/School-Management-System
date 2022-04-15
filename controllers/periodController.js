const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures")
const Period = require("../models/periodModel");
const appError = require("../utils/appError");
const AppError = require("../utils/appError");

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
    const { day, course, startTime, endTime, teacher, duration } = req.body;

    const createdPeriod = await Period.create({
        day: day.toLowerCase(),
        course,
        teacher,
        startTime,
        endTime,
        duration,
        class: req.body.class
    });

    res.status(201).json({
        status: "Success",
        data: {
            createdPeriod,
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

    if (!classId) {
        return next(new AppError('please tell us the class ID ', 400));
    }
    const features = new APIFeatures(Period.find({ class: classId }), req.query).filter().sort().limitFields().paginate()
    const periods = await features.query;

    let periodsByDay = {
        'saturday': [],
        'sunday': [],
        'monday': [],
        'tuesday': [],
        'wednesday': [],
        'thursday': [],
        'friday': []
    }

    for (let index = 0; index < periods.length; index++) {
        const period = periods[index]
        if (period.day == 'saturday') {
            periodsByDay.saturday.push(period)
        } else if (period.day == 'sunday') {
            periodsByDay.sunday.push(period)
        } else if (period.day == 'monday') {
            periodsByDay.monday.push(period)
        } else if (period.day == 'tuseday') {
            periodsByDay.tuesday.push(period)
        } else if (period.day == 'wednesday') {
            periodsByDay.wednesday.push(period)
        } else if (period.day == 'thursday') {
            periodsByDay.thursday.push(period)
        } else if (period.day == 'friday') {
            periodsByDay.friday.push(period)
        }

    }


    res.status(200).json({
        status: "success",
        length: periods.length,
        periods: periodsByDay,
    })
})

