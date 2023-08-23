const jwt = require("jsonwebtoken");
const redisClient = require("../../config/redis");
require("dotenv");

const verifyRefreshToken = (req, res, next) => {
  console.log("+++");
  console.log("Verifying refresh token...");

  const token = req.headers["x-refresh-token"];
  console.log(jwt.decode(token))
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
          console.log(req.userID)
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

module.exports = verifyRefreshToken;
