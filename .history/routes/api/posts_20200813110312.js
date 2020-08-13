const express = require("express");
const router = express.Router();

//@route GET api/posts
//@desc Testing
//@access Public

router.get("/api", (req, res) => {
  res.send("POST ROUTE");
});
module.exports = router;
