const Teacher = require("../../models/teacherModel");
const Class = require("../../models/classModel");

async function trashTeacherFn(teacherId) {
  // get the teacher
  const teacher = await Teacher.findById(teacherId);

  // remove teacher from formeClasses
  teacher.classes.splice(0, teacher.classes.length);

  // store student in the trashed Class
  const trashClass = await Class.findOne({ name: "Trashed" });

  if (!trashClass) {
    const newTrashClass = await Class.create({
      name: "Trashed",
      teachers: [teacherId],
    });
    console.log(newTrashClass._id);
    console.log(teacher.classes);
    teacher.classes.push(newTrashClass._id);
    console.log(teacher.classes);
    await teacher.save();
  } else {
    const teacherTrashed = trashClass.teachers.includes(teacherId);
    if (!teacherTrashed) {
      trashClass.teachers.push(teacherId);
      await trashClass.save();
      teacher.classes.push(trashClass._id);
      await teacher.save();
    } else {
      return "Teacher Allready Trashed!"
    }
  }

  return `Teacher Trashed`;
}

module.exports = trashTeacherFn;
