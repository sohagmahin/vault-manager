const { check, validationResult } = require("express-validator");

const signupValidator = [
  check("email").isEmail({}).withMessage("email is required!"),
  check("password")
    .isLength({ min: 1 })
    .withMessage("password feild is required!"),
  check("name").exists().withMessage("name feild is required!"),
];

const signupValidatorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      data: {
        email: req.body.email,
      },
      errors: mappedErrors,
    });
  }
};

module.exports = {
  signupValidator,
  signupValidatorHandler,
};
