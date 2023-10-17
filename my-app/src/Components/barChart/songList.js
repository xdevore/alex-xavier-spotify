import React, { useEffect } from 'react';
import axios from 'axios';

function SongList(props) {
  useEffect(() => {
    const songsYeah = props.songs.map(song => song.songId);
    axios.post('http://localhost:6969/api/seen/getSongs', { songIds: songsYeah })
        .then(response => {
            console.log("Success:", response.data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
  }, [props.songs]);  

  return (
    <ul className="list-group">
      {props.songs.map(song => (
        <li key={song._Id} className="list-group-item">
          {song.songId}
        </li>
      ))}
    </ul>
  );
}

export default SongList;
