const express = require("express");
const router = express.Router();
const Programs = require("../models/Programs");
const Users = require("../models/Users");
const UpcomingWorkouts = require("../models/UpcomingWorkouts");
const ExerciseLogs = require("../models/ExerciseLogs");
const verifyAccessToken = require("../middleware/jwt/verifyAccessToken");
const getPermissions = require("../middleware/programs/getPermissions");
const mongoose = require("mongoose");
// NOT TESTED!!!
router.get("/exercise-logs/getDataByName", verifyAccessToken, (req, res) => {
  const username = req.query.username;
  const exerciseName = req.query.exerciseName;
  ExerciseLogs.find({user: username, exerciseName: exerciseName}, (err, logs) => {
    if (err) {
      return res.status(404).json({error: "No workout data found with specified exercise name."});
    } else {
      return res.status(200).json(logs);
    }
  })
  
});

router.get("/exercise-logs/getDataByDate", verifyAccessToken, (req, res) => {
  const username = req.query.username;
  const workoutDate = req.query.date;
  ExerciseLogs.find({user: username, date: date}, (err, logs) => {
    if (err) {
      return res.status(404).json({error: "No workout data found with specified exercise name."},);
    } else {
      return res.status(200).json(logs);
    }
  })
  
});

router.post("/exercise-logs/AddNewWorkoutData", verifyAccessToken, (req, res) => {
  const newLogEntry = new ExerciseLogs(req.body.data);

  newLogEntry.save().then((savedLog) => {
    return res.status(201).json(savedLog);
  }).catch((err) => {
    return res.status(500).json({
      error: "Internal server error",
    })
  });
});

module.exports = router;
