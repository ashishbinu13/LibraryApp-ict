const express = require("express");

const addAuthorRouter = express.Router();

function addAuthor(nav) {
  addAuthorRouter.get("/", (req, res) => {
    res.render("addAuthors", {
      nav,
      title: "Library",
    });
  });

  return addAuthorRouter;
}

module.exports = addAuthor;
