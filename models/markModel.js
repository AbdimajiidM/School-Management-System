const mongoose = require("mongoose");

const markSchema = mongoose.Schema({
    exam: {
        type: String,
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    marks: {
        type: Number,
        required: true,
    },
    term: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    remarks: {
        type: String,
    }
});


const Mark = mongoose.model("Mark", markSchema);

 module.exports = Mark;