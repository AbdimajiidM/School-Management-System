const Student = require("../../models/studentModel");
const Class = require("../../models/classModel");

async function trashStudentFn(studentId) {
  // get the student's former class
  const student = await Student.findById(studentId);
  const formerClass = await Class.findById(student.class);

  // remove the student from the former Class
  if (formerClass) {
    if (formerClass.name == "Trashed") {
      return `${student.first_name} is allready Trashed`;
    }
    const index = formerClass.students.indexOf(studentId);
    formerClass.students.splice(index, 1);
    await formerClass.save();
  }

    // store student in the trashed Class
    const trashClass = await Class.find({ name: "Trashed" });

    if (trashClass.length == 0) {
      await Class.create({
        name: "Trashed",
        students: [studentId],
      });
    } else {
      trashClass[0].students.push(studentId);
      await trashClass[0].save();
    }
   // assign student to class
   await Student.updateOne(
    { _id: studentId },
    { $set: { class: trashClass[0]._id } }
  );


  return `Student Trashed`;
  
}

module.exports = trashStudentFn;
