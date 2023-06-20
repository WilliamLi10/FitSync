const express = require("express");
const path = require("path");
const connection = require("./util/db");

const app = express();

connection(() => {
  app.listen(3000);
});
