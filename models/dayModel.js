const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});


const Day = mongoose.model("Day", daySchema);

module.exports = Day;