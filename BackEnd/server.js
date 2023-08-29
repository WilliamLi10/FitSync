const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const connectDB = require("./config/mongodb");
const authRouter = require("./routes/auth");
const programRouter = require("./routes/program");
const userRouter = require("./routes/user");
const redisClient = require("./config/redis");
const port = 5000;

const app = express();

connectDB()
  .then(() => {
    redisClient.connect();
  })
  .then(() => {
    console.log("Connected to Redis");
  })
  .then(() => {
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    app.use(express.json());
    app.use(passport.initialize());

    app.use("/auth", authRouter);
    app.use("/program", programRouter);
    app.use("/user", userRouter);
    

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
