const mongoose = require("mongoose");
const ContactSchema = require("../schema/ContactSchema");

const studentSchema = ContactSchema.add({
  studentId: {
    type: Number,
    default: 1,
    unique: true
  },
  regNo: {
    type: Number,
    default: 1,
    unique: true
  },
  reg_date: {
    type: Date,
    default: new Date(),
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    // default: null,
  },
  debit: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
  parent: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  }
});

studentSchema.pre("save", async function (next) {
  //sorting students
  const students = await Student.find({}).sort([["studentId", -1]]);

  if (students.length > 0) {
    this.studentId = students[0].studentId + 1;
    this.regNo = students[0].regNo + 1;
  }

  next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
