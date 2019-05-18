require('backend/server');
require("./shared/controllers/auth/passport-strategy"); 
require('backend/db');
const app = require('backend/app');
const passport = require('passport');
const userRoutes = require('./user/routes/user.routes');
const adminRoutes = require('./admin/routes/admin.routes');
const sharedRoutes = require('./shared/routes/shared.routes');


app.use(passport.initialize());
  app.use('/api/shared', sharedRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/admin', adminRoutes);