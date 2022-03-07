const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Stage = mongoose.model("Stage", stageSchema);

module.exports = Stage;