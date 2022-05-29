const mongoose = require("mongoose");


const feeChargeSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  months: {
    type: Array
  },
  exam: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'ExamCharge'
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'fee'
  }
});

const FeeCharge = mongoose.model("feecharge", feeChargeSchema);

module.exports = FeeCharge;
