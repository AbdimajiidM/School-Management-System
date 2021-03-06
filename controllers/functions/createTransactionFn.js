const Transaction = require('../../models/transactionModel')
const Student = require('../../models/studentModel');
const appError = require("../../utils/appError")
const mongoose = require("mongoose")

async function createTransactionFn(transaction, req, res, next) {

    try {
        // get student with transaction refrece ID
        const student = await Student.findById(transaction.refrenceId);
        if (!student) return next(appError('No Student found with that refrence ID', 400));

        // create transaction with student current balance
        const createdTransaction = await Transaction.create({ ...transaction, balance: student.balance });

        // add transaction id as refrence in the student document
        student.transactions.push(createdTransaction._id);
        // save the student with updated credit or debit account
        await student.save();

        // return created transaction
        return {
            statusCode: 200,
            status: "success",
            message: "transactionn sucessfully created",
            treansaction: createdTransaction
        };
    } catch (error) {
        // return error response
        return {
            statusCode: 400,
            status: "failed",
            message: "transaction failed to create!",
            error
        };
    }
}

module.exports = createTransactionFn;