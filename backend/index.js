const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const passmanagerHandler = require("./router/passManagerRoute");
const userHandler = require("./router/userRoute");

// enable dotenv
dotenv.config();

app.use(cors());
app.use(express.json());

// connect mongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log(err));

// routes
app.use("/passmanager", passmanagerHandler);
app.use("/user", userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);
app.use("/", (req, res) => {
  res.status(200).json({
    message: "Hello word",
  });
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} port`);
});
