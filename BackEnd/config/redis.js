const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

module.exports = redisClient;
