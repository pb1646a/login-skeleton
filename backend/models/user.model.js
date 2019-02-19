const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    id: String,
    firstname: {type: String, required:true }, 
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    passwordHash: {type: String, required: true},
    passwordSalt: {type: String, required: true},

});

const User = mongoose.model('User', userSchema);

module.exports = User;

