const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
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

router.post("/refresh-token", (req, res) => {
  console.log("+++");
  console.log("Refreshing JWT...");

  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    console.log("No refresh token provided");
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(refreshToken, `${process.env.SECRET_KEY}`, (error, decoded) => {
    if (error) {
      console.log("Invalid refresh token");
      return res.status(401).json({ error: "Unauthorized" });
    }

    new Users()
      .getUser(decoded.userID)
      .then((user) => {
        if (user) {
          newAccess = jwt.sign(
            {
              email: user.email,
              username: user.username,
              userID: user._id,
              type: "access",
            },
            `${process.env.SECRET_KEY}`,
            { expiresIn: "1h", subject: `${user._id}` }
          );

          console.log("JWT refreshed");

          return res.status(200).json({ accessToken: newAccess });
        }
        console.log("User not found");
        return res.status(401).json({ error: "Unauthorized" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      });
  });
});

router.post("/register", (req, res) => {
  console.log("+++");
  console.log("Registering account...");

  const user = req.body;
  const checkEmail = new Users().checkEmail(user.email);
  const checkUserName = new Users().checkUserName(user.user);

  Promise.all([checkEmail, checkUserName])
    .then(([emailExists, userExists]) => {
      if (userExists || emailExists) {
        res.status(409).json({
          user: userExists,
          email: emailExists,
        });
      } else {
        new Users().addUser(user).then((savedUser) => {
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
    const accessToken = jwt.sign(
      {
        email: user.email,
        username: user.username,
        userID: user._id,
        type: "access",
      },
      `${process.env.SECRET_KEY}`,
      { expiresIn: "1h", subject: `${user._id}` }
    );

    const refreshToken = jwt.sign(
      { userID: user._id, type: "refresh" },
      `${process.env.SECRET_KEY}`,
      { expiresIn: "7d", subject: `${user._id}` }
    );

    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });

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
