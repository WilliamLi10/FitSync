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
Get endpoint for getting an upcoming workouts given a request date range
Params:

  startDate; startDate of range
  endDate: endDate of range 

Returns: 
  onSuccess: upcoming workout documents containing all upcomingWorkouts within date range
  onFailure: status error
*/
router.get("/get-workouts", verifyAccessToken, async (req, res) => {
  try {
    console.log("+++\nGetting Workouts");

    const userID = req.userID;
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    console.log(startDate, endDate);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const workouts = await UpcomingWorkouts.getWorkoutGivenDateRange(userID, startDate, endDate);

    const user = await Users.findById(userID).select('activeProgram');

    const response = {
      workouts,
      activeProgram: user.activeProgram,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
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
    const workoutID = req.body.workoutId;
    const workoutData = req.body.workoutData;

    // Read operation outside of the transaction
    const workoutObj = await UpcomingWorkouts.getWorkout(workoutID);
    if (!workoutObj) {
      return res.status(404).json({ error: "Workout Not Found" });
    }

    if (
      workoutObj.userID.toString() !== req.userID ||
      workoutObj.completed
    ) {
      console.log(workoutObj.userID, req.userID)
      return res.status(403).json({ error: "Forbidden" });
    }

    for (const exerciseName in workoutData) {
      const newLogEntry = new ExerciseLogs({
        userID: new mongoose.Types.ObjectId(req.userID),
        date: req.body.date,
        exerciseName: exerciseName,
        performanceData: workoutData[exerciseName],
      });

      await newLogEntry.save({ session });
    }

    console.log("Saved Workouts");

    workoutObj.completed = true;
    await workoutObj.save({ session });

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
