const express = require("express");
const router = express.Router();
const Programs = require("../models/Programs");
const Users = require("../models/Users");
const UpcomingWorkouts = require("../models/UpcomingWorkouts");
const Progress = require("../models/Progress");
const verifyAccessToken = require("../middleware/jwt/verifyAccessToken");
const getPermissions = require("../middleware/programs/getPermissions");
const mongoose = require("mongoose");

router.get("/get-workout", verifyAccessToken, (req, res) => {
  const username = req.query.username;
  const workoutDate = req.query.date;
  new UpcomingWorkouts()
    .getWorkout(username, workoutDate)
    .then((workoutData) => {
      if (workoutData.exists) {
        if (workoutData.workout.user != req.username) {
          return res.status(403).json({ error: "Forbidden" });
        } else {
          return res.status(200).json(workoutData.workout);
        }
      } else {
        return res.status(404).json({ error: "Workout Not Found" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/log-workout", verifyAccessToken, (req, res) => {
  username = req.query.username;
  workoutDate = req.query.date;
  workoutData = req.body.data;
  new UpcomingWorkouts()
    .getWorkout(username, workoutDate)
    .then((workoutObj) => {
      if (workoutObj.exists) {
        if (workoutObj.workout.user != req.username) {
          return res.status(403).json({ error: "Forbidden" });
        } else {
          for (var exerciseName in workoutData) {
            new Progress.uploadData(
              username,
              exerciseName,
              workoutDate,
              workoutData[exerciseName]
            ).catch((error) => {
              return res.status(500).json({ error: "Internal server error" });
            });
          }

          workoutObj
            .save()
            .then((savedWorkout) => {
              return res.status(200).send();;
            })
            .catch((error) => {
                return res.status(500).json({ error: "Internal server error" });
            });
        }
      } else {
        return res.status(404).json({ error: "Workout Not Found" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: "Internal server error" });
    });
});

router.module.exports = router;
