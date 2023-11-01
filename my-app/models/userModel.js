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
  songs: [Song.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

