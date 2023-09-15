import React, { useEffect } from 'react';
import axios from 'axios';

function Home() {
  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    if (hasCode) {
      const newUrl = new URL(url);
      const AUTH_CODE = newUrl.searchParams.get("code");
      fetchAccessToken(AUTH_CODE);
    }
  }, []);

  const fetchAccessToken = (code) => {
    // Fetch access token from your server, assuming you have set up a server endpoint to exchange the code for a token
    axios.post(`/spotify/get-token`, { code: code })
    .then(res => {
        // Here you'll get the access token, store it for further use
        const accessToken = res.data.access_token;
        console.log("Access Token: ", accessToken);
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;