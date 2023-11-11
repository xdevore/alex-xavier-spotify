import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './buttonStyle.css';
import Col from 'react-bootstrap/Col';
import { Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import RefreshButton from './refreshButton';
import ArtistSearchBar from './SearchMechanism/artistSearchbar';
//import Time from './barChart/time'
import BarChart from './timeFilter/moveTimeframe';
import TrackSearchBar from "./SearchMechanism/trackSearchbar";
import GenreDropdown from "./SearchMechanism/genreDropdown";
import PlotlyChart from './genreMap/genreGraph';


function Home() {
  const location = useLocation();
  const accessToken = location.state ? location.state.accessToken : null;
  const userDisplayName = location.state ? location.state.userDisplayName : null;
  const userId = location.state ? location.state.userId : null;
//Change: I only need one that updates with what we are using. This requires possibly an object with type of data (id, genre, artist, feature) and a list of the values. This should work smoothly
  const [searchId, setSearchId] = useState('');
  const handleFindId = (value) => {
    setSearchId(value);
    }

  const [genreDisplay, setGenreDisplay]= useState([]);
  const handleGiveGenre = (value) => {
    setGenreDisplay(value);
    }

  const [searchGenre, setSearchGenre] = useState({});//weirdly for initial get grenre
  const handleFindGenre = (value) => {
    setSearchGenre(value);
    }
 
  const [selected, setSelected] = useState('');
  const searchType = (search) => {
    setSelected(search)
    if (search == 'Song'){
      setGenreDisplay([])
    }
    else if (search == 'Genre') {
      setSearchId('')
    }
  }

  const [filter, setFilter]=useState({})
  const handleFilter = (value) => {
    setFilter(value);
    }

  

  
  
  return (
    <Container >
      <Row className="align-items-center" style={{ height: "25px" }}>
    <Col>
    <p className="mb-0 h3 d-none d-lg-block mt-4" style={{ color: '#1ED760' }}>
    <center>Explore How {userId} Listens</center>
    </p>

    </Col>
</Row>
<Row className="justify-content-md-center" style={{ margin: 50 }}>
   
<Col>
<div className="container mt-2">
  <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-3 align-items-center" style={{ maxWidth: '750px', margin: 'auto' }}>
   
    <span className="navbar-brand mb-0 h1 d-none d-lg-block px-3">Music Filter</span>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <button className="btn btn-link nav-link" onClick={() => searchType('Genre')}>Genre</button>
        </li>
        <li className="nav-item">
          <button className="btn btn-link nav-link" onClick={() => searchType('Artist')}>Artist</button>
        </li>
        <li className="nav-item">
          <button className="btn btn-link nav-link" onClick={() => searchType('Song')}>Song</button>
        </li>
        <li className="nav-item">
          <button className="btn btn-link nav-link" onClick={() => searchType('Song')}>Feature</button>
        </li>
       
      </ul>
    </div>
    <div className="ms-auto d-none d-lg-block">
      {selected === 'Artist' ? 
        <ArtistSearchBar accessToken={accessToken} /> :
        (selected === 'Song' ? 
          <TrackSearchBar onIdChange={handleFindId} accessToken={accessToken} /> :
          <GenreDropdown items={Object.keys(searchGenre)} getGenre={handleGiveGenre} current ={genreDisplay}/>
        )
      }
    </div>
  </nav>
</div>

    </Col>
</Row>

      <Row className="justify-content-md-center" style={{margin:"40px"}}>
        <Col>
        <Card style={{ backgroundColor: '#888888', padding: '20px' }}>
          <BarChart userId={userId} searchId = {searchId} searchGenre = {genreDisplay} onGenreChange = {handleFindGenre}/>
          <PlotlyChart getGenre={handleGiveGenre} genreList = {searchGenre} current ={genreDisplay}></PlotlyChart>
          </Card>
        </Col>
      </Row>
      <Row>
      
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <RefreshButton userId={userId} accessToken={accessToken} />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        
      </Row>
    </Container>
  );
}

export default Home;

