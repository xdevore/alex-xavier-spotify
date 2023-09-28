const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/SpotifyAPI/spotifyAccess.js'); 

router.post('/get-token', spotifyController.getToken);

module.exports = router;
