const express = require("express");

const nav = [
  { link: "/books", name: "Books" },
  { link: "/authors", name: "Authors" },
  { link: "/", name: "Logout" },
];

const app = express();

const homeRouter = require("./src/routes/homeRoute")(nav);
const bookRouter = require("./src/routes/bookRoutes")(nav);

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use("/home", homeRouter);
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.render("signin", { link: "/signup" });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.listen(3000, () => {
  console.log("Server started on PORT:3000");
});
