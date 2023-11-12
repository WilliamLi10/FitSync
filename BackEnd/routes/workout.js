const express = require("express");
const router = express.Router();
const Programs = require("../models/Programs");
const Users = require("../models/Users");
const UpcomingWorkouts = require("../models/UpcomingWorkouts");
const verifyAccessToken = require("../middleware/jwt/verifyAccessToken");
const getPermissions = require("../middleware/programs/getPermissions");
const mongoose = require("mongoose");



module.exports = router;