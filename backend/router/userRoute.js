const express = require("express");
const router = express.Router();
const authCheck = require("../middleware/common/authCheck");
const {
  loginValidator,
  loginValidatorHandler,
} = require("../middleware/login/loginValidator");

const {
  getAllUser,
  getUser,
  login,
  signup,
  deleteUser,
  updateUser,
} = require("../controller/userController");

// GET ALL USER
router.get("/all", authCheck, getAllUser);

// GET SINGLE USER
router.get("/:id", authCheck, getUser);

// POST LOGIN
router.post("/login", loginValidator, loginValidatorHandler, login);

// POST SIGNUP
router.post("/signup", signup);

// UPDATE USER
router.put("/:id", authCheck, updateUser);

// DELETE USER
router.delete("/:id", authCheck, deleteUser);

module.exports = router;
