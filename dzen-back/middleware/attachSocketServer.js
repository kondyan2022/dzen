const attachSocketServer = (socketServer) => {
  const func = (req, res, next) => {
    req.io = socketServer;
    next();
  };

  return func;
};

module.exports = attachSocketServer;
