const User = require("../models/user.model");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const authUser = require('./password').authUser;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      return User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "User Does Not Exist" });
          }
          let auth = authUser(user, password);
          if (auth === true) {
            let data = {};
            data.id = user._id;
            data.firstName = user.firstName;
            data.lastName = user.lastName;
            data.email = user.email;
            data.userRoles = user.userRoles;
            return done(null, data, { message: "User Exists" });
          }
          if (auth != true) {
            return done(null, false, { message: "Failed Authentication" });
          }
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);



