const { body } = require("express-validator");
const { getError } = require("../libs/errorsHandler");

const validatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage(getError("MISSING_REQUIRED_FIELDS"))
    .escape(),
  body("content")
    .trim()
    .notEmpty()
    .withMessage(getError("MISSING_REQUIRED_FIELDS"))
    .escape(),
];

module.exports = { validatePost };
