
const User = require("../models/user.model");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');


let sha512 = (password,salt)=>{
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return{
        salt:salt,
        passwordHash: value
    };
};

function saltHashPassword(userPassword,salt){
     salt = salt;
    let passwordData = sha512(userPassword, salt);
    return passwordData;

}


passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField:"password"
    },
    (email,password,done)=>{
        console.log(email);
  return User.findOne({email: email}).then(user=>{

        if(!user){return done(null,false,{message:'Nope'})};
        let auth = authenticateUser(user,password);

       
        if(auth===true){
            let data = {};
            data.id=user._id;
            data.firstName = user.firstName;
            data.lastName = user.lastName;
            data.email= user.email;
            data.userRoles = user.userRoles;
        return done(null,data,{message:'test'});
        }
        if(auth!=true){
            return done(null,false,{message:'Nope User Info'})
        }
    }).catch(err=>{return done(err)});
    }
    
    )
)

function authenticateUser(user,password){
           let passwordCompare =  saltHashPassword(password,user.passwordSalt);
           if(user.passwordHash===passwordCompare.passwordHash){
               return true;

           }
          }