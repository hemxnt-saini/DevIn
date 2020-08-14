const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//@route GET api/auth
//@desc Testing
//@access Public

router.get("/", auth, (req, res) => {
  res.send("auth ROUTE");
});
module.exports = router;
