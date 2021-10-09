const express = require("express");

const nav = [
  { link: "/books", name: "Books" },
  { link: "/addBooks", name: "Add Books" },
  { link: "/authors", name: "Authors" },
  { link: "/addAuthors", name: "Add Authors" },
  { link: "/", name: "Logout" },
];

const app = express();

const signupRouter = require("./src/routes/signupRoute");
const homeRouter = require("./src/routes/homeRoute")(nav);
const bookRouter = require("./src/routes/bookRoutes")(nav);
const addBooksRouter = require("./src/routes/addBooks")(nav);
const authRouter = require("./src/routes/authorRoute")(nav);
const addAuthorRouter = require("./src/routes/addAuthors")(nav);

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use("/signup", signupRouter);
app.use("/home", homeRouter);
app.use("/books", bookRouter);
app.use("/addBooks", addBooksRouter);
app.use("/authors", authRouter);
app.use("/addAuthors", addAuthorRouter);

app.get("/", (req, res) => {
  res.render("signin", { link: "/signup" });
});

app.listen(3000, () => {
  console.log("Server started on PORT:3000");
});
