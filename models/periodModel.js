const mongoose = require("mongoose");
const Day = require("./dayModel")

const periodSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        validate: {
            validator: async function (arg) {
                const day = await Day.findOne({ name: arg });
                return day;
            },
            message: '{VALUE} is not a valid day'
        }
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    period: {
        type: Number,
        required: true,
    },
    periodUniqueId: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            return `${this.day}${this.period}${this.class}`
        },
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    }
});


const Period = mongoose.model('Period', periodSchema);





module.exports = Period;