const mongoose = require("mongoose");

const inoviceSchema = mongoose.Schema({
    inoviceNumber: {
        type: Number,
        default: 1,
        unique: true
    },
    InvoiceDate: {
        type: Date,
        default: new Date(),
    },
    invoiceAmount: {
        type: Number,
        required: true
    },
    Number: {
        type: String
    },
    payer: {
        type: String,
        required: true,
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
        }
    ],

});

inoviceSchema.pre("save", async function (next) {
    //sorting teachers
    const inovices = await Invoice.find({}).sort([["inoviceNumber", -1]]);

    if (inovices.length > 0) {
        this.inoviceNumber = inovices[0].inoviceNumber + 1;
    }
    next();
});


const Invoice = mongoose.model('Invoice', inoviceSchema);

module.exports = Invoice;
