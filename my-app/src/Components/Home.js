import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RefreshButton from './refreshButton';
import SearchBar from './searchBar'
//import Time from './barChart/time'
import BarChart from './barChart/barHolder';


function Home() {
  const location = useLocation();
  const accessToken = location.state ? location.state.accessToken : null;
  const userDisplayName = location.state ? location.state.userDisplayName : null;
  const userId = location.state ? location.state.userId : null;

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
      <Row className="justify-content-md-center">
        <Col>
          {accessToken && <p style={{ fontFamily: "Times New Roman, serif" }}><center>Your Access Token: {accessToken}</center></p>}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <BarChart userId={userId}/>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <RefreshButton userId={userId} accessToken={accessToken} />
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
