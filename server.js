const mongoose = require("mongoose");
const dotenv = require("dotenv");
const createDefaulties = require('./utils/createDefaulties')

dotenv.config({ path: "./config.env" });

const app = require("./app");

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successful!");
    createDefaulties();
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
