
const Seen = require('../models/seenModel'); 

const addSongs = async (req, res) => {
    const { songs } = req.body;

    if (!songs || !Array.isArray(songs)) {
        return res.status(400).send({ message: 'Didnt send songs over to be added uniquelly' });
    }

    try {
        const response = await Seen.insertMany(songs, { ordered: false });
        res.status(201).send(response);
    } catch (error) {
        if (error.code === 11000) {  // 11000 is MongoDB's code for a duplicate key error
            res.status(201).send(error.result.nInserted + " songs inserted. Some songs were already in the database.");
        } else {
            res.status(500).send({ message: 'Internal Server Error', error: error.message });
        }
    }
};
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