const mongoose = require("mongoose");
const ContactSchema = require("../schema/ContactSchema");

const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } }
const studentSchema = mongoose.Schema({
  ...ContactSchema,
  studentId: {
    type: Number,
    default: 1,
    unique: true
  },
  regNo: {
    type: Number,
    default: 1,
    unique: true
  },
  reg_date: {
    type: Date,
    default: new Date(),
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    // default: null,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  discount: {
    type: Number,
    default: 0
  },
  parent: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  }
}, opts)

// Create a virtual property `fullName` that's computed from `first_name`, `middle_name` and `last_name`.
studentSchema.virtual('fullName').get(function () {
  return `${this.first_name} ${this.middle_name} ${this.last_name}`;
});


// Create a virtual property `fullName` that's computed from `first_name`, `middle_name` and `last_name`.
studentSchema.virtual('monthlyFee').get(function () {
  return this.class ? this.class.fee : null;
});

// create a virtual property `credit` that's computed from `student charge transactions` in the transaction document
studentSchema.virtual('debit').get(function () {
  const debitTransactions = this.transactions.filter((transaction) => transaction.debit);
  let debit = 0;
  debitTransactions.forEach(transaction => {
    debit += transaction.debit;
  });
  return debit;
});

// create a virtual property `debit` that's computed from `student receipt transactions` in the transaction document
studentSchema.virtual('credit').get(function () {
  const creditTransactions = this.transactions.filter((transaction) => transaction.credit != null);
  let credit = 0;
  creditTransactions.forEach(transaction => {
    credit += transaction.credit;
  });
  return credit;
});

// create a virtual property `balance` that's computed from `credit` adn `debit` Accounts
studentSchema.virtual('balance').get(function () {
  return this.debit - this.credit;
});


// Create a virtual property `className` that's computed from `class name`.
studentSchema.virtual('className').get(function () {
  if (this.class) {
    return this.class.name;
  } else {
    return 'No Class'
  }
});


studentSchema.pre("validate", async function (next) {
  //sorting students
  const students = await Student.find({}).sort([["studentId", -1]]);

  if (students.length > 0) {
    this.studentId = students[0].studentId + 1;
    this.regNo = students[0].regNo + 1;
  }

  next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
