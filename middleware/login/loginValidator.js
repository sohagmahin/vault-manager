const { check, validationResult } = require("express-validator");

const loginValidator = [
  check("username")
    .isLength({ min: 5 })
    .withMessage("username is required and should be five character!"),

  check("password").isLength({ min: 1 }).withMessage("password is required!"),
];

const loginValidatorHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};

module.exports = {
  loginValidator,
  loginValidatorHandler,
};
