const mongoose = require('mongoose');
const ExerciseSchema = new mongoose.Schema({
    name: String,
    description: String,
    weight: Number,
    sets: Number,
    reps: Number,
    rest: Number,
    timeUnit: String,
    notes: String,
  });
  const WorkoutSchema = new mongoose.Schema({
    name: String,
    id: Number,
    exercises: [ExerciseSchema],
  });

const Workout = mongoose.model('Workout', WorkoutSchema);

modules.exports = Workout;