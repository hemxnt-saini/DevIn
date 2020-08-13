const express = require("express");
const router = express.Router();

//@route GET api/posts
//@desc Testing
//@access Public

router.get("/", (req, res) => {
  res.send("POST ROUTE");
});
