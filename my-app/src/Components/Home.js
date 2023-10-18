import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RefreshButton from './refreshButton';
import ArtistSearchBar from './artistSearchbar';
//import Time from './barChart/time'
import BarChart from './barChart/barHolder';
import TrackSearchBar from "./trackSearchbar";


function Home() {
  const location = useLocation();
  const accessToken = location.state ? location.state.accessToken : null;
  const userDisplayName = location.state ? location.state.userDisplayName : null;
  const userId = location.state ? location.state.userId : null;

  const [searchId, setSearchId] = useState('');

  const handleFindId = (value) => {
    setSearchId(value);
    
    }

  // const test = Time.getCurrentYearRange();
  // console.log(test);
  // console.log(Time.moveRange(test, 'year', 'back'));
  // const makeMonth = Time.splitRangeIntoSubRanges(test,'year');
  // console.log(makeMonth);
  // console.log(Time.splitRangeIntoSubRanges(makeMonth[1],'month'));
  
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
      </Row>
      <Row className="justify-content-md-center" style={{margin:"40px"}}>
        <Col>
          <BarChart userId={userId} searchId = {searchId}/>
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
