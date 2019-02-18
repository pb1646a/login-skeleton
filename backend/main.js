require('backend/server');
require("./auth/passport-strategy");
const app = require('backend/app');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/user.routes');


app.use(passport.initialize());
app.post("/login", (req, res, next)=>{
        passport.authenticate("local", { session: false }, (err, user, info)=>{
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({message:'unauthorized',tokenData:''});
      }
      if (user) {
        let token = jwt.sign(
          { userID: user.id,userRoles:user.userRoles },
          "todo-app-super-shared-secret",
          { expiresIn: "2h"}
        );
        let expiresAt = Date.now()+(120*36000);
        return res.status(200).json({ message: "OK", tokenData: JSON.stringify({token:token,expiresAt: expiresAt})});
      }
    })(req, res, next);
  });

  app.use('/api/users', userRoutes);