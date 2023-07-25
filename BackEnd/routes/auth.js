const passport = require("passport");
const express = require("express");
const router = express.Router();
const Accounts = require("../models/Accounts");

router.post("/register", (req, res) => {
  const user = req.body;
  console.log(user);
  const checkEmail = new Accounts().checkEmail(user.email);
  const checkUserName = new Accounts().checkUserName(user.user);

  Promise.all([checkEmail, checkUserName]).then(([emailExists, userExists]) => {
    if (userExists) {
      return res.json({ status: "username exists" });
    }
    if (emailExists) {
      return res.json({ status: "email exists" });
    }
    new Accounts()
      .addUser(user)
      .then((savedUser) => {
        res.json({ status: "ok" });
      })
      .catch((error) => {
        throw error;
      });
  });
});

module.exports = router;
