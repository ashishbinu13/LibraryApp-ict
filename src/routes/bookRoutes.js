const express = require("express");

const bookData = require("../model/bookData");

const bookRouter = express.Router();

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

function booksR(nav) {
  // var books = [
  //   {
  //     title: "Harry Potter",
  //     author: "J. K. Rowling",
  //     genre: "Fantasy",
  //     img: "harry-potter.jpg",
  //   },
  //   {
  //     title: "Peter Pan",
  //     author: "J. M. Barrie",
  //     genre: "Fantasy",
  //     img: "peter-pan.jpg",
  //   },
  //   {
  //     title: "Sherlock Holmes",
  //     author: "Arthur Conan Doyle",
  //     genre: "Crime",
  //     img: "sherlock.jpg",
  //   },
  // ];

  bookRouter.get("/", (req, res) => {
    bookData.find().then((books) => {
      res.render("books", {
        nav,
        title: "Library",
        books,
      });
    });
  });

  bookRouter.get("/:id", (req, res) => {
    var id = req.params.id;

    bookData.findOne({ _id: id }).then((book) => {
      res.render("book", {
        nav,
        title: "Library",
        book,
      });
    });
  });

  bookRouter.get("/:id/update", (req, res) => {
    var id = req.params.id;
    bookData.findOne({ _id: id }).then((book) => {
      res.render("bookUpdate", {
        nav,
        title: "Library",
        book,
      });
    });
  });

  bookRouter.post("/:id/update/add", upload.single("image"), (req, res) => {
    var id = req.params.id;
    var item = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      image: req.file.filename,
    };

    bookData.findOneAndUpdate({ _id: id }, item, null, (err, book) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Original Doc : ", book);
      }
    });
    res.redirect("/books");
  });

  bookRouter.get("/:id/delete", (req, res) => {
    var id = req.params.id;
    bookData.findByIdAndDelete({ _id: id }, (err, book) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted Book : ", book);
      }
    });
    res.redirect("/books");
  });

  return bookRouter;
}

module.exports = booksR;
