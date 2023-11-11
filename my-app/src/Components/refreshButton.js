//axios call to api to get songs of user from input time stamp forward
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './buttonStyle.css';


function refreshButton(props) {

    const handleButtonClick = () => {
        console.log(`Access Token is: ${props.accessToken} from button click`);
        console.log(`User ID is: ${props.userId} from button click`);
        getRecentlyPlayed(props.accessToken);
    };

    async function getRecentlyPlayed(accessToken) {
        console.log("made it to the function")
        try {
          const res = await axios.post(`http://localhost:7001/spotify/get-recently-played-song-ids`, { accessToken: accessToken, userId: props.userId });
          const recentlyPlayedSongIds = res.data.recentlyPlayedSongIds;

          console.log(recentlyPlayedSongIds);
          const data = {
            userId: props.userId,
            songs: recentlyPlayedSongIds
        };
          try {
            
            const response = await axios.post('http://localhost:7001/api/songs/', data);
            console.log('Songs added successfully:', response.data);
          } catch (error) {
            console.error('Error adding songs:', error);
          }

        } catch (error) {
            console.error("Error getting recently played songs", error);
        }
      }

    return (
      <Button className = "btn btn-spotify-clear mb-4" onClick={
        handleButtonClick
    }>
       Refresh Data
    </Button>
        // <button onClick={handleButtonClick}>
        //     Refresh Data
        // </button>
    );
}



export default refreshButton;