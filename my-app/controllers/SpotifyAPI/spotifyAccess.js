const axios = require('axios');
const CLIENT_ID = 'f96c84ccf962498b8499d78509c90ebf';
const CLIENT_SECRET = 'b71ec3ea5e174d2daf3653d02fe9a620';





exports.getToken = async (req, res) => {
    const authCode = req.body.code;
    console.log("first this runs")
    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: `grant_type=authorization_code&code=${authCode}&redirect_uri=http://localhost:3000/login`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            },
        });
        console.log("this runs")
        const accessToken = response.data.access_token;
        res.json({ access_token: accessToken });
    } catch (error) {
        console.error('Error fetching the Spotify access token:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching the Spotify access token.');
    }
};


exports.fetchUserProfile = async (req, res) => {
    const accessToken = req.body.accessToken;
    try {
        const response = await axios({
            method: "GET",
            url: 'https://api.spotify.com/v1/me',
            headers: { 
                Authorization: `Bearer ${accessToken}` 
            }
        });
        console.log("THIS IS THE USER ID")
        console.log(response.data.id);
        const userId = response.data.id;
        const userDisplayName = response.data.display_name;
        res.json({ userId: userId, userDisplayName: userDisplayName });
    
    } catch (error) {
        console.error('Error fetching user profile data:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching user profile data');
    }
};

exports.getRecentlyPlayedSongIds = async (req, res) => {
    const accessToken = req.body.accessToken;
    const afterTimestamp = req.body.afterTimestamp;
    // add in to url for after timestamp 
    // &after=${afterTimestamp}
    try {
        const response = await axios({
            url: `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        console.log("this runs");
        console.log("THIS IS THE RESPONSE");
        var songDataList = response.data.items;
        const recentlyPlayedSongIds = [];
        for (var i = 0; i < songDataList.length; i++){
            recentlyPlayedSongIds.push({
                songId: songDataList[i].track.id,
                timestamp: new Date(songDataList[i].played_at).getTime() 
            });
        }
        res.json({ recentlyPlayedSongIds: recentlyPlayedSongIds });
        
    } catch (error) {
        console.error('Error fetching the recently played songs from Spotify:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching the recently played songs from Spotify');
    }
};
