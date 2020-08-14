const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

//@route GET api/auth
//@desc Testing
//@access Public

router.get("/", auth, (req, res) => {
  try {
  } catch (err) {}
});
module.exports = router;
