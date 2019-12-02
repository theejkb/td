const {
  body, param, query, validationResult,
} = require('express-validator');

module.exports = {
  bodyValidator: (paramNames = []) => paramNames.map((paramName) => body(paramName).exists()),

  queryValidator: (params = []) => params.map((paramName) => query(paramName).exists()),

  paramValidator: (params = []) => params.map((paramName) => param(paramName).exists()),

  verification: (req) => {
    const errors = validationResult(req).array();

    if (errors.length < 1) {
      return false;
    }

    return Object.fromEntries(errors.map(({ msg, param }) => [param, msg]));
  },
};
