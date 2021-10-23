const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://userone:userone@myfiles.r6cjl.mongodb.net/libraryApp?retryWrites=true&w=majority"
);
const signupData = require("./src/model/signupData");

const adminNav = [
  { link: "/admin/books", name: "Books" },
  { link: "/addBooks", name: "Add Books" },
  { link: "/admin/authors", name: "Authors" },
  { link: "/addAuthors", name: "Add Authors" },
  { link: "/", name: "Logout" },
];

const nav = [
  { link: "/books", name: "Books" },
  { link: "/authors", name: "Authors" },
  { link: "/", name: "Logout" },
];

const signupRouter = require("./src/routes/signupRoute")();
const homeRouter = require("./src/routes/homeRoute")(nav);
const bookRouter = require("./src/routes/bookRoutes")(nav);
const authRouter = require("./src/routes/authorRoute")(nav);
const addBooksRouter = require("./src/routes/addBooks")(adminNav);
const addAuthorRouter = require("./src/routes/addAuthors")(adminNav);
const adminRouter = require("./src/routes/adminRoute")(adminNav);
// function navbar(nav, user) {
//   const signupRouter = require("./src/routes/signupRoute")();
//   const homeRouter = require("./src/routes/homeRoute")(nav);
//   const bookRouter = require("./src/routes/bookRoutes")(nav);
//   const authRouter = require("./src/routes/authorRoute")(nav);

//   app.use("/signup", signupRouter);
//   app.use("/home", homeRouter);
//   app.use("/books", bookRouter);
//   app.use("/authors", authRouter);

//   if (user == "admin") {
//     const addBooksRouter = require("./src/routes/addBooks")(nav);
//     const addAuthorRouter = require("./src/routes/addAuthors")(nav);

//     app.use("/addBooks", addBooksRouter);
//     app.use("/addAuthors", addAuthorRouter);
//   }
// }

app.use("/signup", signupRouter);
app.use("/home", homeRouter);
app.use("/books", bookRouter);
app.use("/authors", authRouter);
app.use("/addBooks", addBooksRouter);
app.use("/addAuthors", addAuthorRouter);
app.use("/admin", adminRouter);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/images", express.static(__dirname + "public/images"));
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("signin", { link: "/signup" });
});

app.post("/add", (req, res) => {
  var item = {
    userName: req.body.username,
    password: req.body.password,
  };
  // var nav = [];

  // if (item.userName == "admin") {
  //   nav = [
  //     { link: "/books", name: "Books" },
  //     { link: "/addBooks", name: "Add Books" },
  //     { link: "/authors", name: "Authors" },
  //     { link: "/addAuthors", name: "Add Authors" },
  //     { link: "/", name: "Logout" },
  //   ];
  // } else {
  //   nav = [
  //     { link: "/books", name: "Books" },
  //     { link: "/authors", name: "Authors" },
  //     { link: "/", name: "Logout" },
  //   ];
  // }

  // navbar(nav, item.userName);

  signupData.findOne(
    { userName: item.userName, password: item.password },
    (err, user) => {
      if (err) console.log(err);
      else {
        if (user === null) {
          console.log("invalid credentials");
        } else if (user.userName == "admin") {
          res.redirect("/admin");
        } else {
          console.log("login successful");
          res.redirect("/home");
        }
      }
    }
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on PORT:3000");
});
