require("../auth/passport-strategy");
const express = require("express");
const User = require("../models/user.model");
const Auth = require("../auth/password");
const multer = require("multer");
const formData = multer();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();
const passwordHash = Auth.saltHashPassword;


router.post("/login", (req, res, next)=>{
  passport.authenticate("local", { session: false }, (err, user, info)=>{
if (err) {
  return next(err);
}
if (!user) {
  return res.status(401).json({message:'unauthorized',tokenData:''});
}
if (user) {
  let token = jwt.sign(
    { userID: user.id,firstname: user.firstname, lastname: user.lastname, email: user.email},
    "todo-app-super-shared-secret",
    { expiresIn: "2h"}
  );
  let expiresAt = Date.now()+(120*36000);
  return res.status(200).json({ message: "OK", tokenData: JSON.stringify({token:token,expiresAt: expiresAt})});
}
})(req, res, next);
});



router.post("/register_user", formData.none(), (req, res) => {

  let data = req.body;
  let password = req.body.password;
  let shpass = passwordHash(password);
  let user = new User({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    passwordHash: shpass.passwordHash,
    passwordSalt: shpass.salt
  });
  user
    .save()
    .then(user => {
      return res.status(201).json({ message: "ok", response: user });
    })
    .catch(error => {
      Object.keys(error.errors).filter(err => {
        if (err.includes("email")) {
          if (error.errors.email.kind.includes("unique")) {
            return res
              .status(409)
              .json({ message: "email exits", response: error });
          }

          return res.status(500).json({ mesage: "internal server error" });
        }
      });
 
    });
});



module.exports = router;
