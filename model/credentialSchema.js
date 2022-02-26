const mongoose = require("mongoose");
const credentialSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  domain: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = credentialSchema;
