const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const verifyAccessToken = require("../middleware/jwt/verifyAccessToken");

router.post("/get-user", verifyAccessToken, (req, res) => {
  new Users.checkUser(req.body.username);
});

module.exports = router;
