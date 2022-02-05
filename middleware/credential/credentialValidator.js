const { check, validationResult } = require("express-validator");

const credentialValidator = [
    check("domain")
        .isLength({ min: 1 })
        .withMessage("Domain name is required!"),

    check("username")
        .isLength({ min: 1 })
        .withMessage("Username is required!"),

    check("password")
        .isLength({ min: 1 })
        .withMessage("Password is required!")
];

const credentialValidatorHandler = function (req, res, next) {
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
}

module.exports = {
    credentialValidator,
    credentialValidatorHandler
}