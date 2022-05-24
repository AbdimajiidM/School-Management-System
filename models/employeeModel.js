const mongoose = require("mongoose");
const ContactSchema = require("../schema/ContactSchema");

const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } }
const employeeSchema = mongoose.Schema({
    ...ContactSchema,
    employeeId: {
        type: Number,
        default: 1,
        unique: true
    },
    reg_date: {
        type: Date,
        default: new Date(),
    },
    role: {
        type: String
    },
    salary: {
        type: Number
    },
    status: {
        type: String,
    }
}, opts)

// Create a virtual property `fullName` that's computed from `first_name`, `middle_name` and `last_name`.
studentSchema.virtual('fullName').get(function () {
    return `${this.first_name} ${this.middle_name} ${this.last_name}`;
});


// auto generate employee ID
studentSchema.pre("validate", async function (next) {
    //sorting students
    const employee = await Employee.find({}).sort([["employeeId", -1]]);
    if (students.length > 0) {
        this.employeeId = employee[0].employeeId + 1;
    }
    next();
});


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
