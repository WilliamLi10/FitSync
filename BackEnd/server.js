const express = require("express");
const cors = require("cors");
const passport = require("./util/passport");
const connectDB = require("./util/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");

const app = express();

connectDB()
  .then(() => {
    const port = 5000;

    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    app.use(passport.initialize());

    app.use("/auth", authRouter);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
