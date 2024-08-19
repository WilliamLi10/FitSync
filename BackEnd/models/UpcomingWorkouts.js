const mongoose = require("mongoose");
/* 
An upcoming workout corresponds to a list of exercises including sets x reps x weights.
Primary key for an upcoming workout document should be the (user, date)
An upcoming workout document's username can not be changed but the date can be changed.
*/


const upcomingWorkoutsSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  workoutData: { type: Object, required: true },
  completed: {
    type: Boolean,
    required: true,
  },
});

/* 
@param username: username of the workout needed
@param date: date of the workout needed
*/
upcomingWorkoutsSchema.statics.getWorkout = function (workoutID) {
  const objId = new mongoose.Types.ObjectId(workoutID);
  return this
    .findOne({ _id: objId});
};

upcomingWorkoutsSchema.statics.getWorkoutGivenDateRange = function (userID, startDate, endDate) {
  console.log(userID);
  const objId = new mongoose.Types.ObjectId(userID);
  console.log(objId)
  return this.find({
    userID: objId,
    date: { $gte: startDate, $lte: endDate }
  });
};


/* 
@param username: username of the user associated with the workout trying to be deleted
@param date: date of the workout to be deleted
@returns: error if there was an error in deleting the workout
@modifies: upcoming workouts collection
*/
upcomingWorkoutsSchema.methods.deleteWorkout = function (username, data)  {
  return this.model("upcomingWorkouts")
    .deleteOne({ user: username, date: date })
    .then(() => {
      return;
    })
    .catch((error) => {
      throw error;
    });
};

upcomingWorkoutsSchema.statics.addWorkout = async function (
  userID,
  date,
  workoutData,
  session = null
)  {
  const newWorkout = new mongoose.model("upcomingWorkouts")({
    userID: username,
    date: date,
    workoutData: workoutData,
    completed: false,
  });

  const saveOptions = session ? { session } : {}; 

  return await newWorkout
    .save(saveOptions) 
    .then((savedWorkout) => {
      return savedWorkout;
    })
    .catch((error) => {
      console.log("Error with creating new upcoming workout");
      throw error;
    });
};


const upcomingWorkouts = mongoose.model(
  "upcomingWorkouts",
  upcomingWorkoutsSchema
);
module.exports = upcomingWorkouts;
