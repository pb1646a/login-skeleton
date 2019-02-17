require('backend/server');
require("./auth/passport-strategy");
const app = require('backend/app');
const passport = require('passport');
const jwt = require('jsonwebtoken');


app.use(passport.initialize());
app.post("/login", function(req, res, next) {
        passport.authenticate("local", { session: false }, function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({message:'User Not Found', tokenData:''});
      }
      if (user) {
        let token = jwt.sign(
          { userID: user.id,userRoles:user.userRoles },
          "todo-app-super-shared-secret",
          { expiresIn: "2h"}
        );
        let key = (user.id).toString();
        let expiresAt = Date.now()+(120*36000);
       
        return res.status(200).json({ message: "OK", tokenData: JSON.stringify({token:token,expiresAt: expiresAt})});
        
      }
    })(req, res, next);
  });

