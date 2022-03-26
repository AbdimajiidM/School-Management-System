const mongoose = require("mongoose");
const dotenv = require("dotenv");
const createDefaulties = require('./utils/createDefaulties')
const chargeFeeToStudentFn = require('./utils/chargeFeeToStudent');
dotenv.config({ path: "./config.env" });

const app = require("./app");
const DB = process.env.DATABASE_LOCAL;


mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((dbs)=>{
    console.log("DB connection successful!");
    createDefaulties();
    chargeFeeToStudentFn();

  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
