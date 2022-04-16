const Transaction = require('../../models/transactionModel')
const Student = require('../../models/studentModel');
const mongoose = require("mongoose")

async function createTransactionFn(transaction, req, res, next) {

    const session = await mongoose.startSession();
    try {
        session.startTransaction()

        // get student with transaction refrece ID
        const student = await Student.findById(transaction.refrenceId);

        if (transaction.charge) {
            // update debit account in the student if the transaction is charge transaction
            student.debit = student.debit + transaction.charge;
        } else if (transaction.receipt) {
            // update credit account in the student if the transaction is receipt transaction
            student.credit = student.credit + transaction.receipt;
        } else {
            return "Tranasaction must be charge Transaction or Receipt Transaction"
        }

        // create transaction with student current balance
        const createdTransaction = await Transaction.create({ ...transaction, balance: student.balance });

        // save the student with updated credit or debit account
        await student.save();

        // commit the transaction
        await session.commitTransaction();

        // return created transaction
        return {
            statusCode: 200,
            status: "success",
            message: "transactionn sucessfully created",
            treansaction: createdTransaction
        };
    } catch (error) {
        await session.abortTransaction();
        return next( new AppError('Error, No Refrence Id Found for this Transaction!', 400))
        return {
            statusCode: 400,
            status: "failed",
            message: "transaction failed to create!",
            error
        };
    }
}

module.exports = createTransactionFn;