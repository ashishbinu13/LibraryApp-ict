const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://userone:userone@myfiles.r6cjl.mongodb.net/libraryApp?retryWrites=true&w=majority"
);

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  titile: String,
  author: String,
  genre: String,
  image: String,
});

var bookData = mongoose.model("bookdata", bookSchema);

module.exports = bookData;