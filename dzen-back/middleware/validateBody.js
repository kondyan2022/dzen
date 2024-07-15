const { HttpError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    req.body = { ...req.body, ...value };
    next();
  };

  return func;
};

module.exports = validateBody;
