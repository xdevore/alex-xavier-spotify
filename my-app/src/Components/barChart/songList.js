import React, { useEffect } from 'react';
import axios from 'axios';

function SongList(props) {
   console.log(props.dict)

  return (
    <ul className="list-group" style={{ maxHeight: '450px', overflowY: 'auto' }}>
      {props.songs.map(song => (
        <li key={song._Id} className="list-group-item"
        style={{ backgroundColor: song.songId === props.Id ? 'yellow' : 'transparent' }}>
          {props.dict && props.dict[song.songId] ? props.dict[song.songId].name : "not in database my b"}
        </li>
      ))}
    </ul>
  );
}

export default SongList;
