const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const activeProgramSchema = new mongoose.Schema({
  name: String,
  id: { type: mongoose.Schema.Types.ObjectId, ref: "programs" },
  frequency: Number,
  workouts: [{ type: Object, required: true }],
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  activeProgram: activeProgramSchema,
  programs: [
    {
      program: { type: mongoose.Schema.Types.ObjectId, ref: "programs" },
      date: { type: Date, default: Date.now },
    },
  ],
});

userSchema.methods.checkUserName = (username) => {
  return mongoose
    .model("users")
    .findOne({ username: username })
    .then((existingUser) => {
      if (existingUser) {
        console.log("User exists");
      }
      return !!existingUser;
    })
    .catch((error) => {
      console.log("Error checking username");
      throw error;
    });
};

userSchema.methods.checkEmail = (email) => {
  return mongoose
    .model("users")
    .findOne({ email: { $regex: new RegExp(email, "i") } })
    .then((existingEmail) => {
      if (existingEmail) {
        console.log("Email exists");
      }
      return !!existingEmail;
    })
    .catch((error) => {
      console.log("Error checking email");
      throw error;
    });
};

userSchema.methods.addUser = (user) => {
  return bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(user.pass, salt).then((hashedPass) => {
        const newUser = new mongoose.model("users")({
          username: user.user,
          dob: user.dob,
          email: user.email,
          password: hashedPass,
        });

        return newUser
          .save()
          .then((savedUser) => {
            return savedUser;
          })
          .catch((error) => {
            throw error;
          });
      });
    })
    .catch((error) => {
      console.log("Error adding user");
      throw error;
    });
};

userSchema.methods.getUser = (userID) => {
  console.log(userID);
  return mongoose
    .model("users")
    .findOne({ _id: userID }, { username: 1, dob: 1, email: 1 })
    .catch((error) => {
      console.log("Error getting user information");
      throw error;
    });
};

userSchema.methods.getProgramList = (userID, index) => {
  return mongoose
    .model("users")
    .findOne({ _id: userID })
    .populate({
      path: "programs.program",
      populate: [{ path: "workouts" }, { path: "owner", select: "username" }],
    })
    .then((user) => {
      if (!user) {
        throw "User not found";
      }

      const programs = user.programs
        .sort((a, b) => b.date - a.date)
        .slice(index, index + 20)
        .map((program) => ({
          ...program.program.toObject(),
          ownerName: program.program.owner.username,
          lastOpened: program.date,
        }));

      return programs;
    })
    .catch((error) => {
      console.log("Error getting user information");
      throw error;
    });
};

userSchema.methods.updateLastOpened = async function (userID, programID) {
  try {
    const user = await mongoose.model("users").findById(userID);
    if (!user) {
      throw new Error("User not found");
    }

    const programIndex = user.programs.findIndex(
      (program) => program.program.toString() === programID
    );

    if (programIndex === -1) {
      throw new Error("Program not found in user's programs");
    }

    user.programs[programIndex].date = new Date();
    await user.save();
  } catch (error) {
    console.log("Error updating last opened date:");
    throw error;
  }
};

const Users = mongoose.model("users", userSchema);

module.exports = Users;
