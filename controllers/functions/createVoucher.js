const Voucher = require("../../models/voucherModel");
const Transaction = require("../../models/transactionModel");

async function createVoucherFn(transactions, payer) {

    let voucherAmount = 0;

    for (let index in transactions) {
        var transaction = await Transaction.findById(transactions[index])
        if (transaction.receipt) {
            voucherAmount += transaction.receipt;
        } else {
            return "Voucher are generated Only From Payment Transactions"
        }
    }

    const createdVoucher = await Voucher.create({
        payer: payer,
        transactions: transactions,
        invoiceAmount: invoiceAmount,
    });

    return createdVoucher;
}

module.exports = createVoucherFn;