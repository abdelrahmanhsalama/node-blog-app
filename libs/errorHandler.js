const errors = require("./errors.json");

const getError = (errorKey) => {
  return errors[errorKey] || "An unknown error occurred";
};

module.exports = { getError };
