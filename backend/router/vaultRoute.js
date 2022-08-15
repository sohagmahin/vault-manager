const express = require("express");
const router = express.Router();

const authCheck = require("../middleware/common/authCheck");
const {
  getAllVault,
  getVault,
  createVault,
  updateVault,
  deleteVault,
} = require("../controller/vaultController");

const {
  vaultValidator,
  vaultValidatorHandler,
} = require("../middleware/vault/vaultValidator");

// GET all credential
router.get("/all", authCheck, getAllVault);

// GET single credential
router.get("/:id", authCheck, getVault);

// POST create credential
router.post("/", authCheck, vaultValidator, vaultValidatorHandler, createVault);

// PUT credential
router.put("/:id", authCheck, updateVault);

// DELETE credential
router.delete("/:id", authCheck, deleteVault);

module.exports = router;
