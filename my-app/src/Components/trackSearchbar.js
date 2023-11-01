import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

function TrackSearchBar(props) {
  const [searchKey, setSearchKey] = useState('');
  const [tracks, setTracks] = useState([]);
  const [selectedTrackId, setSelectedTrackId] = useState('')
  const [showTracklist, setShowTracklist] = useState(false);

  const accessToken = props.accessToken;

  const tracklistRef = useRef(null);

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const handleWindowClick = (e) => {
    if (tracklistRef.current && !tracklistRef.current.contains(e.target)) {
      setShowTracklist(false);
    }
  };

  async function searchTrack() {
    try {
      console.log("got to search tracks part")
      const res = await axios.post(`http://localhost:6969/spotify/search-track`, {
        accessToken: accessToken,
        searchKey: searchKey,
      });

      setTracks(res.data.tracks);
      setShowTracklist(true);
    } catch (err) {
      console.log(err);
    }
  }

  function displayArtists(trackArtists) {
    var artistStr = "";
    var i = 0;
    trackArtists.forEach(artist => {
      artistStr += artist.name;
      i += 1;
      if (i !== trackArtists.length) {
        artistStr += ", "
      }
    })
    return artistStr;
  }

  function selectTrack(trackId) {
    setSelectedTrackId(trackId);
    setShowTracklist(false);
    props.onIdChange(trackId);
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
      {showTracklist && (
        <Card style={{ maxHeight: "300px", overflowY: "auto", position:"absolute", zIndex:"1" }}
              ref={tracklistRef}>
            <ListGroup>
            {tracks.map((track) => (
                <ListGroup.Item 
                  action 
                  key={track.id} 
                  onClick={() => selectTrack(track.id)}
                  style={{cursor: "pointer"}}>
                  <p>{track.name}</p>
                  <p>{displayArtists(track.artists)}</p>
                </ListGroup.Item>
            ))}
            </ListGroup>
        </Card>
      )}
    </>
  );
}

export default TrackSearchBar;
 