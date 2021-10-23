const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/library");
const signupData = require("./src/model/signupData");

function navbar(nav, user) {
  console.log(user);
  console.log(nav);

  const signupRouter = require("./src/routes/signupRoute")();
  const homeRouter = require("./src/routes/homeRoute")(nav);
  const bookRouter = require("./src/routes/bookRoutes")(nav);
  const authRouter = require("./src/routes/authorRoute")(nav);

  app.use("/signup", signupRouter);
  app.use("/home", homeRouter);
  app.use("/books", bookRouter);
  app.use("/authors", authRouter);

  if (user == "admin") {
    const addBooksRouter = require("./src/routes/addBooks")(nav);
    const addAuthorRouter = require("./src/routes/addAuthors")(nav);

    app.use("/addBooks", addBooksRouter);
    app.use("/addAuthors", addAuthorRouter);
  }
}

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
  var nav = [];

  if (item.userName == "admin") {
    console.log("admin");
    nav = [
      { link: "/books", name: "Books" },
      { link: "/addBooks", name: "Add Books" },
      { link: "/authors", name: "Authors" },
      { link: "/addAuthors", name: "Add Authors" },
      { link: "/", name: "Logout" },
    ];
  } else {
    console.log("user");

    nav = [
      { link: "/books", name: "Books" },
      { link: "/authors", name: "Authors" },
      { link: "/", name: "Logout" },
    ];
  }

  navbar(nav, item.userName);

  signupData.findOne(
    { userName: item.userName, password: item.password },
    (err, user) => {
      if (err) console.log(err);
      else {
        if (user === null) {
          console.log("invalid credentials");
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
