const mongoose = require('mongoose');

function chargeCheck() {
    return !this.receipt;
};

function receiptCheck() {
    return !this.charge;
};

const transactionSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    charge: {
        type: Number,
        required: chargeCheck,
    },
    receipt: {
        type: Number,
        required: receiptCheck,
    },
    date: {
        type: Date,
        default: new Date(),
    },
    balance: {
        type: Number,
        required: true,
    },
    transactionNumber: {
        type: Number,
        default: 1,
    },
    refrenceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    discount: Number,
    discountReason: {
        type: String,
        required: function () {
            return this.discount;
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: function () {
            return this.receipt;
        }
    }
});

transactionSchema.pre("save", async function (next) {
    //sorting teachers
    const transactions = await Transaction.find({}).sort([["transactionNumber", -1]]);

    if (transactions.length > 0) {
        this.transactionNumber = transactions[0].transactionNumber + 1;
    }
    next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;