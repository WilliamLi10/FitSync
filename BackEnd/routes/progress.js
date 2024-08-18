const express = require("express");
const router = express.Router();
const Programs = require("../models/Programs");
const Users = require("../models/Users");
const UpcomingWorkouts = require("../models/UpcomingWorkouts");
const ExerciseLogs = require("../models/ExerciseLogs");
const verifyAccessToken = require("../middleware/jwt/verifyAccessToken");
const getPermissions = require("../middleware/programs/getPermissions");
const mongoose = require("mongoose");

router.post("/AddNewWorkoutData", verifyAccessToken, (req, res) => {
  const newLogEntry = new ExerciseLogs(req.body.data);

  newLogEntry
    .save()
    .then((savedLog) => {
      return res.status(201).json(savedLog);
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Internal server error",
      });
    });
});



module.exports = router;
