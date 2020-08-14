const jwt = require("jsonwebtoken");
const confiq = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  //if token is there

  if (!token) {
    res.status(401).json({ msg: "No token, Authorization Denied.!" });
  }

  //Verify Token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
