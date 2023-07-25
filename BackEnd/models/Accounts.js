const mongoose = require("mongoose");
const Workout = require("./Workout");

const ActiveProgramSchema = new mongoose.Schema({
  name: String,
  id: { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPrograms" },
  frequency: Number,
  workouts: [Workout.schema],
});

const AccountSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  PassWord: {
    type: String,
    required: true,
  },
  ActiveWorkout: ActiveProgramSchema,
  ArrayBufferccessibleWorkouts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPrograms" },
  ],
});

AccountSchema.methods.checkUserName = (userName) => {
  return mongoose.model("Accounts")
    .findOne({ UserName: userName })
    .then((existingUser) => {
      return !!existingUser;
    })
    .catch((error) => {
      throw error;
    });
};

AccountSchema.methods.checkEmail = (email) => {
  return mongoose.model("Accounts")
    .findOne({ Email: email })
    .then((existingEmail) => {
      return !!existingEmail;
    })
    .catch((error) => {
      throw error;
    });
};

AccountSchema.methods.addUser = (user) => {
  const userModel = mongoose.model("Accounts");

  const newUser = new userModel({
    UserName: user.user,
    DOB: user.dob,
    Email: user.email,
    PassWord: user.pass,
  });

  return newUser
    .save()
    .then((savedUser) => {
      return savedUser;
    })
    .catch((error) => {
      throw error;
    });
};

const Accounts = mongoose.model("Accounts", AccountSchema, "Accounts");

module.exports = Accounts;
