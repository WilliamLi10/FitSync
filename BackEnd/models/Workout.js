const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: String,
  description: String,
  weight: Number,
  sets: Number,
  reps: Number,
  rest: Number,
  timeUnit: String,
  notes: String,
});
const workoutSchema = new mongoose.Schema({
  name: String,
  id: Number,
  exercises: [exerciseSchema],
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;
