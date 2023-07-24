const User = require("../model/userModel");

//get all user
const getUsers = async () => {
  const users = await User.find()
    .select({
      password: 0,
      __v: 0,
    })
    .populate("vaults");

  return users;
};

//get single user by _id
const getUserByID = async (userId) => {
  const user = await User.findOne({ _id: userId })
    .select({
      password: 0,
      __v: 0,
    })
    .populate("vaults");
  return user;
};

//get users by id
const getUsersByemail = async (email) => {
  const users = await User.find({ email: email });
  return users;
};

//get single user by email
const getUserByemail = async (email) => {
  const user = await User.findOne({ email: email });
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

//add new vault id in User object
const addVaultID = async (userId, vaultId) => {
  await User.updateOne({ _id: userId }, { $push: { vaults: vaultId } });
};

module.exports = {
  getUsers,
  getUserByID,
  getUsersByemail,
  getUserByemail,
  saveUser,
  updateUserByID,
  deleteUserByID,
  addVaultID,
};
