const express = require("express");
const router = express.Router();
const Programs = require("../models/Programs");
const Users = require("../models/Users");
const UpcomingWorkouts = require("../models/UpcomingWorkouts");
const ExerciseLogs = require("../models/ExerciseLogs");
const verifyAccessToken = require("../middleware/jwt/verifyAccessToken");
const getPermissions = require("../middleware/programs/getPermissions");
const mongoose = require("mongoose");


/* 

*/



/* 
Get endpoint for getting an upcoming workout given a request date
Params:
  username: username of user
  date; date of the workout 

Returns: 
  onSuccess: workout data in the form of a json (see upcomingWorkout model for fields)
  onFailure: status error
*/

router.get("/get-workout", verifyAccessToken, (req, res) => {
  console.log("+++\nGetting Workout")
  const username = req.query.username;
  console.log(req.query.date);
  
  const workoutDate = new Date(req.query.date);
  workoutDate.setUTCHours(0, 0, 0, 0);
  new UpcomingWorkouts()
    .getWorkout(username, workoutDate)
    .then((workoutData) => {
      if (workoutData.exists) {
        if (workoutData.workout.user != req.username) {
          return res.status(403).json({ error: "Forbidden" });
        } else {
          return res.status(200).json(workoutData.workout.workoutData);
        }
      } else {

        return res.status(404).json({ error: "Workout Not Found" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: "Internal server error" });
    });
});


/* 
post request that uploads workout data that corresponds to an upcoming workout document
Params:
  username: username of the user who is logging the workout
  date: date of the workout 
  workoutData: Uploads data about the workout that the user just performed. see ExerciseLogs model for more info 
*/
router.post("/log-workout", verifyAccessToken, (req, res) => {
  username = req.query.username;
  workoutDate = req.query.date;
  workoutData = req.body.workoutData;
  new UpcomingWorkouts()
    .getWorkout(username, workoutDate)
    .then((workoutObj) => {
      if (workoutObj.exists) {
        if (workoutObj.workout.user != req.username || workoutObj.workout.completed) {
          return res.status(403).json({ error: "Forbidden" });
        } else {
          console.log("Logging Workout", workoutData)
          for (var exerciseName in workoutData) {
            ExerciseLogs.uploadData(
              username,
              exerciseName,
              workoutDate,
              workoutData[exerciseName]
            ).catch((error) => {

              return res.status(500).json({ error: "Workout Logging Error 1" });
            });
          }
          console.log("Saved Workouts")
          workoutObj.workout.completed = true;
          workoutObj
            .workout
            .save()
            .then((savedWorkout) => {
              return res.status(200).send();;
            })
            .catch((error) => {
                return res.status(500).json({ error: "Workout Logging Error 2" });
            });
        }
      } else {
        return res.status(404).json({ error: "Workout Not Found" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "Workout Logging Error 3" });
    });
});

module.exports = router;
