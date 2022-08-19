const mongoose = require("mongoose");

const connectDB = () => {
  // connect mongoDB
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
