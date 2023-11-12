const express = require("express");
const router = express.Router();
const Programs = require("../models/Programs");
const Users = require("../models/Users");
const UpcomingWorkouts = require("../models/UpcomingWorkouts");
const verifyAccessToken = require("../middleware/jwt/verifyAccessToken");
const getPermissions = require("../middleware/programs/getPermissions");
const mongoose = require("mongoose");

function roundToNearestFive(n) {
  return Math.round(n / 5) * 5;
}

router.post("/create-program", verifyAccessToken, (req, res) => {
  console.log("+++");
  console.log("Creating program...");

  const userID = req.userID;

  new Programs()
    .createProgram(userID)
    .then((programID) => {
      console.log("Created program successfully");
      return res.json({ programID: programID });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.get("/load-program", verifyAccessToken, async (req, res) => {
  console.log("+++");
  console.log("Loading program...");

  const programID = req.query.programID;
  const userID = req.userID;

  try {
    const program = await Programs.getLeanProgram(programID);

    if (!program) {
      console.log("Program not found");
      return res.status(404).json({ error: "Page not found" });
    }

    let userRole = "none";

    const userIDObject = new mongoose.Types.ObjectId(userID);
    if (program.owner.equals(userIDObject)) {
      userRole = "owner";
    } else if (
      program.editors.some((editorId) => editorId.equals(userIDObject))
    ) {
      userRole = "editor";
    } else if (
      program.viewers.some((viewerId) => viewerId.equals(userIDObject)) ||
      program.isPublic
    ) {
      userRole = "viewer";
    }

    if (userRole === "none") {
      return res.status(403).json({ error: "Forbidden" });
    }

    program.userRole = userRole;

    console.log("Loaded program successfully");
    res.json({ program: program });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/update-last-opened", verifyAccessToken, (req, res) => {
  console.log("+++");
  console.log("Updating last opened...");

  new Users()
    .updateLastOpened(req.userID, req.body.id)
    .then(() => {
      console.log("Updated program successfully");
      return res.json({});
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.get("/load-program-list", verifyAccessToken, (req, res) => {
  console.log("+++");
  console.log("Loading next programs...");

  const index = req.query.index;
  const userID = req.userID;
  const inc = req.query.inc;

  new Users()
    .getProgramListStaggered(userID, index, inc)
    .then((programs) => {
      console.log("Loaded programs successfully");
      if (programs.length !== 0) {
        return res.json({ success: true, programs: programs });
      }
      return res.json({ success: false });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post(
  "/save-program",
  [verifyAccessToken, getPermissions],
  (req, res) => {
    console.log("+++");
    console.log("Saving program...");
    console.log(req.permissions.userRole);
    if (
      req.permissions.userRole != "owner" &&
      req.permissions.userRole != "editor"
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }

    new Programs()
      .updateProgram(req.body.program, req.body.programID)
      .then(() => {
        console.log("Saved program successfully");
        return res.json({});
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      });
  }
);

router.get("/get-permissions", verifyAccessToken, (req, res) => {
  console.log("+++");
  console.log("Getting permissions...");
  const programID = req.query.programID;
  new Programs()
    .getProgramPermissions(programID)
    .then((users) => {
      const editorUsernames = users.editors.map((editor) => editor.username);
      const viewerUsernames = users.viewers.map((viewer) => viewer.username);
      const ownerUsername = users.owner.username;
      const editorPermissions = users.editorPermissions;
      const isPublic = users.isPublic;

      console.log("Permissions loaded successfully");

      res.json({
        editors: editorUsernames,
        viewers: viewerUsernames,
        owner: ownerUsername,
        editorPermissions: editorPermissions,
        isPublic: isPublic,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post(
  "/save-permissions",
  [verifyAccessToken, getPermissions],
  (req, res) => {
    console.log("+++");
    console.log("Saving users...");

    if (!req.permissions.canEditPermissions) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const programID = req.body.programID;
    const viewers = req.body.viewers;
    const editors = req.body.editors;
    const editorPermissions = req.body.editorPermissions;
    const isPublic = req.body.isPublic;

    const convertViewers = new Users().manyUsernameToManyID(viewers);
    const convertEditors = new Users().manyUsernameToManyID(editors);

    Promise.all([convertEditors, convertViewers])
      .then(([editorID, viewerID]) => {
        const updateProgram = new Programs().updateProgram(
          {
            editors: editorID,
            viewers: viewerID,
            isPublic: isPublic,
            editorPermissions: editorPermissions,
          },
          programID
        );

        const updateUsers = new Users()
          .addProgramToManyUsers(req.body.programID, [...viewerID, ...editorID])
          .then(() => {
            console.log("Saved users successfully");
            res.json({});
          });

        Promise.all([updateProgram, updateUsers]);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      });
  }
);

/* 
Starts Program with req.query.programID for user with req.query.username.
The endpoint will use the Users current squat bench and deadlift maxes to fill in the template with weights,
and then pull information from the request body to get start date and which days they will be working out. The day of 
week will be represented with a number from 0 - 6
request body format will look like this:
{
  startDate: date,
  duration: Number,
  workoutDays: {
    Upper 1: 2,
    Upper 2: 4,
    Lower 1: 5
    Lower 2: 3,
  }
}
*/

router.post(
  "/start-program",
  [verifyAccessToken, getPermissions],
  (req, res) => {
    console.log("+++");
    console.log("Starting User Program");
    const username = req.query.username;
    const programID = req.query.programID;
    const [year, month, day] = req.body.startDate.split("-").map(Number);
    const startDate = new Date(year, month - 1, day);
    new Users()
      .getFullUser(username)
      .then(async (user) => {
        console.log(user);
        const program = await Programs.getProgram(programID);
        for (let i = 0; i < program.workouts.length; ++i) {
          let workoutDate = new Date(startDate);
          console.log(req.body.workoutDays);
          console.log();
          while (
            workoutDate.getDay() !=
            req.body.workoutDays[program.workouts[i].Name]
          ) {
            workoutDate.setDate(workoutDate.getDate() + 1);
          }
          program.workouts[i].Exercises.forEach((exercise, j) => {
            const intensity = program.workouts[i].Exercises[j].Intensity;
            delete program.workouts[i].Exercises[j].Intensity;
            program.workouts[i].Exercises[j].Weight = null;
            if (intensity != "") {
              if (
                program.workouts[i].Exercises[j].Name.toLowerCase().includes(
                  "bench"
                )
              ) {
                program.workouts[i].Exercises[j].Weight = roundToNearestFive(
                  user.benchMax * (parseInt(intensity, 10) / 100)
                );
              } else if (
                program.workouts[i].Name.toLowerCase().includes("squat")
              ) {
                program.workouts[i].Exercises[j].Weight = roundToNearestFive(
                  user.squatMax * (parseInt(intensity, 10) / 100)
                );
              } else if (
                program.workouts[i].Name.toLowerCase().includes("deadlift")
              ) {
                program.workouts[i].Exercises[j].Weight = roundToNearestFive(
                  user.deadliftMax * (parseInt(intensity, 10) / 100)
                );
              }
            }
            console.log("Successfully Set Exercise %s", exercise.Name);
          });
          for (let j = 0; j < req.body.duration; ++j) {
            try {
              await UpcomingWorkouts.addWorkout(
                username,
                workoutDate,
                program.workouts[i]
              );
              workoutDate.setDate(workoutDate.getDate() + 7);
              console.log(
                "Successfully added Workout %s",
                program.workouts[i].Name
              );
            } catch (error) {
              console.log("Failed adding Workout %s", program.workouts[i].Name);
              console.log(error);
              throw error;
            }
          }
        }
        user.activeProgram = true;
        return user.save();
      })
      .then((updatedUser) => {
        res.status(200).send();
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
      });
  }
);

module.exports = router;
