const mongoose = require("mongoose");
const vaultSchema = new mongoose.Schema({
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

const vaultModel = mongoose.model("Vault", vaultSchema);

module.exports = vaultModel;
