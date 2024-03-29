const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  vaults: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Vault",
    },
  ],
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
