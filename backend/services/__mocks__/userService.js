const mongoose = require("mongoose");
const userSchema = require("../../model/userSchema");
const User = new mongoose.model("User", userSchema);

//mock user list
const mockedUser = [
  {
    _id: "62ea48060e07f7fc6c119345",
    name: "sohag",
    username: "sohagmahin",
    credentials: [],
  },
  {
    _id: "62ea545f539f5aeca7bd079f",
    name: "test user",
    username: "test",
    credentials: [],
  },
];

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
  const user = { ...mockedUser[0] };
  return user;
};

//get users by id
const getUsersByUsername = async (username) => {
  const users = mockedUser.filter((user) => user.username == username);
  return users;
};

//get single user by username
const getUserByUsername = async (username) => {
  const user = await User.findOne({ username: username });
  return user;
};

//save single user
const saveUser = async (userObject) => {
  const user = new User({ ...userObject });
  mockedUser.push(user);
  // await user.save();
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
  getUsersByUsername,
  getUserByUsername,
  saveUser,
  updateUserByID,
  deleteUserByID,
};
