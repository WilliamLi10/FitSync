const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
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

progressSchema.methods.uploadData = (username, exerciseName, date, data) => {
  const newData = new mongoose.model("progress")({
    user: username,
    date: date,
    exerciseName: exerciseName,
    performanceData: data,
  });

  return newData.save();
};

const progress = mongoose.model("progress", progressSchema);

module.exports = progress;
