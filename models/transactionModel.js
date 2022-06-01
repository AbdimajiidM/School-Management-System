const mongoose = require('mongoose');


const transactionSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    debit: {
        type: Number,
    },
    credit: {
        type: Number,
    },
    date: {
        type: Date,
        default: new Date(),
    },
    balance: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: Number,
        default: 1,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        lowercase: true,
        default: 'open'
    },
    transactionType: {
        type: String,
        lowercase: true,
    }
});

transactionSchema.pre("save", async function (next) {
    //sorting teachers
    const transactions = await Transaction.find({}).sort([["transactionId", -1]]);

    if (transactions.length > 0) {
        this.transactionId = transactions[0].transactionId + 1;
    }
    next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;