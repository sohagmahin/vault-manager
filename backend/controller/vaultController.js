const { encryptData, decryptData } = require("../helpers/dataEncryption");
const {
  getAllVaultsData,
  getSingleVault,
  saveVault,
  updateSingleVault,
  deleteSingleVault,
} = require("../services/vaultService");
const { addVaultID } = require("../services/userService");

// GET all passmanager data
const getAllVault = async (req, res) => {
  try {
    // Use Aggregate
    const data = await getAllVaultsData(req.userId);

    data.map((vault) => {
      vault.username = decryptData(vault.username);
      vault.password = decryptData(vault.password);
      return vault;
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
};

// GET SINGLE CREDENTIAL
const getVault = async (req, res) => {
  try {
    const data = await getSingleVault(req.params.id);

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
};

// CREATE VAULT
const createVault = async (req, res) => {
  const encrytedUsername = encryptData(req.body.username);
  const enryptedPassword = encryptData(req.body.password);
  const vault = {
    ...req.body,
    username: encrytedUsername,
    password: enryptedPassword,
    user: req.userId,
  };
  try {
    const newVault = await saveVault(vault);

    // decrypt the username and password credential
    newVault.username = decryptData(newVault.username);
    newVault.password = decryptData(newVault.password);

    // add vault-id in user object
    await addVaultID(req.userId, newVault._id);
    res.status(200).json({
      data: newVault,
      message: "Vault was inserted successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Vault insertion failed!",
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
    const data = await updateSingleVault(req.params.id, updateData);
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
    const data = await deleteSingleVault(req.params.id);

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
