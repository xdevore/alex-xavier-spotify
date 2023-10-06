const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/SpotifyAPI/spotifyAccess.js'); 

router.post('/get-token', spotifyController.getToken);

router.post('/fetch-user-profile', spotifyController.fetchUserProfile);

router.post('/get-recently-played-song-ids', spotifyController.getRecentlyPlayedSongIds);

module.exports = router;
