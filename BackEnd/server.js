const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()
const app = express();

app.use(cors());
app.use(express.json());

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1getoho.mongodb.net/main?retryWrites=true&w=majority`
  )
  .then( result => {app.listen(5000)})
  .catch(err => {console.log(err)});
