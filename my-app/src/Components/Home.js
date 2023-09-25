import React from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const accessToken = location.state ? location.state.accessToken : null;

  return (
    <div>
      <h1>Home</h1>
      {accessToken && <p>Your Access Token: {accessToken}</p>}
    </div>
  );
}

export default Home;

