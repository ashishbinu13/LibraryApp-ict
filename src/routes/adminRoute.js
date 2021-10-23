const express = require("express");
const adminRouter = express.Router();

const bookData = require("../model/bookData");
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

function admin(nav) {
  adminRouter.get("/", (req, res) => {
    res.render("index", {
      nav,
      title: "Library",
    });
  });

  adminRouter.get("/books", (req, res) => {
    bookData.find().then((books) => {
      res.render("adminBooks", {
        nav,
        title: "Library",
        books,
      });
    });
  });

  adminRouter.get("/books/:id", (req, res) => {
    var id = req.params.id;

    bookData.findOne({ _id: id }).then((book) => {
      res.render("adminBook", {
        nav,
        title: "Library",
        book,
      });
    });
  });

  adminRouter.get("/books/:id/update", (req, res) => {
    var id = req.params.id;
    bookData.findOne({ _id: id }).then((book) => {
      res.render("bookUpdate", {
        nav,
        title: "Library",
        book,
      });
    });
  });

  adminRouter.post(
    "/books/:id/update/add",
    upload.single("image"),
    (req, res) => {
      var id = req.params.id;
      var item = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        image: req.file.filename,
      };

      bookData.findOneAndUpdate({ _id: id }, item, null, (err, book) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Original Doc : ", book);
        }
      });
      res.redirect("/admin/books");
    }
  );

  adminRouter.get("/books/:id/delete", (req, res) => {
    var id = req.params.id;
    bookData.findByIdAndDelete({ _id: id }, (err, book) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted Book : ", book);
      }
    });
    res.redirect("/admin/books");
  });

  // -------------------

  adminRouter.get("/authors", (req, res) => {
    authData.find().then((authors) => {
      res.render("adminAuthors", {
        nav,
        title: "Authors",
        authors,
      });
    });
  });

  adminRouter.get("/authors/:id", (req, res) => {
    const id = req.params.id;
    authData.findOne({ _id: id }).then((author) => {
      res.render("adminAuthor", {
        nav,
        title: "Authors",
        author,
      });
    });
  });

  adminRouter.get("/authors/:id/update", (req, res) => {
    var id = req.params.id;
    authData.findOne({ _id: id }).then((auth) => {
      res.render("authUpdate", {
        nav,
        title: "Library",
        auth,
      });
    });
  });

  adminRouter.post(
    "/authors/:id/update/add",
    upload.single("image"),
    (req, res) => {
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
      res.redirect("/admin/authors");
    }
  );

  adminRouter.get("/:id/delete", (req, res) => {
    var id = req.params.id;
    authData.findByIdAndDelete({ _id: id }, (err, auth) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted Author : ", auth);
      }
    });
    res.redirect("/admin/authors");
  });

  return adminRouter;
}

module.exports = admin;
