const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const verifyAccessToken = require("../middleware/jwt/verifyAccessToken");

router.post("/search-user", verifyAccessToken, (req, res) => {
  console.log("+++");
  console.log("Searching user...");

  new Users()
    .getUserByUsername(req.body.username)
    .then((userExists) => {
      console.log("Searched user successfully");
      if (!userExists.exists) {
        return res.json({ success: userExists.exists });
      } else {
        return res.json({ success: userExists.exists, user: userExists.user });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
