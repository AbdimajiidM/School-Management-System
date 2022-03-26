const catchAsync = require("./../utils/catchAsync");
const Mark = require("../models/markModel");
const Student = require("../models/studentModel");
const Course = require("../models/courseModel")
const APIFeatures = require(".././utils/apiFeatures");
const {getStudentsExamsFn, getStudentExamsFn, getStudentsExamsSummary} = require('./functions/getStudentsExams')
const appError = require("../utils/appError");

exports.getAllMarks = catchAsync(async (req, res, next) => {
  const marks = await Mark.find();
  res.status(200).json({
    message: "Sucess",
    count: marks.length,
    data: {
      marks,
    },
  });
});

exports.createMark = catchAsync(async (req, res, next) => {
  const createdMark = await Mark.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      createdMark,
    },
  });
});

exports.updateMark = catchAsync(async (req, res, next) => {

  const mark = await Mark.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
  });

  if (!mark) {
    return next(new appError("no make found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      mark,
    },
  });
});

exports.deleteMark = catchAsync(async (req, res, next) => {
  const mark = await Mark.findByIdAndDelete(req.params.id);

  if (!mark) {
    return next(new appError("no mark found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getStudentMarks = catchAsync(async (req, res, next) => {

  let filter = {};
  if (req.params.id) filter = { student: req.params.id };

  // Find Student 
  const student = await Student.findOne(filter).populate('class');
  // Excute Query
  const features = new APIFeatures(Mark.find(filter).populate('course').populate('student').populate('class'), req.query).filter().sort().limitFields().paginate()
  const marks = await features.query;
  const courses = await Course.find();

  // Getting
  const exams = await getStudentExamsFn(marks, courses, student)

  // SEND RESPONSE
  res.status(200).json({
    status: 'sucess',
    data: exams
  })
})

exports.getAllStudentsMarks = catchAsync(async (req, res, next) => {
  const students = await Student.find();
  const courses = await Course.find();

  // get students exams
  let studentsExams = await getStudentsExamsSummary(students, courses, req.query)

  // SEND RESPONSE
  res.status(200).json({
    status: 'sucess',
    data: {
      students: studentsExams
    }
  })
});

exports.getStudentsMarksByClass = catchAsync(async(req,res,next)=>{
  const classId = req.params.classId;
  const students = await Student.find({class: classId}); // classe's students
  const courses = await Course.find();

  // get class students exams
  let studentsExams = await getStudentsExamsSummary(students,courses,req.query)

   // SEND RESPONSE
   res.status(200).json({
    status: 'sucess',
    data: {
      students: studentsExams
    }
  })
});



