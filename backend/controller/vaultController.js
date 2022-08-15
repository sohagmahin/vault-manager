const express = require("express");
const mongoose = require("mongoose");

const { encryptData, decryptData } = require("../helpers/dataEncryption");
const vaultSchema = require("../model/vaultSchema");
const Credential = mongoose.model("Credential", vaultSchema);

const userSchema = require("../model/userSchema");
const User = mongoose.model("User", userSchema);

// GET all passmanager data
const getAllVault = async (req, res) => {
  try {
    // Use Populate
    // const data = await Credential.find().populate(
    //   "user",
    //   "-__v -password -credentials"
    // );

    // Use Aggregate
    const data = await Credential.aggregate([
      {
        $match: { user: mongoose.Types.ObjectId(req.userId) },
      },
    ]);

    data.map((crd) => {
      crd.username = decryptData(crd.username);
      crd.password = decryptData(crd.password);
      return crd;
    });
    res.status(200).json({
      data,
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
  // res.status(200).json({
  //     message: 'This is get'
  // })
};

// GET SINGLE CREDENTIAL
const getVault = async (req, res) => {
  try {
    const data = await Credential.findOne({ _id: req.params.id }).populate(
      "user",
      "-__v -password"
    );

    if (!data) {
      return res
        .status(400)
        .json({ message: "something went wrong. try again!" });
    }

    data.username = decryptData(data.username);
    data.password = decryptData(data.password);
    res.status(200).json({
      data,
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
  // res.status(200).json({
  //     message: 'This is get'
  // })
};

// CREATE CREDENTIAL
const createVault = async (req, res) => {
  const encrytedUsername = encryptData(req.body.username);
  const enryptedPassword = encryptData(req.body.password);
  const credential = new Credential({
    ...req.body,
    username: encrytedUsername,
    password: enryptedPassword,
    user: req.userId,
  });
  try {
    const data = await credential.save();

    // decrypt the username and password credential
    data.username = decryptData(data.username);
    data.password = decryptData(data.password);

    // add crendential_id in user object
    await User.updateOne(
      { _id: req.userId },
      { $push: { credentials: data._id } }
    );
    res.status(200).json({
      data: data,
      message: "Credential was inserted successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Credentail insertion failed!",
    });
  }
};

// UPDATE CREDENTIAL
const updateVault = async (req, res) => {
  const updateData = {
    ...req.body,
  };
  // encrypt username and password, if they have in req.body.
  if (req.body.username) updateData.username = encryptData(req.body.username);
  if (req.body.password) updateData.password = encryptData(req.body.password);

  try {
    const data = await Credential.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updateData },
      { new: true }
    );

    // decrypt the username and password to plain text
    data.username = decryptData(data.username);
    data.password = decryptData(data.password);
    res.status(200).json({
      data,
      message: "success",
    });
  } catch {
    res.status(500).json({
      message: "Update failed!!",
    });
  }
};

// DELETE CREDENTIAL
const deleteVault = async (req, res) => {
  try {
    const data = await Credential.findByIdAndDelete({ _id: req.params.id });

    if (!data) {
      return res
        .status(400)
        .json({ message: "Something went wrong. try again!" });
    }

    // decrypt the username and password to plain text
    data.username = decryptData(data.username);
    data.password = decryptData(data.password);
    res.status(200).json({
      data,
      message: "Delete success!",
    });
  } catch (error) {
    res.status(500).json({
      data,
      message: "Delete failed!",
    });
  }
};

module.exports = {
  getAllVault,
  getVault,
  createVault,
  updateVault,
  deleteVault,
};
