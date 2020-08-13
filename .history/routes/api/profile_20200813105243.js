const express = require("express");
const router = express.Router();

//@route GET api/profile
//@desc Testing
//@access Public

router.get("/", (req, res) => {
  res.send("profile ROUTE");
});
