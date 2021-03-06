const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
const emailPattern = new RegExp(
  "(^[a-zA-Z0-9]+)([-_.])?[a-zA-Z0-9]+(@{1}(?!$))[a-zA-Z(.)]+.+(?!$)[a-zA-Z]+$"
);

let userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    roles: [{type: String, default: ['user']}],
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    //activated: { type: Boolean, required: true, default: false }
    //test: { type: String, required: true }
  },
  { timestamps: true }
);



const User = mongoose.model("User", userSchema);
userSchema.plugin(uniqueValidator);
module.exports = User;
