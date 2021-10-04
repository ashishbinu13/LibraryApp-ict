const express = require("express");

const authorRoute = express.Router();

function auth(nav) {
  var authors = [
    {
      name: "J. K. Rowling",
      country: "Britain",
      language: "English",
      timeline: "31 July 1965 *",
      img: "jkRowling.jpg",
    },
    {
      name: "J. M. Barrie",
      country: "Scotland",
      language: "English",
      timeline: "9 May 1860 to 19 June 1937",
      img: "jmBarrie.jpg",
    },
    {
      name: "Arthur Conan Doyle",
      country: "Britain",
      language: "English",
      timeline: "22 May 1859 to 7 July 1930",
      img: "doyle.jpg",
    },
  ];

  authorRoute.get("/", (req, res) => {
    res.render("authors", {
      nav,
      title: "Authors",
      authors,
    });
  });

  authorRoute.get("/:id", (req, res) => {
    const id = req.params.id;
    res.render("author", {
      nav,
      title: authors[id].name,
      author: authors[id],
    });
  });

  return authorRoute;
}

module.exports = auth;
