const mongoose = require("mongoose");
const Workout = require("./Workout");
const bcrypt = require("bcrypt");

const activeProgramSchema = new mongoose.Schema({
  name: String,
  id: { type: mongoose.Schema.Types.ObjectId, ref: "programs" },
  frequency: Number,
  workouts: [Workout.schema],
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
  activeWorkout: activeProgramSchema,
  ArrayBufferAccessibleWorkouts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "programs" },
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
  const userModel = mongoose.model("users");

  return bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(user.pass, salt).then((hashedPass) => {
        const newUser = new userModel({
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
  return mongoose
    .model("users")
    .findOne({ _id: userID }, { username: 1, dob: 1, email: 1 })
    .catch((error) => {
      console.log("Error getting user information");
      throw error;
    });
};

const Users = mongoose.model("users", userSchema);

module.exports = Users;
