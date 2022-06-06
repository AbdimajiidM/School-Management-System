const Class = require('../models/classModel');
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');

const catchAsync = require("../utils/catchAsync")

exports.defaultDashboard = catchAsync(async (req, res, next) => {
  const students = await Student.count();
  const classes = await Class.count();
  const teachers = await Teacher.count();
  const clearStudents = await Student.count({ debit: 0 });
  const unClearStudents = await Student.count({ debit: { $gt: 0 } })
  res.status(200).json({
    message: "Sucess",
    data: [
      { label: "Students", value: students },
      { label: "Classess", value: classes },
      { label: "Teachers", value: teachers },
      { label: "Clear Students", value: clearStudents },
      { label: "Unclear Students", value: unClearStudents }
    ],
  });
});