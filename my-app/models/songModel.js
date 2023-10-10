const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  songId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
});

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;