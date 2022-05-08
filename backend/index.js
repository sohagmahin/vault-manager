const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

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

// ------deployment------
const __absolutePath = path.resolve();
// console.log(__dirname);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__absolutePath, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__absolutePath, "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// ------deployment-----

const PORT = process.env.PORT || 5000;
// start server
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.PORT} port`);
});
