const express = require("express");
const homeRouter = express.Router();

function home(nav) {
  homeRouter.get("/", (req, res) => {
    res.render("index", {
      nav,
      title: "Library",
    });
  });

  return homeRouter;
}

module.exports = home;
