'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Create a mongoose model


const userSchema = new mongoose.Schema({
  username : {type : String , require : true , unique :true},
  password : {type :String , require : true},
});


userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password,10);
  this.password = hash;
  next();
});

const User = mongoose.model('User',userSchema);

module.exports = User;

