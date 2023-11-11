// Login.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function Login() {
  //const [accessToken, setAccessToken] = useState(localStorage.getItem("spotify_access_token") || null);
  const navigate = useNavigate(); // Create a reference to the navigate function

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    //console.log(accessToken)
    
    // if (accessToken) {
    //   console.log(fetchUserProfile(accessToken));
    //   navigate("/home", { state: { accessToken } });
    // } else if (!accessToken && hasCode) {
      if (hasCode) {
      const newUrl = new URL(url);
      const AUTH_CODE = newUrl.searchParams.get("code");
      console.log("havetoken")
      fetchAccessToken(AUTH_CODE);
    }
  }, []);

  async function fetchAccessToken(code) {
    try {
      console.log(code)
        const res = await axios.post(`http://localhost:7001/spotify/get-token`, { code: code });
        console.log("got the response", res.data.access_token)
        const fetchedToken = res.data.access_token;
        localStorage.setItem("spotify_access_token", fetchedToken);
        
        const userProfileRes = await axios.post(`http://localhost:7001/spotify/fetch-user-profile`, { accessToken: fetchedToken });
        const userDisplayName = userProfileRes.data.userDisplayName;
        const userId = userProfileRes.data.userId;
        
        console.log("Access Token: ", fetchedToken);
        console.log("User Display Name: ", userDisplayName);
        console.log("User ID: ", userId);
        addUser(userId)

        navigate("/home", { state: { accessToken: fetchedToken, userDisplayName: userDisplayName, userId: userId } });
        
    } catch (err) {
        console.log("fuggggg", err);
    }
}



  async function addUser(userId){
    try {
        
        const response = await axios.post('http://localhost:7001/api/users/', { userId: userId });
        console.log('User added:', response.data);
    } catch (error) {
        console.error('Error adding user:', error);
    }
  }

  const redirectToSpotify = () => {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    //"144e7866c95e4f018ee8ff57b0149d23"
    //process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = 'http://localhost:3000/login'; 
    const scopes = ['user-top-read', 'user-read-recently-played', 'user-library-read', 'user-follow-read']; 
    
    const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scopes.join('%20')}`;
    
    window.location.href = authURL;
};


  return (
    <div>
      <h1>Login</h1>
      <button onClick={redirectToSpotify}>Login with Spotify</button>
    </div>
  );
}

export default Login;


