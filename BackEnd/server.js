// server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const connectDB = require("./util/db");

connectDB()
  .then(() => {
    const port = 5000;
    app.use(cors());
    app.use(express.json());

    const authRouter = require("./routes/auth");
    app.use("/auth", authRouter);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
