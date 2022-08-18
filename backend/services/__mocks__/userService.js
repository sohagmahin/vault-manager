const User = require("../../model/userModel");

//mock user list
const mockedUser = [
  {
    _id: {
      $oid: "62fbc4487efeb465d3a2d97b",
    },
    name: "sohag",
    username: "sohagmahin",
    password: "$2b$10$0xYTgi.zFeaO2cXe1hpJ.e05W.Z7piM0zXSjEjRYQ9t.eEnq/kgJO",
    vaults: [],
    __v: 0,
  },
  {
    _id: {
      $oid: "62fd217e049e4f5bdb03ac76",
    },
    name: "test user",
    username: "testtest",
    password: "$2b$10$oSp5jHyn9XZSu7igfvzbaufBNg1MyECujx4/4ZjS.eeQvP4KHp37q",
    vaults: [],
    __v: 0,
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
  // const user = await User.findOne({ username: username });
  const user = mockedUser.find((user) => user.username === username);
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
  const user = mockedUser.find((user) => user._id.$oid === userID);
  const updatedUser = { ...user, ...userObject };
  return updatedUser;
};

//delete single user by id
const deleteUserByID = async (userID) => {
  const user = mockedUser.find((user) => user._id.$oid == userID);
  const index = mockedUser.indexOf(user);

  if (index > -1) {
    mockedUser.splice(index, 1);
  }
  return user;
};

//add new vault id in User object
const addVaultID = async (userId, vaultId) => {
  //mongoose formated id
  const newVaultID = {
    $oid: vaultId,
  };
  const user = mockedUser.find((user) => user._id.$oid == userId);
  const updatedUser = { ...user, vaults: [...user.vaults, newVaultID] };

  //find index
  const index = mockedUser.indexOf(user);
  if (index > -1) {
    mockedUser.splice(index, 1);
    mockedUser.push(updatedUser);
  }
};

module.exports = {
  getUsers,
  getUserByID,
  getUsersByUsername,
  getUserByUsername,
  saveUser,
  updateUserByID,
  deleteUserByID,
  addVaultID,
};
