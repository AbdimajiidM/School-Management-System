const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    privillages: [
        {
            name: String,
            access: Array(String)
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;