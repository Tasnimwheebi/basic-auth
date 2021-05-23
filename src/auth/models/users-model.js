'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Create a mongoose model
const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const Users = mongoose.model('users', usersSchema);

usersSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password,10);
  this.password = hash;
  next();
});

module.exports = Users;


