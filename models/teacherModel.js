const mongoose = require("mongoose");
const ContactSchema = require("../schema/ContactSchema");

const teacherSchema = mongoose.Schema({
  name: {
    type: "string",
    required: true
  },
  sex: {
    type: "string",
    required: true,
    enum: ["Male", "Female"]
  },
  contact: {
    type: "string",
  },
  teacherId: {
    type: Number,
    default: 1,
  },
  field: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
  Degree: {
    type: String,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    }
  ],
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    }
  ],
});

teacherSchema.pre("save", async function (next) {
  //sorting students
  const teachers = await Teacher.find({}).sort([["teacherId", -1]]);

  if (teachers.length > 0) {
    this.teacherId = teachers[0].teacherId + 1;
  }

  next();
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
