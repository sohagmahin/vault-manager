const { check, validationResult } = require("express-validator");

const forgetPassValidator = [
  check("email").isEmail({}).withMessage("email is required!"),
];

const forgetPassValidatorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  forgetPassValidator,
  forgetPassValidatorHandler,
};
