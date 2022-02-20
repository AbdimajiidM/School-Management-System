const mongoose = require("mongoose");

function trashCheckFn(){
  return this.name != "Trashed";
};
const classSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  stage: {
    type: String,
    required: trashCheckFn,
    enum: ["primary", "secondary", "pre-school"],
  },
  shift: {
    type: String,
    required:trashCheckFn,
  },
  monthlyFee: {
    type: Number,
    required: trashCheckFn,
  },
  status: {
    type: String,
    default: "Trashed",
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      // default: null,
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      // default: null,
    },
  ],
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
