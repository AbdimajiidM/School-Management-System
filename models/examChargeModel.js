const mongoose = require("mongoose");


const examChargeModel = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        default: 'exam'
    }
});



const ExamCharge = mongoose.model("examCharge", examChargeModel);

module.exports = ExamCharge;
