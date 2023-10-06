//axios call to api to get songs of user from input time stamp forward
import React, { useState, useEffect } from "react";
import axios from 'axios';

function refreshButton(props) {

    const handleButtonClick = () => {
        console.log(`Access Token is: ${props.accessToken} from button click`);
        console.log(`User ID is: ${props.userId} from button click`);
        getRecentlyPlayed(props.accessToken);
    };

    async function getRecentlyPlayed(accessToken) {
        console.log("made it to the function")
        try {
          const res = await axios.post(`http://localhost:6969/spotify/get-recently-played-song-ids`, { accessToken: accessToken });
          const recentlyPlayedSongIds = res.data.recentlyPlayedSongIds;
          console.log(recentlyPlayedSongIds);
        } catch (error) {
            console.error("Error getting recently played songs", error);
        }
      }

    return (
        <button onClick={handleButtonClick}>
            Refresh Data
        </button>
    );
}



export default refreshButton;