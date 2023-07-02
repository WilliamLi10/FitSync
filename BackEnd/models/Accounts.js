const mongoose = require('mongoose');
const Workout = require('./Workout')

const ActiveProgramSchema = new mongoose.Schema({
name: String, 
id: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPrograms'} ,
frequency: Number,
workouts:  [WorkoutSchema]
})
const AccountSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    DOB: String,
    Email: String,
    ActiveWorkout: ActiveProgramSchema,
    ArrayBufferccessibleWorkouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPrograms' }] 
})


const Accounts = mongoose.model('Accounts',AccountSchema);

modules.exports = Accounts;
