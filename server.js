// import
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const createDefaulties = require('./utils/createDefaulties')
dotenv.config({ path: "./config.env" });
const app = require("./app");

// variables from enviroument variables
const port = process.env.PORT || 80;
const DB = process.env.DATABASE_LOCAL;
const user = process.env.DATABASE_USER;
const pass = process.env.DATABASE_PASSWORD;
const authSource = process.env.AUTHSOURCE;

// connect to mongdb instance with user and password
mongoose.connect(DB, {
  authSource,
  user,
  pass,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB connection successful!");
  createDefaulties();
});

// listen the server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
