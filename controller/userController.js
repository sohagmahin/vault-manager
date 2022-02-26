const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = require("../model/userSchema");
const User = new mongoose.model("User", userSchema);
const { createHash, compareHash } = require("../helpers/dataEncryption");

// GET ALL USER
const getAllUser = async (req, res) => {
  try {
    const data = await User.find()
      .select({
        password: 0,
        __v: 0,
      })
      .populate("credentials");
    res.status(200).json({
      data,
      message: "success",
    });
  } catch {
    res.status(500).json({
      message: "failed",
    });
  }
};

// GET SINGLE USER
const getUser = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params.id })
      .select({
        password: 0,
        __v: 0,
      })
      .populate("credentials");
    res.status(200).json({
      data,
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
    // const user = new User(req.body);
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const isValidPassword = await compareHash(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        // Generate token
        const token = await jwt.sign(
          {
            username: user.username,
            userId: user._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          access_token: token,
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
    const userResult = await User.find({ username: req.body.username });
    if (userResult.length > 0) {
      res.status(401).json({
        message: "Username already exist!",
      });
      return;
    }

    // encrypt the password
    const hassedPassword = await createHash(req.body.password);
    const user = new User({
      ...req.body,
      password: hassedPassword,
    });

    await user.save();
    res.status(200).json({
      message: "Signup success",
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: "Signup failed",
    });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  const updateUser = { ...req.body };
  if (req.body.password) {
    // encrypt the password
    const hassedPassword = await createHash(req.body.password);
    updateUser.password = hassedPassword;
  }
  try {
    const data = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updateUser },
      { new: true }
    ).select({
      password: 0,
      __v: 0,
    });
    res.status(200).json({
      data,
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
    const data = await User.findByIdAndDelete({ _id: req.params.id }).select({
      password: 0,
      __v: 0,
    });
    if (data !== null) {
      res.status(200).json({
        data,
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
