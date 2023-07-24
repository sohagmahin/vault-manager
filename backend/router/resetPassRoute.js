const express = require("express");
const router = new express.Router();
const {
  forgetPassValidator,
  forgetPassValidatorHandler,
} = require("../middleware/resetPass/forgetPassValidator");
const {
  resetPassValidator,
  resetPassValidatorHandler,
} = require("../middleware/resetPass/resetPassValidator");

const {
  forgetPassword,
  resetPassword,
  // validateToken,
} = require("../controller/tokenController");

router.post(
  "/",
  forgetPassValidator,
  forgetPassValidatorHandler,
  forgetPassword
);

router.post(
  "/:userId/:token",
  resetPassValidator,
  resetPassValidatorHandler,
  resetPassword
);

// router.get("/validate/:userId/:token", validateToken);

module.exports = router;
