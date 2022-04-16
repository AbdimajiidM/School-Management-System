const Class = require('../models/classModel');
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');

const catchAsync = require("../utils/catchAsync")

exports.defaultDashboard = catchAsync(async (req, res, next) => {
    const students = await Student.find();
    const classes = await Class.find();
    const teachers = await Teacher.find();
    const clearStudents = await Student.find({debit: 0});
    const unClearStudents = await Student.find({debit: {$gt: 0}})
    res.status(200).json({
      message: "Sucess",
      data: {
        students: students.length,
        classes: classes.length,
        teachers: teachers.length,
        clearStudents: clearStudents.length,
        unClearStudents: unClearStudents.length
      },
    });
  });