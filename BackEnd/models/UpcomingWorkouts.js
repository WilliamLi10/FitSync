const mongoose = require("mongoose");
/* 
An upcoming workout corresponds to a list of exercises including sets x reps x weights.
Primary key for an upcoming workout document should be the (user, date)
An upcoming workout document's username can not be changed but the date can be changed.
*/


const upcomingWorkoutsSchema = new mongoose.Schema({
  user: {
    type: String,
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
upcomingWorkoutsSchema.methods.getWorkout = function (username, date) {
  console.log(username);
  console.log(date);
  return this.model("upcomingWorkouts")
    .findOne({ user: username, date: date })
    .then((workout) => {
      console.log(workout);
      return { exists: !!workout, workout: workout };
    })
    .catch((error) => {
      console.log(error)
      throw error;
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

/* 
@param username: username of the user that will run the new upcoming workout
@param date: the date the user will run the new program
@param workoutData: a json object containing all the information pertaining to this specific workout.
@modifies: Upcoming workout collection
@returns: returns an error if there was an error creating the new workout otherwise it will return a mongoose object
          of the new workout

*/
upcomingWorkoutsSchema.statics.addWorkout = async function (
  username,
  date,
  workoutData
)  {
  const newWorkout = new mongoose.model("upcomingWorkouts")({
    user: username,
    date: date,
    workoutData: workoutData,
    completed: false,
  });

  return await newWorkout
    .save()
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
