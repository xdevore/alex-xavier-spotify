const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  songId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;