const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const app = express();
const vaultHandler = require("./router/vaultRoute");
const userHandler = require("./router/userRoute");
const resetPasswordRouter = require("./router/resetPassRoute");
const connectDB = require("./helpers/connectDB");

// enable dotenv
dotenv.config();

app.use(cors());
app.use(express.json());

// routes
app.use("/vault", vaultHandler);
app.use("/user", userHandler);
app.use("/password-reset", resetPasswordRouter);

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

app.use("/", (req, res) =>
  res.status(200).json({
    message: "Hello word",
  })
);

// app.all("*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT, GET,POST");
//   next();
// });

module.exports = app;
