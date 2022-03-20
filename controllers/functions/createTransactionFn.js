const Transaction = require('../../models/transactionModel')
const Student = require('../../models/studentModel');

async function createTransactionFn(transaction) {
    const student = await Student.findById(transaction.refrenceId);
    // console.log(transaction)
    if (transaction.charge) {
        console.log("Charge Transaction")
        student.credit = student.credit + transaction.charge;
    } else if (transaction.receipt) {
        console.log("Payment Transaction")
        student.debit = student.debit + transaction.receipt;
    }
    const createdTransaction = await Transaction.create({ ...transaction, balance: student.balance });
    await student.save();
    return createdTransaction;
}

module.exports = createTransactionFn;