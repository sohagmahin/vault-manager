const mongoose = require("mongoose");
const Vault = require("../model/vaultModel");

const getAllVaultsData = async (userId) => {
  const data = await Vault.aggregate([
    {
      $match: { user: mongoose.Types.ObjectId(userId) },
    },
  ]);
  return data;
};

const getSingleVault = async (id) => {
  const data = await Vault.findOne({ _id: id }).populate(
    "user",
    "-__v -password"
  );
  return data;
};

const saveVault = async (vault) => {
  const newVault = new Vault({ ...vault });
  const data = await newVault.save();
  return data;
};

const updateSingleVault = async (id, data) => {
  const updatedData = await Vault.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
  return updatedData;
};

const deleteSingleVault = async (id) => {
  const deletedData = await Vault.findByIdAndDelete({ _id: id });
  return deletedData;
};

module.exports = {
  getAllVaultsData,
  getSingleVault,
  saveVault,
  updateSingleVault,
  deleteSingleVault,
};
