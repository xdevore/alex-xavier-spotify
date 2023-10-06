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
        const res = await axios.post(`http://localhost:6969/spotify/get-token`, { code: code });
        const fetchedToken = res.data.access_token;
        localStorage.setItem("spotify_access_token", fetchedToken);
        
        const userProfile = await fetchUserProfile(fetchedToken);
        const username = userProfile["display_name"];
        const userId = userProfile["id"];
        
        console.log("Access Token: ", fetchedToken);
        console.log("Username: ", username);
        console.log("User ID: ", userId);
        addUser(userId)

        navigate("/home", { state: { accessToken: fetchedToken, username: username, userId: userId } });
        
    } catch (err) {
        console.log(err);
    }
}

async function addUser(userId){
  try {
      console.log("FUCKINGRUNTHISSHIT")
      const response = await axios.post('http://localhost:6969/api/user/', { userId: userId });
      console.log('User added:', response.data);
  } catch (error) {
      console.error('Error adding user:', error);
  }
}


  async function fetchUserProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
  }

  const redirectToSpotify = () => {
    const CLIENT_ID = 'f96c84ccf962498b8499d78509c90ebf';
    const REDIRECT_URI = 'http://localhost:3000/login'; 
    
    const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-top-read`;
    
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


