const express = require("express");
const router = express.Router();

const auth = express("../../models/auth");
//@route GET api/profile/me
//@desc Getting current user profile
//@access Private

router.get("/", (req, res) => {
  res.send("profile ROUTE");
});
module.exports = router;
