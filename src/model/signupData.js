const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://userone:userone@myfiles.r6cjl.mongodb.net/libraryApp?retryWrites=true&w=majority"
);

const Schema = mongoose.Schema;

const signupSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  mobile: String,
  password: String,
});

var signupData = mongoose.model("signupdata", signupSchema);

module.exports = signupData;
