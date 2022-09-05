const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL || "http://localhost/db/vaults";

const connectDB = () => {
  // connect mongoDB
  mongoose
    .connect(DB_URL)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
