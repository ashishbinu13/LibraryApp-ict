const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/library");

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
