const mongoose = require("mongoose");
const Workout = require("./Workout");

const programsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  editors: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  workouts: [WorkoutSchema],
});

programsSchema.methods.createProgram = (userID) => {
  return mongoose.model("programs").insertOne({
    name: "Untitled",
    owner: userID,
  });
};

const Programs = mongoose.model("programs", programsSchema);

module.exports = Programs;
