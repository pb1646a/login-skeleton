// just use require('db'); to add config to backend-server

const mongoose = require("mongoose");
const dbUrl = process.env.DB_URI;
mongoose.set('useCreateIndex', true);
mongoose
  .connect(
    dbUrl,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("connected to database!");
  })
  .catch((error) => {
    console.log(error);
  });