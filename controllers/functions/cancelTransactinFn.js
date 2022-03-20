const Transaction = require('../../models/transactionModel')
const Student = require('../../models/studentModel');


async function cancelTransactionFn(transactionId) {
   
    const transaction = await Transaction.findById(transactionId);

    const student = await Student.findById(transaction.refrenceId);

    if(!transaction){
        return "No Transaction Found!"
    } else if(!student){
        return "Error, No Refrence Id Found for this Transaction"
    }
    if (transaction.charge) {
        student.credit = student.credit - transaction.charge;
    } else if (transaction.receipt) {
        student.debit = student.debit - transaction.receipt;
    }
    await Transaction.findByIdAndDelete(transactionId)
    await student.save();
    return null;
}

module.exports = cancelTransactionFn;