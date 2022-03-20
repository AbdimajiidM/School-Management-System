const mongoose = require("mongoose");
const nextMonth = new Date();
nextMonth.setHours(24, 0, 0, 0);
nextMonth.setMonth(nextMonth.getMonth() + 1, 1);


const chargeScheduleSchema = mongoose.Schema({
  name: {
    type: String,
    default: "monthlyFee",
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  nextDate: {
    type: Date,
    default: nextMonth
  },
  exculudedMonths: [
    {
      type: Number
    }
  ],
  startDate: {
    type: Date,
    required: () => {
      return this.name == 'monthlyFee' ? true : false;
    }
  },
  endDate: {
    type: Date,
  },
  discount: {
    type: Boolean,
    default: true,
  },
  amount: {
    type: Number,
  }
});



// Create a virtual property `startMonth` that's computed from `startDate` and `endDate`.
chargeScheduleSchema.virtual('startMonth').get(function () {
  if (this.name != 'monthlyFee') {
    return this.startDate ? this.startDate.getMonth() : '';
  }
});

// Create a virtual property `endMonth`  that's computed from `startDate` and `endDate`.
chargeScheduleSchema.virtual('endMonth').get(function () {
  if (this.name != 'monthlyFee') {
    return this.endDate ? this.endDate.getMonth() : '';
  }

});

// Create a virtual property `Months` that's computed from `startMonth` and `endMonth`.
chargeScheduleSchema.virtual('Months').get(function () {
  if (this.name != 'monthlyFee') {
    return this.endMonth - this.startMonth;
  }
});



chargeScheduleSchema.set('toJSON', {
  virtuals: true
});

const ChargeSchedule = mongoose.model("chargeschedule", chargeScheduleSchema);

module.exports = ChargeSchedule;
