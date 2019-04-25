const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  create_time: Date,
  last_login: Date
  // quote: {type: String, default:"You have no quote"}
});

const User = mongoose.model('loginData', UserSchema);

module.exports = User;
