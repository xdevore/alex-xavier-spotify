
const Seen = require('../models/seenModel'); 
// add song data to seen songs if not already exist
const addSongs = async (req, res) => {
    const { songs } = req.body;

    if (!songs || !Array.isArray(songs)) {
        return res.status(400).send({ message: 'Need to send array of songs.. not what you did' });
    }

    try {
        const response = await Seen.insertMany(songs, { ordered: false });
        res.status(201).send(response);
    } catch (error) {
        if (error.code === 11000) {  
            res.status(201).send(error.result.nInserted + " songs inserted. This just means there were some dups.");
        } else {
            res.status(500).send({ message: 'Internal Server Error', error: error.message });
        }
    }
};
// get l
const getSongs = async (req, res) => {
    const { songIds } = req.body; 

    if (!songIds || !Array.isArray(songIds)) {
        return res.status(400).send({ message: 'Invalid song IDs provided.' });
    }

    try {
        const songs = await Seen.find({ songId: { $in: songIds } });
        res.status(200).send(songs);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = {
    addSongs,
    getSongs
};