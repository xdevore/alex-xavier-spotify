import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../buttonStyle.css';

function ArtistSearchBar(props) {
    const [searchKey, setSearchKey] = useState("");
    const [tracks, setTracks] = useState([]);

    const accessToken = props.accessToken;

    const searchArtist = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                'Content-Type' : "application/json",
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        });
      
        var artistID = data.artists.items[0].id;

        var artistTracks = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                limit: 10,
                market: 'US'
            }
        });

        setTracks(artistTracks.data.tracks);
    };

    return (
        <>
            <div className="container my-1">
                <div className="input-group mb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search By Artist Name ..."
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button className = "btn btn-spotify-clear" type="button" onClick={searchArtist}>
                            Search
                        </button>
                    </div>
                </div>
                {tracks.slice(0, 5).map(track => (
                    <div key={track.id} className="mb-2">
                        <ul className="list-group">
                            <li className="list-group-item">{track.name}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ArtistSearchBar;
