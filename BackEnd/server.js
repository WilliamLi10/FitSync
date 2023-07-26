const express = require("express");
const connection = require("./util/db").connection;

const app = express();

connection(() => {
  app.listen(5000);
});
