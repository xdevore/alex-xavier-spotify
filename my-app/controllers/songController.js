const Song = require('../models/songModel.js');
const User = require('../models/userModel.js');

exports.addSongs = async (req, res) => {
    try {
        const { userId, songs } = req.body;

        const user = await User.findOne({ userId });
        
        if (!user) {
            return res.status(404).send({message: 'user doesnt exist'});
        }
        
        songs.forEach(song => {
            user.songs.push(song);
        });

        await user.save();

        res.status(201).send(user.songs);
    } catch (error) {
        console.error("cant add songs");
        res.status(500).send({ message: error.message });
    }
};

exports.getSongs = async (req, res) => {
    try {
        const { userId, start, end } = req.params;

        const startTime = Number(start);
        const endTime = Number(end);

        
        const user = await User.findOne(
            { userId, "songs.timestamp": { $gte: startTime, $lte: endTime } },
            { "songs.$": 1 }  
        );

        if (!user) {
            return res.status(404).send({ message: 'User doesn\'t exist or no songs in the given timeframe.' });
        }

        res.status(200).send(user.songs);
    } catch (error) {
        console.error("Trouble getting songs");
        res.status(500).send({ message: error.message });
    }
};

