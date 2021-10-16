const express = require("express");

const bookData = require("../model/bookData");

const bookRouter = express.Router();

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
    const id = req.params.id;
    bookData.findOne({ _id: id }).then((book) => {
      res.render("book", {
        nav,
        title: "Library",
        book,
      });
    });
  });

  return bookRouter;
}

module.exports = booksR;
