const jwt = require("jsonwebtoken");
const confiq = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  //if token is there

  if (!token) {
    res.status(401).json({ msg: "No token, Authorization Denied.!" });
  }

  const decoded = jwt.verify(token, config.get("jwtSecret"));

  try {
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }

  next();
};
