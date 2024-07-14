const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const tokenList = {};

const getToken = async (id) => {
  const payload = { id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 60000 });
  tokenList[id] = token;

  return token;
};

const checkToken = async (token) => {
  const { id } = jwt.verify(token, SECRET_KEY);
  if (id) {
    if (tokenList[id] === token) {
      delete tokenList[id];
      return true;
    }
  }
  return false;
};

module.exports = {
  checkToken,
  getToken,
};
