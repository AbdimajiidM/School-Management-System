const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures")
const Period = require("../models/periodModel");
const Class = require("../models/classModel")
const appError = require("../utils/appError");
const Day = require("../models/dayModel");

exports.getAllPeriods = catchAsync(async (req, res, next) => {
    // get all periods with query
    const features = new APIFeatures(Period.find().populate('class').populate('course').populate('teacher'), req.query).filter().sort().limitFields().paginate()
    const periods = await features.query;

    let periodsByClass = [];

    // desing periods by class, by adding periodsByclass variable custome class schema for periods
    const dbClasses = await Class.find();
    if (dbClasses) for (const index in dbClasses) {
        const _class = dbClasses[index];
        if (_class) periodsByClass.push({
            id: _class._id,
            name: _class.name,
            periods: []
        })
    };

    // loop periods and store every period its class in the periodByClass variable
    if (periods) for (const index in periods) {
        const period = periods[index] // get current period in the periods array from db
        for (const i in periodsByClass) { // loop periodsByClass variable[array]
            const _class = periodsByClass[i]; // get current class
            // check if the two IDs[the period's class id and the class id in the periodsByclass variable]
            if (period.class._id.toString() === _class.id.toString()) {
                // push the period to it's class in the periodsByClass variable
                periodsByClass[i].periods.push(period)
            }
        }
    }

    // send the response
    res.status(200).json({
        message: "Sucess",
        count: periods.length,
        data: {
            classes: periodsByClass
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
    const periods = await Period.create(req.body)
    res.status(201).json({
        status: "Success",
        data: {
            periods
        },
    });


});

exports.updatePeriod = catchAsync(async (req, res, next) => {
    const { startTime, endTime, teacher, course } = req.body;
    const body = {
        startTime,
        endTime,
        teacher,
        course,
    };

    const period = await Period.findByIdAndUpdate(req.params.id, body, {
        new: true,
        runValidators: true,
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
        return next(new appError('please tell us the class ID ', 400));
    }

    const dbClass = await Class.findById(classId);

    // if the ID is not correct ID return error
    if (!dbClass) {
        return next(new appError('No Class Found with that ID ', 400));
    }
    // find class periods
    const features = new APIFeatures(Period.find({ class: classId }).populate('class').populate('course').populate('teacher'), req.query).filter().sort().limitFields().paginate()
    const periods = await features.query;

    // design periods as timetable

    const days = await Day.find();

    let periodsByDay = {}
    days.forEach(day => {
        periodsByDay[day.name] = [];
    });

    for (let index = 0; index < periods.length; index++) {
        const period = periods[index];
        console.log(periodsByDay[period.day])
        periodsByDay[period.day].push(period)
    }

    // send response
    res.status(200).json({
        status: "success",
        length: periods.length,
        periods: periodsByDay,
    })
})

