const catchAsync = require("./../utils/catchAsync");
const Class = require("../models/classModel");
const appError = require("../utils/appError");

exports.getAllClasses = catchAsync(async (req, res, next) => {
  const classes = await Class.find().populate("students");
  res.status(200).json({
    message: "Sucess",
    count: classes.length,
    data: {
      classes,
    },
  });
});

exports.getClass = catchAsync(async (req, res, next) => {
  const _class = await Class.findById(req.params.id).populate("students");
  res.status(200).json({
    message: "Sucess",
    data: {
      class: _class,
    },
  });
});

exports.createClass = catchAsync(async (req, res, next) => {
  const createdClass = await Class.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      createdClass,
    },
  });
});

exports.updateClass = catchAsync(async (req, res, next) => {
  
  const _class = await Class.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
  });

  if (!_class) {
    return next(new appError("no class found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      class: _class,
    },
  });
});

exports.deleteClass = catchAsync(async (req, res, next) => {
  const _class = await Class.findByIdAndDelete(req.params.id);

  if (!_class) {
    return next(new appError("no class found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
