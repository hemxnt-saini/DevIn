const jwt = require("jsonwebtoken");
const confiq = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  next();
};
