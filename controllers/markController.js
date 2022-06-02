const catchAsync = require("./../utils/catchAsync");
const Mark = require("../models/markModel");
const Student = require("../models/studentModel");
const Course = require("../models/courseModel")
const APIFeatures = require(".././utils/apiFeatures");
const { getStudentExamsFn, getStudentsExamsSummary } = require('./functions/getStudentsExams')
const appError = require("../utils/appError");
const AppError = require("../utils/appError");

exports.getAllMarks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Mark.find().populate('class'), req.query).filter().sort().limitFields().paginate()
  const marks = await features.query;
  res.status(200).json({
    message: "Sucess",
    count: marks.length,
    data: {
      marks,
    },
  });
});

exports.createMark = catchAsync(async (req, res, next) => {
  const { studentId, exam, classId, marks, course, term, user, remarks } = req.body;
  const createdMark = await Mark.create({
    student: studentId, exam, class: classId, marks, course, term, user, remarks
  });
  res.status(201).json({
    status: "Success",
    data: {
      createdMark,
    },
  });
});

exports.createCourseMarks = catchAsync(async (req, res, next) => {

  const { students, term, userId, classId, exam, course } = req.body;
  let validMarks = [];
  let ivalidMarks = []

  if (students) for (let index = 0; index < students.length; index++) {
    const currentStudent = students[index];
    const currentStudentId = currentStudent.studentId;
    const examMarks = currentStudent[exam.toLowerCase()]
    const student = await Student.findOne({ studentId: currentStudentId });
    if (!student) {
      return next(new appError(`No Student Found with ID ${currentStudentId}`, 400))
    }
    let mark = {
      student: student._id,
      class: classId,
      user: userId,
      term,
      course,
      exam: exam.toLowerCase(),
      marks: examMarks,
      remarks: currentStudent.remarks
    }
    const model = new Mark(mark);
    let error = model.validateSync();
    if (!error) {
      validMarks.push(mark)
    } else if (error) {
      ivalidMarks.push({
        mark,
        error: error.message
      });

    }

  }

  if (ivalidMarks.length) {
    return res.status(400).json({
      status: 'failed',
      message: `failed, please check the excel Format`,
      ivalidMarks,
    })
  }

  const createdMarks = await Mark.create(validMarks)

  res.status(400).json({
    status: "success",
    message: `${validMarks.length} student Marks stored Sucessfully`,
    createdMarks
  })


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

  let term = req.query.term;
  if (!term) return next(new appError('please chose the exam term', 400));

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

  let term = req.query.term;

  if (!term) return next(new appError('exam term is required', 400));

  const students = await Student.find().populate('class');
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

exports.getStudentsMarksByClass = catchAsync(async (req, res, next) => {

  let term = req.query.term;

  if (!term) return next(new appError('exam term is required', 400));

  const classId = req.params.classId;
  const students = await Student.find({ class: classId }); // classe's students
  const courses = await Course.find();

  // get class students exams
  let studentsExams = await getStudentsExamsSummary(students, courses, req.query)

  // SEND RESPONSE
  res.status(200).json({
    status: 'sucess',
    data: {
      students: studentsExams
    }
  })
});



