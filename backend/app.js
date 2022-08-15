const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const app = express();
const vaultHandler = require("./router/vaultRoute");
const userHandler = require("./router/userRoute");
const connectDB = require("./helpers/connectDB");

// enable dotenv
dotenv.config();

app.use(cors());
app.use(express.json());

// routes
app.use("/vault", vaultHandler);
app.use("/user", userHandler);

//connect database for run app test suites
connectDB();

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

const __absolutePath = path.resolve();
const __normalizePath = path.normalize(path.join(__absolutePath, "/.."));

// console.log(path.join(__normalizePath, "/frontend/build"));
// console.log(path.resolve(__normalizePath, "frontend", "build", "index.html"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__normalizePath, "/frontend/build")));
  app.get("*", (req, res) => {
    return res.sendFile(
      path.resolve(__normalizePath, "frontend", "build", "index.html")
    );
  });
} else {
  app.use("/", (req, res) =>
    res.status(200).json({
      message: "Hello word",
    })
  );
}

module.exports = app;