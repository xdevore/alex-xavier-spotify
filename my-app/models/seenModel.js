const mongoose = require('mongoose');

const seenSchema = new mongoose.Schema({
    songId: {
        type: String,
        required: true,
        index: true,  // This creates an index on songId field for faster query execution
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
        type: Object,
    }]
});

// Create an ascending index on the songId field
seenSchema.index({ songId: 1 });

const Seen = mongoose.model('Seen', seenSchema);

// Ensure indexes are created
Seen.syncIndexes();

module.exports = Seen;
