const mongoose = require("mongoose");
const dotenv = require("dotenv");
const createDefaulties = require('./utils/createDefaulties')
const studentCharge = require('./models/studentChargeModel')
const Class = require('./models/classModel')
const createTransactionFn = require('./controllers/functions/createTransactionFn')
dotenv.config({ path: "./config.env" });

const app = require("./app");
const DB = process.env.DATABASE_LOCAL;

async function chargeFeeToStudent() {
  const studentCharges = await studentCharge.findOne({ name: "monthlyFee" });

  if (studentCharges) {

    const todayDate = new Date();

    if (studentCharges.nextDate <= todayDate) {
      console.log("has to charge")
      const classes = await Class.find();
      if (classes.length > 0) {
        for (let i = 0; i < classes.length; i++) {
          const _class = classes[i];
          const students = _class.students;
          const fee = _class.fee;
          if (students.length > 0) {
            for (let index = 0; index < students.length; index++) {
              const studentId = students[index];

              const transaction = await createTransactionFn({
                description: studentCharges.description,
                date: studentCharge.nextDate,
                charge: fee,
                refrenceId: studentId
              });
            
            }
          }
        }
        const today = new Date();
        today.setHours(24, 0, 0, 0);
        today.setMonth(today.getMonth() + 1, 1)
        studentCharges.nextDate = today
        await studentCharges.save();
      }

    }
  }
}

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successful!");
    createDefaulties();
    chargeFeeToStudent();
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
