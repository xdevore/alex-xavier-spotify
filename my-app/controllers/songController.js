const Song = require('../models/songModel.js');

exports.addSong = async (req, res) => {
  try {
    const { userId, songId } = req.body;
    if (!userId || !songId) return res.status(400).send('userId and songId are required');
    
    const song = new Song({ userId, songId });
    await song.save();
    
    res.status(201).send(song);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSongsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const songs = await Song.find({ userId });
    
    res.status(200).send(songs);
  } catch (error) {
    res.status(500).send(error);
  }
};