const express = require("express");

const addBooksRouter = express.Router();

function addBooks(nav) {
  addBooksRouter.get("/", (req, res) => {
    res.render("addBooks", {
      nav,
      title: "Library",
    });
  });

  return addBooksRouter;
}

module.exports = addBooks;
