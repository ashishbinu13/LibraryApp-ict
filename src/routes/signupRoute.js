const express = require("express");

const signupData = require("../model/signupData");

const signupRoute = express.Router();

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://userone:userone@myfiles.r6cjl.mongodb.net/libraryApp?retryWrites=true&w=majority"
);

function signup() {
  signupRoute.get("/", (req, res) => {
    res.render("signup");
  });

  signupRoute.post("/add", (req, res) => {
    var item = {
      firstName: req.body.fname,
      lastName: req.body.lname,
      userName: req.body.uname,
      email: req.body.email,
      mobile: req.body.mob,
      password: req.body.password,
    };

    signupData.findOne({ userName: item.userName }, (err, user) => {
      if (err) console.log(err);
      else {
        if (user !== null) {
          console.log("username already taken");
        } else {
          var sign = signupData(item);
          sign.save();
          res.redirect("/");
        }
      }
    });
  });

  return signupRoute;
}

module.exports = signup;
