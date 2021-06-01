'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const Users = require('../models/users-model.js');


module.exports= async (req,res,next)=>{
  const encoded = req.headers.authorization.split(' ').pop();
  const decoded = base64.decode(encoded);
  const [username,password]= decoded.split(':');
  try{
    
   
    const user = await Users.findOne({username});
    const isValid = await bcrypt.compare(password,user.password);
    if (isValid){
      console.log('user',user);
     
      req.user=user;
      
      
      next();
    } else {
      res.status(401).json({error:'Invalid user'});
    }
  } catch (error) {
    res.status(401).json({error:error.message});
  }
};
