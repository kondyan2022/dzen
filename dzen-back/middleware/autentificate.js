const { authService } = require("../services");
const { HttpError } = require("../utils");

const authentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    if (!(await authService.checkToken(token))) {
      next(HttpError(401));
    }
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authentificate;