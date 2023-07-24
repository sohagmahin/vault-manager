const { check, validationResult } = require("express-validator");

const resetPassValidator = [
  check("password")
    .isLength({ min: 5 })
    .withMessage("password is required! And more than five character!"),
];

const resetPassValidatorHandler = function (req, res, next) {
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
  resetPassValidator,
  resetPassValidatorHandler,
};
