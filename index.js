'use strict';

//////////////////////////////////
//// require the enviroment /////
////////////////////////////////
require('dotenv').config();

const mongoose = require('mongoose');
const server = require('./src/server.js');

////////////////////////////////////////
// Connecting the app with database////
/////////     THEN       /////////////
/////  start accssing the app ///////
/// Catch the error if its found ////
///////////////////////////////////

mongoose
  .connect(process.env.MONGOOSE_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(process.env.PORT);
    console.log(`Listening on port`);
  })
  .catch((error) => {
    console.log('CONNECTION_ERROR', error.mssage);
  });



