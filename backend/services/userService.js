const mongoose = require("mongoose");
const userSchema = require("../model/userSchema");
const User = new mongoose.model("User", userSchema);

//get all user
const getAllUser = async () => {
  const users = await User.find()
    .select({
      password: 0,
      __v: 0,
    })
    .populate("credentials");
  return users;
};

//get single user by _id
const getUserByID = async (userId) => {
  const user = await User.findOne({ _id: userId })
    .select({
      password: 0,
      __v: 0,
    })
    .populate("credentials");
  return user;
};

//get single user by username
const getUserByUsername = async (username) => {
  const user = await User.findOne({ username: username });
  return user;
};

//save single user
const saveUser = async (userObject) => {
  const user = new User({ ...userObject });
  await user.save();
};

//update single user by id
const updateUserByID = async (userID, userObject) => {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: userID },
    { $set: userObject },
    { new: true }
  ).select({
    password: 0,
    __v: 0,
  });
  return updatedUser;
};

//delete single user by id
const deleteUserByID = async (userID) => {
  const deletedUser = await User.findByIdAndDelete({
    _id: userID,
  }).select({
    password: 0,
    __v: 0,
  });
  return deletedUser;
};

module.exports = {
  getAllUser,
  getUserByID,
  getUserByUsername,
  saveUser,
  updateUserByID,
  deleteUserByID,
};
