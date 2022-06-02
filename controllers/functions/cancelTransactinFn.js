const Transaction = require('../../models/transactionModel')
const Student = require('../../models/studentModel');
const appError = require('../../utils/appError');

async function cancelTransactionFn(transactionId, req, res, next) {

    try {
        const transaction = await Transaction.findById(transactionId);
        const student = await Student.findById(transaction.refrenceId);

        if (!transaction) {
            return next(new appError('No Transaction Found with that!', 400))
        } else if (!student) {
            return next(new appError('Error, No Refrence Id Found for this Transaction!', 400))
        }
        if (transaction.charge) {
            student.credit = student.credit - transaction.charge;
        } else if (transaction.receipt) {
            student.debit = student.debit - transaction.receipt;
        }
        await Transaction.findByIdAndDelete(transactionId)
        await student.save();
        return {
            statusCode: 204
        };
    } catch (error) {
        return next(new appError('Failed to cancel this Transaction', 400))
    }
}

module.exports = cancelTransactionFn;