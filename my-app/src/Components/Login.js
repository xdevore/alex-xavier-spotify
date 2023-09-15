import React from 'react';
import axios from 'axios';

function Login() {
  const redirectToSpotify = () => {
    
    const CLIENT_ID = 'f96c84ccf962498b8499d78509c90ebf';
    const REDIRECT_URI = 'http://localhost:3004/home'; 
    
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

