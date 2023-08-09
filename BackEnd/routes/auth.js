const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const redisClient = require("../util/redis");
require("dotenv");

const verifyAccessToken = (req, res, next) => {
  console.log("+++");
  console.log("Verifying access token...");

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    console.log("No access token provided");
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, `${process.env.SECRET_KEY}`, (error, decoded) => {
    if (error) {
      console.log("Invalid access token");
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.userID = decoded.userID;
    req.accessToken = token;

    console.log("Access token verified");

    next();
  });
};

const verifyRefreshToken = (req, res, next) => {
  console.log("+++");
  console.log("Verifying refresh token...");

  const token = req.headers["x-refresh-token"];

  if (!token) {
    console.log("No refresh token provided");
    return res.status(401).json({ error: "Unauthorized" });
  }

  redisClient
    .get(`bl_${token}`)
    .then((invalid) => {
      if (invalid) {
        console.log("Refresh token found in Redis");
        return response.status(401).send({ error: "Unauthorized" });
      } else {
        jwt.verify(token, `${process.env.SECRET_KEY}`, (error, decoded) => {
          if (error) {
            console.log("Invalid refresh token");
            return res.status(401).json({ error: "Unauthorized" });
          }
          req.userID = decoded.userID;
          req.refreshToken = token;

          console.log("Refresh token verified");

          next();
        });
      }
    })
    .catch((error) => {
      console.log("Redis error");
      console.log(error);
      return res.status(500).json({ error: "Internal server hour" });
    });
};

router.post("/refresh-token", verifyRefreshToken, (req, res) => {
  console.log("+++");
  console.log("Refreshing JWT...");

  const [userID] = req.userID;

  new Users()
    .getUser(userID)
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
          { expiresIn: "900000", subject: `${user._id}` }
        );

        newRefresh = jwt.sign(
          { userID: user._id, type: "refresh" },
          `${process.env.SECRET_KEY}`,
          { expiresIn: "1h", subject: `${user._id}` }
        );

        console.log("JWT refreshed");

        return res.json({
          success: true,
          accessToken: newAccess,
          refreshToken: newRefresh,
        });
      }
      console.log("User not found");
      return res.status(401).json({ error: "Unauthorized" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
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
        res.json({
          success: false,
          user: userExists,
          email: emailExists,
        });
      } else {
        new Users().addUser(user).then((savedUser) => {
          res.json({ success: true });
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
      return res.json({
        success: false,
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
      { expiresIn: "900000", subject: `${user._id}` }
    );

    const refreshToken = jwt.sign(
      { userID: user._id, type: "refresh" },
      `${process.env.SECRET_KEY}`,
      { expiresIn: "1h", subject: `${user._id}` }
    );

    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      success: true,
    });

    console.log("Login successful");
  })(req, res);
});

router.post("/logout", verifyRefreshToken, (req, res) => {
  console.log("+++");
  console.log("Logging out...");

  const { refreshToken } = req;

  redisClient
    .set(`bl_${refreshToken}`, refreshToken, { EX: 3600 })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });

  console.log("Logout successful");
  return res.json({});
});

module.exports = router;
