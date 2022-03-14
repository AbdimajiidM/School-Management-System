const Transaction = require('../../models/transactionModel')
const Student = require('../../models/studentModel');

async function createTransactionFn(transaction) {
    const student = await Student.findById(transaction.refrenceId);

    if (transaction.charge) {
        student.credit = student.credit + transaction.charge;
    } else if (transaction.receipt) {
        student.debit = student.debit + transaction.receipt;
    }
    const createdTransaction = await Transaction.create({ ...transaction, balance: student.balance });
    await student.save();
    return createdTransaction;
}

module.exports = createTransactionFn;