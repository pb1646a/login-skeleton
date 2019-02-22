const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let verificationSchema = new Schema({
    userid: String, 
    email: String, 
    createdAt: Date,
})

const Verification = mongoose.model("Verification", verificationSchema);

module.exports = Verification;