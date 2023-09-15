const express = require('express');
const router = express.Router();
const axios = require('axios');
const CLIENT_ID = 'f96c84ccf962498b8499d78509c90ebf';
const CLIENT_SECRET = 'b71ec3ea5e174d2daf3653d02fe9a620';

router.post('/get-token', async (req, res) => {
    const authCode = req.body.code;
    
    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: `grant_type=authorization_code&code=${authCode}&redirect_uri=http://localhost:3004/home`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            },
        });
        
        const accessToken = response.data.access_token;
        res.json({ access_token: accessToken });

    } catch (error) {
        console.error('Error fetching the Spotify access token:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching the Spotify access token.');
    }
});

module.exports = router;
