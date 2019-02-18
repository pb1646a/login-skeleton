const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Auth = require('../auth/password');
const passwordHash = Auth.saltHashPassword;
require('../auth/passport-strategy');


router.post('/register_user', (req,res)=>{
    let data = req.body;
    let password = req.body.password;
    let shpass = passwordHash(password);

    let user = new User({
        firstname: data.firstname, 
        lastname: data.lastname,
        email: data.email,
        passwordHash: shpass.passwordHash,
        passwordSalt: shpass.salt

        
    })
    user.save().then(user=>{
        console.log(user);
        return    res.json({message:'user'})
    }
        
     
    )
})






module.exports = router;