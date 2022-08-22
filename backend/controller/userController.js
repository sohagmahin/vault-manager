const {
  createHash,
  compareHash,
  generateToken,
} = require("../helpers/dataEncryption");
const {
  getUsers,
  getUsersByUsername,
  getUserByUsername,
  getUserByID,
  saveUser,
  updateUserByID,
  deleteUserByID,
} = require("../services/userService");

// GET ALL USER
const getAllUser = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({
      data: users,
      message: "success",
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: "failed",
    });
  }
};

// GET SINGLE USER
const getUser = async (req, res) => {
  try {
    const user = await getUserByID(req.params.id);
    res.status(200).json({
      data: user,
      message: "success",
    });
  } catch {
    res.status(500).json({
      message: "failed",
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    // const user = await User.findOne({ username: req.body.username });
    const user = await getUserByUsername(req.body.username);
    if (user) {
      const isValidPassword = await compareHash(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        const token = await generateToken(user);
        res.status(200).json({
          access_token: token,
          id: user._id,
          message: "Login successful!",
        });
      } else {
        res.status(401).json({
          message: "Authentication failed",
        });
      }
    } else {
      res.status(401).json({
        message: "Authentication failed",
      });
    }
  } catch {
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};

// SIGNUP

const signup = async (req, res) => {
  try {
    // look up the user collection to see user have already exist or not.
    const userList = await getUsersByUsername(req.body.username);
    if (userList.length > 0) {
      return res.status(200).json({
        message: "Username already exist!",
      });
    }

    // encrypt the password
    const hassedPassword = await createHash(req.body.password);
    const userObject = {
      ...req.body,
      password: hassedPassword,
    };
    await saveUser(userObject);

    return res.status(201).json({
      message: "Signup success",
    });
  } catch (err) {
    console.log("inside controller");
    console.log(err);
    res.status(500).json({
      message: "Signup failed",
    });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  const userObject = { ...req.body };
  if (req.body.password) {
    // encrypt the password
    const hassedPassword = await createHash(req.body.password);
    userObject.password = hassedPassword;
  }
  try {
    const updatedUser = await updateUserByID(req.params.id, userObject);
    res.status(200).json({
      data: updatedUser,
      message: "update success",
    });
  } catch (err) {
    res.status(500).json({
      message: "update failed!",
    });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user = await deleteUserByID(req.params.id);
    if (user !== null) {
      res.status(200).json({
        data: user,
        message: "delete success",
      });
    } else {
      res.status(500).json({
        message: "delete failed!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "delete failed!",
    });
  }
};

module.exports = {
  getAllUser,
  getUser,
  login,
  signup,
  deleteUser,
  updateUser,
};
