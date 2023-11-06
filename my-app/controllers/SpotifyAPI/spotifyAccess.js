const axios = require('axios');
const CLIENT_ID = "144e7866c95e4f018ee8ff57b0149d23"
//process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = "9cc4ff2e4ca84210854fa75071866db4"
//process.env.REACT_APP_SPOTIFY_SECRET_KEY;




// get spotify access token from client token
exports.getToken = async (req, res) => {
    //get middle token
    const authCode = req.body.code;
  
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

// use login access token to get user data
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


// gets chunks of artists from https://github.com/pavelkomarov/exportify/blob/master/exportify.js


// recieve artist data
const getAllArtistGenres = async (artist_ids, accessToken) => {
    

    // change back from set
    artist_ids = Array.from(artist_ids);
    const artist_chunks = [];
    // chank data since it only allows you to do 50 at a time
    while (artist_ids.length) {
        artist_chunks.push(artist_ids.splice(0, 50));
    }

    // get all genre dat (aka song genres)
    const artists_promises = artist_chunks.map((chunk_ids) => 
        axios.get(`https://api.spotify.com/v1/artists?ids=${chunk_ids.join(',')}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
    );

    
    const responses = await Promise.all(artists_promises);
    let artist_genres = {};
    responses.forEach(response => 
        response.data.artists.forEach(artist => 
            artist_genres[artist.id] = artist.genres
        )
    );
    return artist_genres;
};
//get audio features from song ids
const getAllAudioFeatures = async (song_ids, accessToken) => {
    const song_ids_array = [...song_ids];
    try {
        const response = await axios.get(`https://api.spotify.com/v1/audio-features?ids=${song_ids_array.join(",")}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        let song_features = {};
       

        response.data.audio_features.forEach(feature => {
            song_features[feature.id] = {
                acousticness: feature.acousticness,
                danceability: feature.danceability,
                energy: feature.energy,
                instrumentalness: feature.instrumentalness,
                liveness: feature.liveness,
                loudness: feature.loudness,
                speechiness: feature.speechiness,
                tempo: feature.tempo,
                valence: feature.valence
            };
        });
        console.log("LETS EEEEEEEE\n\n\n", song_features)

        return song_features;
    } catch (error) {
        console.error("Error fetching audio features:", error);
    }
}


// get all track data 
const unSeenTracks = async (data, accessToken) => {
    const songInfo = [];
    const artist_ids = new Set(
        data.flatMap(item => item.track.artists.map(artist => artist.id))
      );
    const song_ids = new Set(
        data.map(item => item.track.id)
      );
    const allArtistGenres = await getAllArtistGenres(artist_ids, accessToken);
    const allSongFeatures = await getAllAudioFeatures(song_ids, accessToken)
   
    // for each song we have  to combine all song data
    for (let i = 0; i < data.length; i++) {
        const track = data[i].track;
        const genres = track.artists.map(artist => allArtistGenres[artist.id]).flat();
        const features = allSongFeatures[track.id]



        songInfo.push({
            songId: track.id,
            name: track.name,
            artist: track.artists.map(a => a.name).join(', '), 
            genres: genres,
            features: features
        });
    }

    try {

       
        
        const response = await axios.post('http://localhost:6969/api/seen/', { songs: songInfo });
    } catch (error) {
        console.error('Error adding unique songs to unseen songs db:', error);
    }
};
//both send all timestamped song ids to user, and add all seen tracks to our seen db
exports.getRecentlyPlayedSongIds = async (req, res) => {
    const accessToken = req.body.accessToken;
    const afterTimestamp = req.body.afterTimestamp;
    // add in to url for after timestamp 
    // &after=${afterTimestamp}
    try {
        //get the timestamp and use it to get recent songs
        
        const response = await axios({
            method: "GET",
            url: `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        console.log("gets song atleast");
        //var timestamp = Date(response.data.items[0].played_at).getTime(); //make sure not empty
        //console.log(timestamp)

        // noew we want to save the new timestamp, whihc hoepfully this works below:
        // try {
        //     const response = await axios.post(`http://localhost:6969/api/users/${userId}/timestamp`, timestamp);
        //     console.log('Response:', response.data);
        // } catch (error) {
        //     console.error('Error:', error);
        // }
        var songDataList = response.data.items;
        const add_this_ting = await unSeenTracks(songDataList, accessToken)
        console.log("These are all of the added stuffs", add_this_ting)
       
        


        const recentlyPlayedSongIds = [];
        for (var i = 0; i < songDataList.length; i++){
            recentlyPlayedSongIds.push({
                songId: songDataList[i].track.id,
                timestamp: new Date(songDataList[i].played_at).getTime() 
            });
        }
        res.json({ recentlyPlayedSongIds: recentlyPlayedSongIds });
        
    } catch (error) {
        console.error('Error fetching from Spotify:', error.message);
        console.error('Error fetching the recently played songs from Spotify:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching the recently played songs from Spotify');
    }

    // response.data to call and add to unsen tracks


};
// search for a track in spotify
exports.searchTrack = async (req, res) => {
    const accessToken = req.body.accessToken;
    const searchKey = req.body.searchKey;

    try {
        const response = await axios({
            method: "GET",
            url: `https://api.spotify.com/v1/search`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                q: searchKey,
                type: "track"
            }
        });
        console.log("the search track call runs");
        console.log(response.data.tracks.items);
        res.json({ tracks: response.data.tracks.items})
        
    } catch (error) {
        console.error('Error searching song on Spotify', error.response ? error.response.data : error.message);
        res.status(500).send('Error searching song on Spotify');
    }
};