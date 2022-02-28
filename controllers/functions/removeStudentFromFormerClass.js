const Class = require("../../models/classModel");

async function removeStudentFromFormerClass(classId,formerClass) {
  if (formerClass) {
    if (formerClass._id == classId) {
      return `${student.first_name} is allready in ${formerClass.name}`;
    }
    const index = formerClass.students.indexOf(studentId);
    formerClass.students.splice(index, 1);
    await formerClass.save();
  }
}

module.exports = removeStudentFromFormerClass;
