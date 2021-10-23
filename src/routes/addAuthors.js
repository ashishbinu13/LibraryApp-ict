const express = require("express");

const authData = require("../model/authData");

const addAuthorRouter = express.Router();

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

function addAuthor(nav) {
  addAuthorRouter.get("/", (req, res) => {
    res.render("addAuthors", {
      nav,
      title: "Library",
    });
  });

  addAuthorRouter.post("/add", upload.single("image"), (req, res) => {
    var item = {
      author: req.body.author,
      country: req.body.country,
      language: req.body.language,
      period: req.body.period,
      image: req.file.filename,
    };

    var auth = authData(item);
    auth.save();
    res.redirect("/authors");
  });

  return addAuthorRouter;
}

module.exports = addAuthor;
