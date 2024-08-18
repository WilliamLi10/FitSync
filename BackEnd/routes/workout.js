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
  console.log("+++\nGetting Workout");
  const userID = req.userID;
  console.log(req.query.date);

  const workoutDate = new Date(req.query.date);
  workoutDate.setUTCHours(0, 0, 0, 0);
  new UpcomingWorkouts()
    .getWorkout(userID, workoutDate)
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
  date: date of the workout 
  workoutData: map where key is exercise  name and value is another map containing exericse data like sets reps weight etc
*/

router.post("/log-workout", verifyAccessToken, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userID = req.userID;
    const workoutDate = req.body.date;
    const workoutData = req.body.workoutData;

    // Read operation outside of the transaction
    const workoutObj = await new UpcomingWorkouts().getWorkout(
      userID,
      workoutDate
    );

    if (!workoutObj.exists) {
      return res.status(404).json({ error: "Workout Not Found" });
    }

    if (
      workoutObj.workout.user !== req.username ||
      workoutObj.workout.completed
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }

    console.log("Logging Workout", workoutData);

    for (const exerciseName in workoutData) {
      const newLogEntry = new ExerciseLogs({
        userId: req.userID,
        date: req.body.date,
        exerciseName: exerciseName,
        performanceData: workoutData[exerciseName],
      });

      await newLogEntry.save({ session });
    }

    console.log("Saved Workouts");

    workoutObj.workout.completed = true;
    await workoutObj.workout.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).send();
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ error: "Workout Logging Error" });
  }
});

module.exports = router;
