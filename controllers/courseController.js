const catchAsync = require("./../utils/catchAsync");
const Course = require("../models/courseModel");
const defatulClasses = require("../utils/default_classes");
const defatulCourses = require("../utils/default_courses");
const Stage = require("../models/stageModel")
const appError = require("../utils/appError");

exports.getAllCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find()
  res.status(200).json({
    message: "Sucess",
    count: courses.length,
    data: {
      courses,
    },
  });
});

exports.getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  res.status(200).json({
    message: "Sucess",
    data: {
      course,
    },
  });
});

exports.createCourse = catchAsync(async (req, res, next) => {
  const createdCourse = await Course.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      createdCourse,
    },
  });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
  });

  if (!course) {
    return next(new appError("no course found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

exports.deleteCours = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(new appError("no course found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

