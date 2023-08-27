const Programs = require("../../models/Programs");
const mongoose = require("mongoose");

/*
Modifies: req.permissions 
Effect: sets req.permissions to hold a json that represents all permissions of a user container userID req.userID for
program with programID
  {
    userRole: Owner || Editor || Viewer
    canEditPermissions: true/false,
  }
*/
const getPermissions = async (req, res, next) => {
  console.log("+++");
  console.log("Getting Program Permissions...");

  const userID = req.userID;
  const programID = req.body.programID;
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

    req.permissions = {
      userRole: userRole,
      canEditPermissions:
        userRole === "owner" ||
        (userRole === "editor" && program.editorPermissions),
    };
    console.log("Edit access verified successfully");
    next();
  } catch (error) {
    console.log("Error verifying edit access");
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getPermissions;
