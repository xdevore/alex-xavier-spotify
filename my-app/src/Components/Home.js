import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RefreshButton from './refreshButton';
import ArtistSearchBar from './SearchMechanism/artistSearchbar';
//import Time from './barChart/time'
import BarChart from './barChart/barHolder';
import TrackSearchBar from "./SearchMechanism/trackSearchbar";
import GenreDropdown from "./SearchMechanism/genreDropdown";


function Home() {
  const location = useLocation();
  const accessToken = location.state ? location.state.accessToken : null;
  const userDisplayName = location.state ? location.state.userDisplayName : null;
  const userId = location.state ? location.state.userId : null;

  const [searchId, setSearchId] = useState('');
  const handleFindId = (value) => {
    setSearchId(value);
    }

  const [genreDisplay, setGenreDisplay]= useState([]);
  const handleGiveGenre = (value) => {
    setGenreDisplay([...value]);
    }

  const [searchGenre, setSearchGenre] = useState([]);
  const handleFindGenre = (value) => {
    setSearchGenre(value);
    }
console.log(genreDisplay)

  

  
  
  return (
    <Container>
      <Row className="align-items-center" style={{height:"100px"}}>
        <Col>
          { <p style={{ margin:50, fontSize: '40px', fontFamily: "Times New Roman, serif" }}><center>Welcome, {userId}</center></p>}
        </Col>
      </Row>
      <Row className="justify-content-md-center" style={{ margin:50 }}>
        <Col>
          <ArtistSearchBar
            accessToken={accessToken}
            
          >
          </ArtistSearchBar>
        </Col>
        <Col>
          <TrackSearchBar
            onIdChange = {handleFindId}
            accessToken={accessToken}
          >
          </TrackSearchBar>
          <button onClick={()=> setSearchId('')}>Clear</button>
        </Col>
        <Col>
          <GenreDropdown
            items = {searchGenre}
            getGenre = {handleGiveGenre}
          >
          </GenreDropdown>
          
        </Col>
      </Row>
      <Row className="justify-content-md-center" style={{margin:"40px"}}>
        <Col>
          <BarChart userId={userId} searchId = {searchId} searchGenre = {genreDisplay} onGenreChange = {handleFindGenre}/>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <RefreshButton userId={userId} accessToken={accessToken} />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <p>Listened Near:</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
// make sure all bars are loaded in order
// const handleOperationsInOrder = async () => {
//   const promises = items.map(item => asyncOperation(item));
//   const results = await Promise.all(promises);
