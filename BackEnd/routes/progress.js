const express = require("express");
const router = express.Router();
const Programs = require("../models/Programs");
const Users = require("../models/Users");
const UpcomingWorkouts = require("../models/UpcomingWorkouts");
const ExerciseLogs = require("../models/ExerciseLogs");
const verifyAccessToken = require("../middleware/jwt/verifyAccessToken");
const getPermissions = require("../middleware/programs/getPermissions");
const mongoose = require("mongoose");

router.get("/get-exercise-data", verifyAccessToken, (req, res) => {
  const username = req.query.username;
  const exerciseName = req.query.exerciseName;
  new ExerciseLogs.getData(username, exerciseName)
    .then((exerciseData) => {})
    .catch((error) => {
      return res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
