const catchAsync = require("./../utils/catchAsync");
const Teacher = require("../models/teacherModel")
const appError = require("../utils/appError");



exports.getAllTeachers = catchAsync(async (req, res, next) => {
  const teachers = await Teacher.find();
  res.status(200).json({
    message: "Sucess",
    count: teachers.length,
    data: {
      teachers,
    },
  });
});

exports.getTeacher = catchAsync(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);
  res.status(200).json({
    message: "Sucess",
    data: {
      teacher,
    },
  });
});

exports.createTeacher = catchAsync(async (req, res, next) => {
  const createdTeacher = await Teacher.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      createdTeacher,
    },
  });
});

exports.updateTeacher = catchAsync(async (req, res, next) => {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
  });

  if (!teacher) {
    return next(new appError("no teacher found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      teacher,
    },
  });
});

exports.deleteTeacher = catchAsync(async (req, res, next) => {
  const teacher = await Teacher.findByIdAndDelete(req.params.id);

  if (!teacher) {
    return next(new appError("no teacher found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
