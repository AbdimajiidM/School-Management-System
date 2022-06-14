const catchAsync = require("./../utils/catchAsync");
const Stage = require("../models/stageModel");
const appError = require("../utils/appError");

exports.getAllStages = catchAsync(async (req, res, next) => {
  const stages = await Stage.find().populate("courses");
  res.status(200).json({
    message: "Sucess",
    count: stages.length,
    data: {
      stages,
    },
  });
});

exports.getStage = catchAsync(async (req, res, next) => {
  const stage = await Stage.findById(req.params.id).populate("courses");
  res.status(200).json({
    message: "Sucess",
    data: {
      stage
    },
  });
});

exports.createStage = catchAsync(async (req, res, next) => {
  const createdStage = await Stage.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      createdStage,
    },
  });
});

exports.updateStage = catchAsync(async (req, res, next) => {

  const stage = await Stage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
  });

  if (!stage) {
    return next(new appError("no stage found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      stage,
    },
  });
});

exports.deleteStage = catchAsync(async (req, res, next) => {
  const stage = await Stage.findByIdAndDelete(req.params.id);

  if (!stage) {
    return next(new appError("no stage found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

