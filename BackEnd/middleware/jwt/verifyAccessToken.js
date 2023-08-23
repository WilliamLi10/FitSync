const jwt = require("jsonwebtoken");
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

    console.log("Access token verified");

    next();
  });
};

module.exports = verifyAccessToken;
