// Login.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

function Login() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("spotify_access_token") || null);
  const [userProfile, setUserProfule] = useState(localStorage.getItem("spotify_user_profile") || null);
  const navigate = useNavigate(); // Create a reference to the navigate function

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    console.log(accessToken)
    
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
  }, [accessToken]);

  const fetchAccessToken = (code) => {
    axios.post(`http://localhost:6969/spotify/get-token`, { code: code })
    .then(res => {
        const fetchedToken = res.data.access_token;
        localStorage.setItem("spotify_access_token", fetchedToken);
        setAccessToken(fetchedToken);
        console.log(fetchUserProfile(accessToken));
        console.log("Access Token: ", fetchedToken);
        
        // Navigate to Home with the access token
        navigate("/home", { state: { accessToken: fetchedToken } });
    })
    .catch(err => console.log(err));
  };

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


