import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

function TrackSearchBar(props) {
    const [searchKey, setSearchKey] = useState('');
    const [tracks, setTracks] = useState([]);
    const [selectedTrackId, setSelectedTrackId] = useState('');

    const accessToken = props.accessToken;

    function sendId(id){
        props.onIdChange(id);
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
        <div className="container my-4">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search By Track Name ..."
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <div className="input-group-append">
                    <Button variant="outline-primary" onClick={searchTrack}>
                        Search
                    </Button>
                </div>
            </div>
            {tracks.length > 0 && (
                <Card className="mb-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
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
        </div>
    );
}

export default TrackSearchBar;

