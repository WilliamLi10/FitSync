const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");
const connectDB = require("./config/mongodb");
const authRouter = require("./routes/auth");
const programRouter = require("./routes/program");
const userRouter = require("./routes/user");
const workoutRouter = require("./routes/workout")
const redisClient = require("./config/redis");
const exerciseLogsRouter = require("./routes/exerciseLogs");
const port = 5001;

const app = express();

connectDB()
  .then(() => {
    redisClient.connect();
  })
  .then(() => {
    console.log("Connected to Redis");
  })
  .then(() => {
    app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
    app.use(express.json());
    app.use(passport.initialize());

    app.use("/auth", authRouter);
    app.use("/program", programRouter);
    app.use("/user", userRouter);
    app.use("/workout",workoutRouter);
    app.use("/exercise-logs", exerciseLogsRouter);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
