const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let verificationSchema = new Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

const Verification = mongoose.model("Verification", verificationSchema);

module.exports = Verification;
