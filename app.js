const express = require("express");

const nav = [
  { link: "/books", name: "Books" },
  { link: "/authors", name: "Authors" },
];

const app = express();

const bookRouter = require("./src/routes/bookRoutes")(nav);

// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.render("index", {
    nav,
    title: "Library",
  });
});

app.listen(3000, () => {
  console.log("Server started on PORT:3000");
});
