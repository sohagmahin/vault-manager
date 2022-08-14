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
const getUsers = async () => {
  return mockedUser;
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
  const user = mockedUser.find((user) => user._id === userID);
  const updatedUser = { ...user, ...userObject };
  return updatedUser;
};

//delete single user by id
const deleteUserByID = async (userID) => {
  const user = mockedUser.find((user) => user._id == userID);
  const index = mockedUser.indexOf(user);

  if (index > -1) {
    mockedUser.splice(index, 1);
  }
  return user;
};

module.exports = {
  getUsers,
  getUserByID,
  getUsersByUsername,
  getUserByUsername,
  saveUser,
  updateUserByID,
  deleteUserByID,
};
