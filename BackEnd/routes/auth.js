const express = require("express");
const router = express.Router();
const Accounts = require("../models/Accounts");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const csrf = require("csurf");
const redisClient = require("./util/redis");
require("dotenv");

const csrfProtection = csrf({ cookie: true });

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }

    req.userId = decoded.id;
    req.tokenExp = decoded.exp;
    req.token = token;
    next();
  });
};

router.post("/register", (req, res) => {
  const user = req.body;
  //console.log(user);
  const checkEmail = new Accounts().checkEmail(user.email);
  const checkUserName = new Accounts().checkUserName(user.user);

  Promise.all([checkEmail, checkUserName]).then(([emailExists, userExists]) => {
    if (userExists || emailExists) {
      res.json({ success: false, user: userExists, email: emailExists });
    } else {
      new Accounts()
        .addUser(user)
        .then((savedUser) => {
          res.json({ success: true });
        })
        .catch((error) => {
          throw error;
        });
    }
  });
});

router.post("/login", (req, res) => {
  //console.log(req.body)
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.json({
        success: false,
        message: "An error occurred during login",
      });
    }

    if (!user) {
      return res.json({
        success: false,
        message: info.message,
      });
    }

    const payload = {
      email: user.Email,
      username: user.UserName,
      userID: user._id,
    };

    const options = {
      expiresIn: "1h",
      subject: `${user._id}`,
    };

    const token = jwt.sign(payload, `${process.env.SECRET_KEY}`, options);

    res.json({ success: true, token: token });
  })(req, res);
});

router.post("/logout", verifyToken, (req, res) => {
  console.log("logout");
  const { userId, token } = req;

  redisClient.get(userId, (err, data) => {
    if (err) {
      res.send({ err });
    }

    if (data !== null) {
      const parsedData = JSON.parse(data);
      parsedData[userId].push(token);
      redisClient.setex(userId, 3600, JSON.stringify(parsedData));
      return res.json({ status: "success", message: "Logout successful." });
    }

    redisClient.setex(
      userId,
      3600,
      JSON,
      stringify({
        [userId]: [token],
      })
    );

    return res.json({
      status: "success",
      message: "Logout successful.",
    });
  });
});

router.get("/get-csrf", csrfProtection, (req, res) => {
  //console.log(req.csrfToken());
  res.json({ token: req.csrfToken() });
});

module.exports = router;
