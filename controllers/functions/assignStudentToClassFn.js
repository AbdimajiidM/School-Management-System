const Student = require("../../models/studentModel");
const Class = require("../../models/classModel");
const catchAsync = require("../../utils/catchAsync");
async function assignStudentToClassFn(studentId, classId) {
  // get the student's former class
  const student = await Student.findById(studentId);
  const formerClass = await Class.findById(student.class);

  // remove the student from the former Class
  if (formerClass) {
    if (formerClass._id == classId) {
      return `${student.first_name} is allready in ${formerClass.name}`;
    }
    const index = formerClass.students.indexOf(studentId);
    formerClass.students.splice(index, 1);
    await formerClass.save();
  }

  // assign student to class
  await Student.updateOne({ _id: studentId }, { $set: { class: classId } });

  // store student id in the new Clas
  const newClass = await Class.findById(classId);
 
  newClass.students.push(studentId);
  const theClass = await newClass.save();

  return `${student.first_name} is assigned to ${theClass.name}`;
}

module.exports = assignStudentToClassFn;
