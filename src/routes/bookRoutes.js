const express = require("express");

const bookRouter = express.Router();

function booksR(nav) {
  var books = [
    {
      title: "Harry Potter",
      author: "J. K. Rowling",
      genre: "Fantasy",
      img: "harry-potter.jpg",
    },
    {
      title: "Peter Pan",
      author: "J. M. Barrie",
      genre: "Fantasy",
      img: "peter-pan.jpg",
    },
    {
      title: "Sherlock Holmes",
      author: "Arthur Conan Doyle",
      genre: "Crime",
      img: "sherlock.jpg",
    },
  ];

  bookRouter.get("/", (req, res) => {
    res.render("books", {
      nav,
      title: "Library",
      books,
    });
  });

  bookRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    res.render("book", {
      nav,
      title: "Library",
      book: books[id],
    });
  });

  return bookRouter;
}

module.exports = booksR;
