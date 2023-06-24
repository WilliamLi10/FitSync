const express = require("express");
const path = require("path");
const connection = require("./util/db").connection;

const app = express();

connection(() => {
  app.listen(5000);
});
