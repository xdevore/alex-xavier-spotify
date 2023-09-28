import React from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const accessToken = location.state ? location.state.accessToken : null;
  const username = location.state ? location.state.username : null;
  const userId = location.state ? location.state.userId : null;

  return (
    <div>
      {accessToken && <p>Your Access Token: {accessToken}</p>}
      {username && <p>Welcome, {username}</p>}
      {userId && <p>User Id: {userId}</p>}
    </div>
  );
}

export default Home;

