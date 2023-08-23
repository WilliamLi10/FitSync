const bcrypt = require("bcrypt");
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
const Users = require("../models/Users");
require("dotenv").config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: `${process.env.SECRET_KEY}`,
};

passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    Users.findById(jwtPayload.sub, (err, user) => {
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
        const user = await Users.findOne({ email: email });
        if (!user)
          return done(null, false, {
            message: "Incorrect email.",
            email: true,
            pass: false,
          });

        bcrypt.compare(pass, user.password, (err, result) => {
          if (err) return done(err);
          if (!result) {
            return done(null, false, {
              message: "Incorrect password.",
              email: false,
              pass: true,
            });
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
