const express = require("express");
const router = express.Router();

//@route GET api/users
//@desc Testing
//@access Public

router.get("/", (req, res) => {
  res.send("USERS ROUTE");
});

module.exports = router;
