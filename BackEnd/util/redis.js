const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

module.exports = redisClient;
