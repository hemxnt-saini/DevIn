const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route GET api/profile/me
//@desc Getting current user profile
//@access Private

router.get("/", auth, async (req, res) => {
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
