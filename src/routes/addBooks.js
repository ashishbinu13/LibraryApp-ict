const express = require("express");

const bookData = require("../model/bookData");

const addBooksRouter = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "imgae/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: fileFilter,
});

function addBooks(nav) {
  addBooksRouter.get("/", (req, res) => {
    res.render("addBooks", {
      nav,
      title: "Library",
    });
  });

  addBooksRouter.post("/add", upload.single("image"), (req, res) => {
    var item = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      image: req.file.filename,
    };

    var book = bookData(item);
    book.save();
    res.redirect("/books");
  });

  return addBooksRouter;
}

module.exports = addBooks;
