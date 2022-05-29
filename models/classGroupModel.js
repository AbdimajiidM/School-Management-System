const mongoose = require("mongoose");


const classGroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const ClassGroup = mongoose.model('classGroup', classGroupSchema);

module.exports = ClassGroup;