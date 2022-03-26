const mongoose = require("mongoose");

const voucherSchema = mongoose.Schema({
    voucherNumber: {
        type: Number,
        default: 1,
        unique: true
    },
    voucherDate: {
        type: Date,
        default: new Date(),
    },
    voucherAmount: {
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

voucherSchema.pre("save", async function (next) {
    //sorting teachers
    const vouchers = await Voucher.find({}).sort([["voucherNumber", -1]]);

    if (vouchers.length > 0) {
        this.voucherNumber = vouchers[0].voucherNumber + 1;
    }
    next();
});


const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
