const mongoose = require("mongoose");

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
  editorPermissions: { type: Boolean, required: true },
  editors: [
    { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  ],
  viewers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  ],
  workouts: [{ type: Object, required: true }],
  lastModified: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      date: { type: Date },
    },
  ],
  valid: { type: Boolean, required: true },
});

programsSchema.methods.createProgram = async function (userID) {
  try {
    const newProgram = new mongoose.model("programs")({
      name: "Untitled",
      owner: userID,
      editorPermissions: false,
      editors: [userID],
      lastModified: [{ user: userID, date: Date() }],
      workouts: [
        {
          Name: "Untitled",
          Exercises: [
            {
              Name: "Untitled",
              Sets: "",
              Reps: "",
              Weight: "",
              Rest: "",
              Description: "",
            },
          ],
          Unit: { weight: "lb", rest: "min" },
        },
      ],
      valid: false,
    });

    const savedProgram = await newProgram.save();

    await mongoose
      .model("users")
      .findOneAndUpdate(
        { _id: userID },
        { $push: { programs: { program: savedProgram._id, date: Date() } } }
      );

    return savedProgram._id;
  } catch (error) {
    console.log("Error creating program");
    throw error;
  }
};

programsSchema.methods.getProgram = async function (programID, userID) {
  try {
    const program = await mongoose
      .model("programs")
      .findOne({ _id: programID })
      .lean();

    const userIDObject = new mongoose.Types.ObjectId(userID);
    const isOwner = program.owner.equals(userIDObject);
    const isEditor = program.editors.some((editorId) =>
      editorId.equals(userIDObject)
    );
    const isViewer = program.viewers.some((viewerId) =>
      viewerId.equals(userIDObject)
    );

    if (isOwner) {
      program.userRole = "owner";
    } else if (isEditor) {
      program.userRole = "editor";
    } else if (isViewer) {
      program.userRole = "viewer";
    } else {
      program.userRole = "none";
    }

    return program;
  } catch (error) {
    console.log("Error getting program");
    throw error;
  }
};

programsSchema.methods.saveProgram = async function (program, programID) {
  try {
    await mongoose
      .model("programs")
      .findOneAndUpdate({ _id: programID }, program);
  } catch (error) {
    console.log("Error saving program");
    throw error;
  }
};

programsSchema.methods.getUsers = async function (programID) {
  try {
    return await mongoose
      .model("programs")
      .findOne(
        { _id: programID },
        { editors: 1, viewers: 1, owner: 1, editorPermissions: 1 }
      )
      .populate("owner", "username")
      .populate("editors", "username")
      .populate("viewers", "username");
  } catch (error) {
    console.log("Error getting users");
    throw error;
  }
};

programsSchema.methods.saveUsers = async function (
  programID,
  viewers,
  editors
) {
  try {

    await mongoose.model("programs").findOneAndUpdate(
      { _id: programID },
      { viewers: viewers, editors: editors }
    );

    await mongoose
      .model("users")
      .updateMany(
        { _id: { $in: [...viewers, ...editors] } },
        { $addToSet: { programs: { program: programID, date: new Date() } } }
      );

    console.log("Users and program updated successfully");
  } catch (error) {
    console.log("Error saving users and program:", error);
    throw error;
  }
};

const Programs = mongoose.model("programs", programsSchema);

module.exports = Programs;
