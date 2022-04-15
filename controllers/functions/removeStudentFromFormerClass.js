const Class = require("../../models/classModel");

async function removeStudentFromFormerClass(classId, formerClass, studentId) {
  if (formerClass) {
    const index = formerClass.students.indexOf(studentId);
    formerClass.students.splice(index, 1);
    await formerClass.save();
  }
}

module.exports = removeStudentFromFormerClass;
