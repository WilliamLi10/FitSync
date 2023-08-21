const express = require("express");
const router = express.Router();
const Programs = require("../models/Programs");
const Users = require("../models/Users");
const verifyAccessToken = require("../middleware/jwt/verifyAccessToken");

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

router.post("/load-program", verifyAccessToken, (req, res) => {
  console.log("+++");
  console.log("Loading program...");

  const programID = req.body.programID;
  const userID = req.userID;

  new Programs()
    .getProgram(programID, userID)
    .then((program) => {
      if (program.userRole === "none") {
        console.log("Unauthorized user");
        return res.status(401).json({ error: "Unauthorized" });
      }
      console.log("Loaded program successfully");
      res.json({ program: program });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
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

router.post("/load-program-list", verifyAccessToken, (req, res) => {
  console.log("+++");
  console.log("Loading next twenty programs...");

  const index = req.body.index;
  const userID = req.userID;

  new Users()
    .getProgramList(userID, index)
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

router.post("/save-program", verifyAccessToken, (req, res) => {
  console.log("+++");
  console.log("Saving program...");

  new Programs()
    .saveProgram(req.body.program, req.body.id)
    .then(() => {
      console.log("Saved program successfully");
      return res.json({});
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/get-users", verifyAccessToken, (req, res) => {
  console.log("+++");
  console.log("Getting users...");

  new Programs()
    .getUsers(req.body.programID)
    .then((users) => {
      console.log("Users loaded successfully");
      res.json({
        editors: users.editors,
        viewers: users.viewers,
        owner: users.owner,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
