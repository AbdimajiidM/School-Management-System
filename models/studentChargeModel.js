const mongoose = require("mongoose");
const today  = new Date();
today.setHours(24,0,0,0);
today.setMonth(today.getMonth()+1, 1)
const studentCharge = mongoose.Schema({
  name: {
    type: String,
    default:"monthlyFee",
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  nextDate: {
    type: Date,
    default: today
  }
});

const StudentCharge = mongoose.model("studentCharge", studentCharge);

module.exports = StudentCharge;
