const Invoice = require("../../models/invoiceModel");
const Transaction = require("../../models/transactionModel");

async function createInvoiceFn(transactions, payer) {

    let invoiceAmount = 0;

    for (let index in transactions) {
        var transaction = await Transaction.findById(transactions[index])
        if (transaction.receipt) {
            invoiceAmount += transaction.receipt;
        } else {
            return "Invoice are generated Only From Payment Transactions"
        }
    }

    const createdInvoice = await Invoice.create({
        payer: payer,
        transactions: transactions,
        invoiceAmount: invoiceAmount,
    });

    return createdInvoice;
}

module.exports = createInvoiceFn;