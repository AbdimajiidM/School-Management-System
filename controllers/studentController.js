const catchAsync = require("./../utils/catchAsync");
const Student = require("../models/studentModel");
const Class = require("../models/classModel");
const appError = require("../utils/appError");
const assignStudentToClassFn = require("./functions/assignStudentToClassFn");
const trashStudentFn = require("./functions/trashStudentFn");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures")

exports.getAllAStudents = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Student.find().populate('class'), req.query).filter().sort().limitFields().paginate()
  const students = await features.query;
  res.status(200).json({
    message: "Sucess",
    count: students.length,
    data: {
      students,
    },
  });
});

exports.getStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id).populate("class");
  res.status(200).json({
    message: "Sucess",
    data: {
      student,
    },
  });
});

exports.createdStudent = catchAsync(async (req, res, next) => {
  const students = await Student.insertMany(req.body)
  res.json({
    length: students.length,
    students
  })
});

exports.updateStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
  });

  if (!student) {
    return next(new appError("no tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return next(new AppError("no tour found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.assignStudentToClass = catchAsync(async (req, res, next) => {
  // get the student id and the class needed to assign from params
  const studentId = req.params.studentId;
  const classId = req.params.classId;

  const message = await assignStudentToClassFn(studentId, classId);
  // send Response
  res.status(201).json({
    status: "success",
    data: {
      message,
    },
  });
});

exports.trashStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.id;
  const message = await trashStudentFn(studentId);

  res.json({
    status: "success",
    data: {
      message,
    },
  });
});
