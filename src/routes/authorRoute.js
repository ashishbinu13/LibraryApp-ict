const express = require("express");

const authorRoute = express.Router();

const authData = require("../model/authData");

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

function auth(nav) {
  // var authors = [
  //   {
  //     name: "J. K. Rowling",
  //     country: "Britain",
  //     language: "English",
  //     timeline: "31 July 1965 *",
  //     img: "jkRowling.jpg",
  //   },
  //   {
  //     name: "J. M. Barrie",
  //     country: "Scotland",
  //     language: "English",
  //     timeline: "9 May 1860 to 19 June 1937",
  //     img: "jmBarrie.jpg",
  //   },
  //   {
  //     name: "Arthur Conan Doyle",
  //     country: "Britain",
  //     language: "English",
  //     timeline: "22 May 1859 to 7 July 1930",
  //     img: "doyle.jpg",
  //   },
  // ];

  authorRoute.get("/", (req, res) => {
    authData.find().then((authors) => {
      res.render("authors", {
        nav,
        title: "Authors",
        authors,
      });
    });
  });

  authorRoute.get("/:id", (req, res) => {
    const id = req.params.id;
    authData.findOne({ _id: id }).then((author) => {
      res.render("author", {
        nav,
        title: "Authors",
        author,
      });
    });
  });

  authorRoute.get("/:id/update", (req, res) => {
    var id = req.params.id;
    authData.findOne({ _id: id }).then((auth) => {
      res.render("authUpdate", {
        nav,
        title: "Library",
        auth,
      });
    });
  });

  authorRoute.post("/:id/update/add", upload.single("image"), (req, res) => {
    var id = req.params.id;
    var item = {
      author: req.body.author,
      country: req.body.country,
      language: req.body.language,
      period: req.body.period,
      image: req.file.filename,
    };

    authData.findOneAndUpdate({ _id: id }, item, null, (err, auth) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Original Auth : ", auth);
      }
    });
    res.redirect("/authors");
  });

  authorRoute.get("/:id/delete", (req, res) => {
    var id = req.params.id;
    authData.findByIdAndDelete({ _id: id }, (err, auth) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted Author : ", auth);
      }
    });
    res.redirect("/authors");
  });

  return authorRoute;
}

module.exports = auth;
