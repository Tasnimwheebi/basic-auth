'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const server = require('../server.js');

const Users = require('./models/users-model.js');
const app = express.Router();
const middleware = require('./middleware/basic.js');

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
app.post('/signup', async (req, res) => {

  try {
    const {username,password}=req.body;
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new Users({username,password});
    const record = await user.save();
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});
  
  
// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
app.post('/signin',middleware, (req, res,next) => {
  
  /*
      req.headers.authorization is : "Basic sdkjdsljd="
      To get username and password from this, take the following steps:
        - Turn that string into an array by splitting on ' '
        - Pop off the last value
        - Decode that encoded string so it returns to user:pass
        - Split on ':' to turn it into an array
        - Pull username and password from that array
    */
  
  /*
      Now that we finally have username and password, let's see if it's valid
      1. Find the user in the database by username
      2. Compare the plaintext password we now have against the encrypted password in the db
         - bcrypt does this by re-encrypting the plaintext password and comparing THAT
      3. Either we're valid or we throw an error
    */
  
  
});

module.exports=app;