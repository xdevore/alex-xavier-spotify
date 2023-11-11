const mongoose = require('mongoose');
const Song = require('./songModel');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  lastPull: {
    type: Number,
    default: 0,
    required: false
  },
  accessToken: {  // When I start auto refreshing
    type: String,
    required: false
  },
  songs: [Song.schema],
  starred: {
    type: [Object], 
    default: []     
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

