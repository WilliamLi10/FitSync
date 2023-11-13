const mongoose = require("mongoose");

const ExerciseLogsSchema = new mongoose.Schema({
  user: {
    type: String,
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

ExerciseLogsSchema.statics.uploadData = (username, exerciseName, date, data) => {
  const newData = new mongoose.model("ExerciseLogs")({
    user: username,
    date: date,
    exerciseName: exerciseName,
    performanceData: data,
  });

  return newData.save();
};

const ExerciseLogs = mongoose.model("ExerciseLogs", ExerciseLogsSchema);

module.exports = ExerciseLogs;
