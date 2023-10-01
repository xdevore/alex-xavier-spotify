const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  songId: {
    type: String,
    required: true,
  },
  addedAt: { 
    type: Date,
    default: Date.now,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  spotifyUserId: {
    type: String,
    required: true,
  },
  songs: [SongSchema], 
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
