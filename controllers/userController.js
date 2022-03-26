const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");
const appError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    message: "Sucess",
    count: users.length,
    data: {
        users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    message: "Sucess",
    data: {
        user
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const createdUser = await User.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
        createdUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
  });

  if (!user) {
    return next(new appError("no user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new appError("no user found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

