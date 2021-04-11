const express = require("express");
const bodyParser = require("body-parser");

const dotenv = require("dotenv").config();
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/public/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));



app.get("/", (req, res) => {
  res.render("index", );
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});
