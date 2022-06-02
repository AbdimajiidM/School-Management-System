const catchAsync = require("./../utils/catchAsync");
const appError = require("../utils/appError");
const Teacher = require("../models/teacherModel");
const Class = require("../models/classModel");
const trashTeacherFn = require("./functions/trashTeacherFn");

exports.getAllTeachers = catchAsync(async (req, res, next) => {
  const teachers = await Teacher.find().populate("classes");
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

exports.assingTeacherToClasses = catchAsync(async (req, res, next) => {
  const teacherId = req.params.id; // get teacher ID from params
  const classes = req.body; // get Classes from request body

  // check if classess in request body
  if (classes.length) {
    // loop the classes
    for (let index = 0; index < classes.length; index++) {
      const classId = classes[index]; // get class Id from Request Body
      const _class = await Class.findById(classId); // find current class from the DB
      // check if class in the DB
      if (_class) {
        const teacher = await Teacher.findById(teacherId); // find the teacher in the DB

        // check in the teacher all ready in the class
        const teacherInTheClass = _class.teachers.includes(teacherId);
        if (!teacherInTheClass) {
          _class.teachers.push(teacherId); // add teacher in the class
          await _class.save(); // save the changes in the DB
        }

        // check in the class ID Allready in the Teacher Document
        const classIdStoredInTheTeacherDocument =
          teacher.classes.includes(classId);
        if (!classIdStoredInTheTeacherDocument) {
          teacher.classes.push(classId); // add calss Id in the teacher Document
          await teacher.save(); // save the changes in the DB
        }
      } else {
        return next(new appError(`class ID : ${classId} was not found!`, 404));
      }
    }
  } else {
    return next(new appError("classes are required", 400));
  }

  // send response
  res.json({
    status: "success",
    data: {
      message: "success",
    },
  });
});

exports.removeTeacherFromClassess = catchAsync(async (req, res, next) => {
  // teacher ID, and classes ID
  const teacherId = req.params.id; // get teacher ID from the request params
  const classesId = req.body; // get classes id from the request body
  // find the teacher in the DB

  if (classesId.length) {
    for (let i = 0; i < classesId.length; i++) {
      const classId = classesId[i];
      const _class = await Class.findById(classId);
      const teacher = await Teacher.findById(teacherId);
      // 1) check if teacher is in the class and remove teacher Id from the teachers field
      const teacherInTheClass = _class.teachers.includes(teacherId);
      if (teacherInTheClass) {
        const index = _class.teachers.indexOf(teacherId); // get index of the teacher Id in the class document
        _class.teachers.splice(index, 1); // remove teacher from the class document
        await _class.save(); // save the changes in the DB
      } else {
        console.log("teacher is not in the class!");
      }
      // 2 check if class ID in the teacher document and remove class Id from the classes field
      const classInTheTeacherDocument = teacher.classes.includes(classId);
      if (classInTheTeacherDocument) {
        const index = teacher.classes.indexOf(classId); // get index of the class in teacher document
        teacher.classes.splice(index, 1); // remove class from teacher document
        await teacher.save();
      } else {
        console.log("teacher is not assigned to that class!");
      }
    }
  } else {
    return next(new appError("classes are required", 400));
  }

  // send response
  res.json({
    status: "success",
    data: {
      message: "success",
    },
  });
});

exports.trashTeacher = catchAsync(async (req, res, next) => {
  const teacherId = req.params.id;

  const message = await trashTeacherFn(teacherId);

  res.json({
    status: "success",
    data: {
      message,
    },
  });
});
