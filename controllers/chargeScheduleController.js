const catchAsync = require("../utils/catchAsync");
const ChargeSchedule = require("../models/chargeScheduleModel");
const appError = require("../utils/appError");

exports.getScheduleCharges = catchAsync(async (req, res, next) => {
    const chargesSchedule = await ChargeSchedule.find();

    res.json({
        chargesSchedule
    })
});
exports.createScheduleCharge = catchAsync(async (req, res, next) => {
    const body = req.body;

    if (body.name !== 'monthlyFee') {
        var startDate = new Date(body.startDate) ;
        var endDate = endDate && new Date(body.endDate) 
        console.log(startDate)
        var startMonth = startDate.getMonth();
        if (endDate) {
            var endMonth = endDate.getMonth();
            // get excluded months between the startmonth and endMonth
            let months = [];
            for (let index = startMonth; index < endMonth; index++) {
                months.push(index)
            }

            // store months in excludedMonths field in the monthlyFee document
            const monthlyChargeDecoment = await ChargeSchedule.findOne({ name: "monthlyFee" });
            if (monthlyChargeDecoment) {
                for (let index = 0; index < months.length; index++) {
                    if (!monthlyChargeDecoment.exculudedMonths.includes(months[index])) {
                        monthlyChargeDecoment.exculudedMonths.push(months[index])
                    }
                }
                await monthlyChargeDecoment.save();
            }
        }
    }

    // create charge schedule
    const createdChargesSchedule = await ChargeSchedule.create({
        name: req.body.name,
        description: req.body.description,
        startDate: startDate,
        endDate: endDate && endDate,
        nextDate: startDate && startDate
    });

    res.status(201).json({
        status: "Success",
        data: {
            createdChargesSchedule,
        },
    });
});

exports.getScheduleCharege = catchAsync(async (req, res, next) => {
    const charge = await ChargeSchedule.findById(req.params.id);
    res.status(200).json({
        message: "Sucess",
        data: {
            charge
        },
    });
});

exports.updateStage = catchAsync(async (req, res, next) => {

    const chargesSchedule = await ChargeSchedule.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // runValidators: true,
    });

    if (!chargesSchedule) {
        return next(new appError("no studentCharge found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            chargesSchedule,
        },
    });
});

exports.deleteStage = catchAsync(async (req, res, next) => {
    const studentCharge = await ChargeSchedule.findByIdAndDelete(req.params.id);

    if (!studentCharge) {
        return next(new appError("no studentCharge found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
});

