const express = require("express");
const router = express.Router();
const Accounts = require("../models/Accounts");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const csrf = require("csurf");
const redisClient = require("../util/redis");
require("dotenv");

const csrfProtection = csrf({ cookie: true });

const verifyToken = (req, res, next) => {
  console.log("+++");
  console.log("Verifying JWT...");

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, `${process.env.SECRET_KEY}`, (error, decoded) => {
    if (error) {
      console.log("Invalid token");
      return res.status(403).json({ error: "Forbidden" });
    }

    req.userID = decoded.userID;
    req.tokenExp = decoded.exp;
    req.token = token;

    console.log("JWT verified");

    next();
  });
};

router.post("/register", (req, res) => {
  console.log("+++");
  console.log("Registering account...");

  const user = req.body;
  const checkEmail = new Accounts().checkEmail(user.email);
  const checkUserName = new Accounts().checkUserName(user.user);

  Promise.all([checkEmail, checkUserName])
    .then(([emailExists, userExists]) => {
      if (userExists || emailExists) {
        res.status(409).json({
          user: userExists,
          email: emailExists,
        });
      } else {
        new Accounts().addUser(user).then((savedUser) => {
          res.status(201).json({});
          console.log("Registration successful");
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/login", (req, res) => {
  console.log("+++");
  console.log("Logging in...");

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }

    if (!user) {
      console.log(info.message);
      return res.status(400).json({
        email: info.email,
        pass: info.pass,
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

    res.status(200).json({ token: token });

    console.log("Login successful");
  })(req, res);
});

router.post("/logout", verifyToken, (req, res) => {
  console.log("+++");
  console.log("Logging out...");

  const { userID, token } = req;

  redisClient
    .get(userID)
    .then((data) => {
      if (data !== null) {
        const parsedData = JSON.parse(data);
        parsedData[userID].push(token);
        return parsedData;
      } else {
        const parsedData = { [userID]: [token] };
        return parsedData;
      }
    })
    .then((parsedData) => {
      redisClient.set(userID, JSON.stringify(parsedData), {
        EX: 3600,
      });
      res.status(200).json({});
      console.log("Logout successful");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.get("/get-csrf", csrfProtection, (req, res) => {
  console.log("+++");
  console.log("Getting CSRF token...");
  res.status(200).json({ token: req.csrfToken() });
  console.log("CSRF token sent");
});

module.exports = router;
