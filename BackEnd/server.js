const express = require("express");
const path = require("path");
const cors = require("cors");
const connection = require("./util/db").connection;

const app = express();

app.use(cors());
app.use(express.json());

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

connection(() => {
  app.listen(5000);
});
