function SongList(props) {
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