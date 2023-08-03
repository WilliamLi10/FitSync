const mongoose = require("mongoose");
const Workout = require("./Workout");
const bcrypt = require("bcrypt");

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
  ArrayBufferAccessibleWorkouts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPrograms" },
  ],
});

AccountSchema.methods.checkUserName = (userName) => {
  return mongoose
    .model("Accounts")
    .findOne({ UserName: userName })
    .then((existingUser) => {
      throw new Error("")
      return !!existingUser;
    })
    .catch((error) => {
      throw error;
    });
};

AccountSchema.methods.checkEmail = (email) => {
  return mongoose
    .model("Accounts")
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

  return bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(user.pass, salt).then((hashedPass) => {
        const newUser = new userModel({
          UserName: user.user,
          DOB: user.dob,
          Email: user.email,
          PassWord: hashedPass,
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
      throw error;
    });
};

const Accounts = mongoose.model("Accounts", AccountSchema, "Accounts");

module.exports = Accounts;
