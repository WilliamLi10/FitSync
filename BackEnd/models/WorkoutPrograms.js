const mongoose = require('mongoose');
const Workout = require('./Workout');


const workoutProgramSchema = new mongoose.Schema({
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Accounts' },
    editors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Accounts' }],
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Accounts' }],
    workouts: [WorkoutSchema]
});

const workoutPrograms = mongoose.model('WorkoutPrograms', workoutProgramSchema);

module.exports = workoutPrograms