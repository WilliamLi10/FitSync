const bcrypt = require("bcrypt");
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
const Accounts = require("../models/Accounts");
require("dotenv").config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: `${process.env.SECRET_KEY}`,
};

passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    Accounts.findById(jwtPayload.sub, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      return done(null, false);
    });
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pass",
    },
    async (email, pass, done) => {
      try {
        const user = await Accounts.findOne({ Email: email });
        if (!user) return done(null, false, { message: "Incorrect email." });

        bcrypt.compare(pass, user.PassWord, (err, result) => {
          if (err) return done(err);
          if (!result) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
