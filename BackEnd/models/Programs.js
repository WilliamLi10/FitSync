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
  isPublic: { type: Boolean, required: true },
  editors: [
    { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  ],
  viewers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  ],
  workouts: [{ type: Object, required: true }],
  lastModified: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    date: { type: Date },
  },
  valid: { type: Boolean, required: true },
});

/* 
  Creates a new empty program. Sets given user id as owner. Returns new program id

  input: user id
  output: program id
*/
programsSchema.methods.createProgram = async function (userID) {
  try {
    const newProgram = new mongoose.model("programs")({
      name: "Untitled",
      owner: userID,
      editorPermissions: false,
      isPublic: false,
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
        { $push: { programs: { _id: savedProgram._id, date: Date() } } }
      );

    return savedProgram._id;
  } catch (error) {
    console.log("Error creating program");
    throw error;
  }
};

/* 
  Retreives lean version of program with given program id

  input: program id
  output: lean program object
*/
programsSchema.statics.getLeanProgram = async function (programID) {
  try {
    return await this.findOne({ _id: programID }).lean();
  } catch (error) {
    console.log("Error getting program");
    throw error;
  }
};

/*
  Updates program with given program id with the information in given object

  input: object, program id
  output: nothing
*/
programsSchema.methods.updateProgram = async function (newData, programID) {
  try {
    await mongoose
      .model("programs")
      .findOneAndUpdate({ _id: programID }, newData);
  } catch (error) {
    console.log("Error saving program");
    throw error;
  }
};

/*
  Retreives all the viewers, editors, and owner of the program with the given program id. Also retreives editor permissions

  input: program id
  output: {
    editors: [{_id, username} object] array, 
    viewers: [{_id, username} object] array, 
    owner: {_id, username} object 
    editorPermissions: bool
  }
*/
programsSchema.methods.getProgramPermissions = async function (programID) {
  try {
    return await mongoose
      .model("programs")
      .findOne(
        { _id: programID },
        { editors: 1, viewers: 1, owner: 1, editorPermissions: 1, isPublic: 1 }
      )
      .populate("owner", "username")
      .populate("editors", "username")
      .populate("viewers", "username");
  } catch (error) {
    console.log("Error getting users");
    throw error;
  }
};

const Programs = mongoose.model("programs", programsSchema);

module.exports = Programs;
