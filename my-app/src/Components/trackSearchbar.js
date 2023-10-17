import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

function TrackSearchBar(props) {
  const [searchKey, setSearchKey] = useState('');
  const [tracks, setTracks] = useState([]);
  const [selectedTrackId, setSelectedTrackId] = useState('')

  const accessToken = props.accessToken;

  function sendId(id){
    props.onIdChange(id)
  }


  async function searchTrack() {
    try {
      const res = await axios.post(`http://localhost:6969/spotify/search-track`, {
        accessToken: accessToken,
        searchKey: searchKey,
      });

      console.log("that ran");
      console.log(res.data.tracks);
      setTracks(res.data.tracks);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="SearchForm">
        <input
          className="Name"
          type="text"
          placeholder="Search By Track Name ..."
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        <button onClick={searchTrack}>Search</button>
      </div>
      {tracks.length > 0 && (
        <Card style={{ maxHeight: "300px", overflowY: "auto" }}>
            <ListGroup>
                {tracks.map((track) => (
                    <ListGroup.Item 
                        key={track.id} 
                        onClick={() => sendId(track.id)} 
                        style={{cursor: "pointer"}}>
                        {track.name}
                        <br/>
                        {track.artist}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
      )}
    </>
  );
}

export default TrackSearchBar;
