const Student = require("../../models/studentModel");
const Class = require("../../models/classModel");
const catchAsync = require("../../utils/catchAsync");
const removeStudentFromFormerClass = require("./removeStudentFromFormerClass");
const res = require("express/lib/response");


async function assignStudentsToClassFn(studentsIds, classId) {

  // search the class in the db
  const dbClass = await Class.findById(classId);

  // return error if no class found
  if (!dbClass) return { statusCode: 400, status: 'fail', message: 'No Class Found with that ID' };

  // loop the student ids and search with every id a student in the db, if no student found with an id, store that id in the ivalidIds variable[array]
  var invalidIds = [];

  for (let index = 0; index < studentsIds.length; index++) {
    const studentId = studentsIds[index];
    const student = await Student.findById(studentId);
    if (!student) invalidIds.push(studentId);
  }

  // return error if there is an invalid ID
  if (invalidIds.length) return { statusCode: 400, status: 'fail', message: `${invalidIds.length} invalid ids found!, please check the students list` }

  // if the classId and students Ids are correct, loop the students and assing everyone to the classs
  let students = [];
  for (let index = 0; index < studentsIds.length; index++) {
    const studentId = studentsIds[index];
    // get the student's former class
    const student = await Student.findById(studentId);
    if (!student) return { statusCode: 404, status: 'fail', message: "No Student Found with that id!" }
    const formerClass = await Class.findById(student.class);

    if (formerClass) {
      // return with message if student is allready in the class
      if (formerClass._id == classId) continue;
      // remove the student from the former Class
      await removeStudentFromFormerClass(classId, formerClass, studentId, student);
    }

    // assign student to class
    await Student.updateOne({ _id: studentId }, { $set: { class: classId } });

    // store student id in the new Clas
    const newClass = await Class.findById(classId);

    newClass.students.push(studentId);
    const theClass = await newClass.save();

    students.push(student.first_name);

  }

  // return response
  return {
    statusCode: 200,
    status: 'success',
    message: `${students.length} students are assigned to ${dbClass.name}`
  };
}

module.exports = assignStudentsToClassFn;
