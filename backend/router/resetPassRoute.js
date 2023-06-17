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

module.exports = router;
