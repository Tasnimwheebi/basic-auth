'use strict';

/////////////////////////////////////////
////////// App dependencies ////////////
///////////////////////////////////////

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');

const cors = require('cors');

// Prepare the express app
const app = express();

const route = require('./auth/router.js');
//////////////////////////////////////////
///// error handler or bad request handler
//////////////////////////////////////////
const notFoundHndler = require('./middleware/404.js');
const errorHandler = require('./middleware/500');





//////////////////////////////////////////
/////////    App setup   ////////////////
////////////////////////////////////////

// Process JSON input and put the data on req.body
app.use(express.json());

app.use(cors());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

//// Routes /////////
app.use(route);


//////////////////////////////////////////
//////// app middlewares  ///////////////
////////////////////////////////////////
app.get('/',(req,res)=>{
  res.send('Welcome to Home Page');
});

// app.use('/api/v1/food', foodRoute);
// app.use('/api/v1/clothes', clothesRout);



//////////////////////////////////////////
///// error or bad request middlewares ///
//////////////////////////////////////////
app.use('*', notFoundHndler);
app.use(errorHandler);


//////////////////////////////////////////////
// export the server and start of listening//
////////////////////////////////////////////
module.exports = app;