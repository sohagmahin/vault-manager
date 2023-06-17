const { check, validationResult } = require("express-validator");

const vaultValidator = [
  check("domain").isLength({ min: 1 }).withMessage("Domain name is required!"),
  check("email").isEmail({}).withMessage("Email is required!)"),
  check("password").isLength({ min: 1 }).withMessage("Password is required!"),
];

const vaultValidatorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      data: "An error occurred!",
      errors: mappedErrors,
    });
  }
};

module.exports = {
  vaultValidator,
  vaultValidatorHandler,
};
