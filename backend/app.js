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

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return next();
});

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
