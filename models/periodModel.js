const mongoose = require("mongoose")

const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thurusday', 'friday']

const periodSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: days
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    duration: {
        type: Number
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


// Create a virtual property `startTime` that's computed from `startDate`.
// periodSchema.virtual('startTime').get(function () {
//     var hours = this.startDate.getHours();
//     var minutes = this.startDate.getMinutes();
//     var ampm = hours >= 12 ? 'pm' : 'am';
//     hours = hours % 12;
//     hours = hours ? hours : 12;
//     minutes = minutes < 10 ? '0'+minutes : minutes;
//     var startDate = hours + ':' + minutes + '' + ampm;
//     return  startDate;
// });

// // Create a virtual property `endTime` that's computed from `endDate`.
// periodSchema.virtual('endTime').get(function () {
//     var hours = this.endDate.getHours();
//     var minutes = this.endDate.getMinutes();
//     var ampm = hours >= 12 ? 'pm' : 'am';
//     hours = hours % 12;
//     hours = hours ? hours : 12;
//     minutes = minutes < 10 ? '0'+minutes : minutes;
//     var endDate = hours + ':' + minutes + '' + ampm;
//     return  endDate;
// });

periodSchema.set('toJSON', {
    virtuals: true
});

const Period = mongoose.model('Period', periodSchema);


module.exports = Period;