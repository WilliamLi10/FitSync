const mongoose = require("mongoose");

const ExerciseLogsSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  performanceData: {
    type: Object,
    required: true,
  },
});

ExerciseLogsSchema.index({ user: 1, exerciseName: 1 });
ExerciseLogsSchema.index({ user: 1, date: 1 });

const ExerciseLogs = mongoose.model("ExerciseLogs", ExerciseLogsSchema);

module.exports = ExerciseLogs;
