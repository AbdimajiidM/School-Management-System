const studentCharge = require('../models/chargeScheduleModel')
const Student = require("../models/studentModel")
const createTransactionFn = require('../controllers/functions/createTransactionFn');
const ChargeSchedule = require('../models/chargeScheduleModel');

async function chargeStudents(months = 1, charge) {
    const students = await Student.find();
    if (students.length > 0) {
        for (let index = 0; index < students.length; index++) {
            const student = students[index];
            const studentId = student._id;
            const discount = charge.discount ? student.discount : 0;
            const discountPercentage = discount / 100;
            // price - (price * discountPercentage)
            console.log(charge.amount)
            const price = charge.amount ? charge.amount :  student.monthlyFee * months;
            const fee = price - (price * discountPercentage);
            const discountDescription = discount ? `With ${discount}% discount` : ''
            const description = `${charge.description} ${discountDescription}`
            await createTransactionFn({
                description: description,
                date: charge.nextDate,
                charge: fee,
                refrenceId: studentId
            });
        }
    } else {
        return false;
    }
    return true;
}


async function chargeFeeToStudentFn() {
    const chargeSchedules = await ChargeSchedule.find();
    if (chargeSchedules) {
        for (let index = 0; index < chargeSchedules.length; index++) {
            const chargeId = chargeSchedules[index]._id;
            const charge = await ChargeSchedule.findOne({ _id: chargeId })
            const todayDate = new Date();
            if (charge.name == 'monthlyFee') {
                while (charge.nextDate <= todayDate) {
                    if (!charge.exculudedMonths.includes(charge.nextDate.getMonth())) {
                        const charged = await chargeStudents(1, charge);
                        if (charged) {
                            let nextMonth = charge.nextDate.getMonth() + 1;
                            while (charge.exculudedMonths.includes(nextMonth)) {
                                nextMonth++;
                            }
                            charge.nextDate.setMonth(nextMonth, 1);
                        }
                    } else {
                        let nextMonth = charge.nextDate.getMonth() + 1;
                        while (charge.exculudedMonths.includes(nextMonth)) {
                            nextMonth++;
                        }
                        charge.nextDate.setMonth(nextMonth, 1);
                    }
                }

                let newCharge = await ChargeSchedule.findOne({ _id: chargeId });
                newCharge.nextDate = charge.nextDate;
                await newCharge.save();

            } else {
                if (charge.nextDate <= todayDate) {
                    const months = charge.endMonth - charge.startMonth;
                    const charged = await chargeStudents(months, charge);
                    if (charged) {
                        const date = new Date(charge.nextDate)
                        date.setFullYear(date.getFullYear() + 1);
                        charge.nextDate = date;
                        await charge.save();
                    }
                }
            }
        }
    }
}

module.exports = chargeFeeToStudentFn;
