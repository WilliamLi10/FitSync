const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const verifyAccessToken = require("../middleware/jwt/verifyAccessToken");

router.post("/check-user", verifyAccessToken, (req, res) => {
  console.log("+++");
  console.log("Checking user...");

  new Users()
    .checkUserName(req.body.username)
    .then((userExists) => {
      console.log("Checked user successfully");
      res.json({ success: userExists });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
