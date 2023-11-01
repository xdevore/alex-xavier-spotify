const mongoose = require('mongoose');
const seenSchema = new mongoose.Schema({
    songId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    genres: [{
        type: String,
    }],
    features:[{
        type:Object,

    }]
});

const Seen = mongoose.model('Seen', seenSchema);
module.exports = Seen