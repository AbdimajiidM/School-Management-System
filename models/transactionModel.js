const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    charge: {
        type: Number,
    },
    receipt: {
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
    transactionNumber : {
        type: Number,
        default: 1,
    },
    refrenceId: {
        type: mongoose.Schema.Types.ObjectId,
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