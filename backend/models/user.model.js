const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    id: String,
    firstName: String, 
    lastName: String,
    email: String,
    passwordHash: String,
    passwordSalt:String,

});

const User = mongoose.model('User', userSchema);

module.exports = User;

