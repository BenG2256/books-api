require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

//require books controller
const booksController = require("./controllers/books");

//middleware
app.use(express.json());
app.use("/books", booksController);
app.use(cors());

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {});

//routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT);
