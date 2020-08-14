const jwt = require("jsonwebtoken");
const confiq = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  //if token is there

  if (!token) {
    res.status(401).json({ msg: "No token, Authorization Denied.!" });
  }

  next();
};
