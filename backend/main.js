require('backend/server');
require("./auth/passport-strategy"); //maybe don't need this here;
require('backend/db');
const app = require('backend/app');
const passport = require('passport');
const userRoutes = require('./routes/user.routes');


app.use(passport.initialize());


  app.use('/api/users', userRoutes);