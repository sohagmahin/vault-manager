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
      vault.email = decryptData(vault.email);
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

    data.email = decryptData(data.email);
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
  const encrytedemail = encryptData(req.body.email);
  const enryptedPassword = encryptData(req.body.password);
  const vault = {
    ...req.body,
    email: encrytedemail,
    password: enryptedPassword,
    user: req.userId,
  };
  try {
    const newVault = await saveVault(vault);

    // decrypt the email and password credential
    newVault.email = decryptData(newVault.email);
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
  // encrypt email and password, if they have in req.body.
  if (req.body.email) updateData.email = encryptData(req.body.email);
  if (req.body.password) updateData.password = encryptData(req.body.password);

  try {
    const data = await updateSingleVault(req.params.id, updateData);
    // decrypt the email and password to plain text
    data.email = decryptData(data.email);
    data.password = decryptData(data.password);
    res.status(200).json({
      data,
      message: "Update success!",
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

    // decrypt the email and password to plain text
    data.email = decryptData(data.email);
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
