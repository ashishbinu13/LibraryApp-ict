const express = require("express");

const signupRoute = express.Router();

signupRoute.get("/", (req, res) => {
  res.render("signup");
});

module.exports = signupRoute;
