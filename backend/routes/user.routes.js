const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Auth = require("../auth/password");
const passwordHash = Auth.saltHashPassword;
const multer = require("multer");
const formData = multer();

const crypto = require("crypto");
require("../auth/passport-strategy");

router.post("/register_user", formData.none(), (req, res) => {
  let data = req.body;
  let password = req.body.password;
  let shpass = passwordHash(password);
  let token = crypto.randomBytes(16).toString("hex");
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
