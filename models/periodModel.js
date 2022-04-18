const mongoose = require("mongoose")

const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thurusday', 'friday']

const periodSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: days
    },
    startHour: {
        type: Number,
        required: true
    },
    startMinute: {
        type: Number,
        required: true
    },
    endHour: {
        type: Number,
        required: true
    },
    endMinute: {
        type: Number,
        required: true
    },
    period: {
        type: Number,
        required: true,
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
periodSchema.virtual('startTime').get(function () {
    var hours = this.startHour;
    var minutes = this.startMinute;
    if(minutes==0) minutes = '00';
    const startTime = `${hours}:${minutes}`
    return  startTime;
});

// Create a virtual property `endTime` that's computed from `endDate`.
periodSchema.virtual('endTime').get(function () {
    var hours = this.endHour;
    var minutes = this.endMinute;
    if(minutes==0) minutes = '00';
    const endTime = `${hours}:${minutes}`
    return  endTime;
});

periodSchema.set('toJSON', {
    virtuals: true
});

const Period = mongoose.model('Period', periodSchema);


module.exports = Period;