const { HttpError } = require("../utils");

const validateParams = (schema) => {
  const func = (req, res, next) => {
    const { error, value } = schema.validate(req.params);
    if (error) {
      next(HttpError(400, error.message));
    }
    req.params = { ...req.params, ...value };
    next();
  };

  return func;
};

module.exports = validateParams;
