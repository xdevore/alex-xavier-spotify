import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RefreshButton from './refreshButton';
import SearchBar from './searchBar'


function Home() {
  const location = useLocation();
  const accessToken = location.state ? location.state.accessToken : null;
  const username = location.state ? location.state.username : null;
  const userId = location.state ? location.state.userId : null;

  return (
    <Container>
      <Row className="align-items-center" style={{height:"100px"}}>
        <Col>
          {username && <p style={{ margin:50, fontSize: '40px', fontFamily: "Times New Roman, serif" }}><center>Welcome, {username}</center></p>}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          {accessToken && <p style={{ fontFamily: "Times New Roman, serif" }}><center>Your Access Token: {accessToken}</center></p>}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
    <Col>
      <RefreshButton userId={userId} />
    </Col>
    <Col>
      <SearchBar tok = "BQBacQFGnuZYT9778zBrWkdbvIDaTVtPOpCm7UKK7H_NNuyq3SVZRf_JdZp4z4kHGuL-HJ9kUlhJ7oI0l4jaMGabSFWh2VnsDEfb0d4VrN1ZKK4MwkZMmrkQPWIA1unJE8wLzYC8-z6cwwM59LJWFqVEACiMrchG8tDBffib6T7lpxJaLx8umXb78VM_zgQ4"/>
    </Col>
  </Row>
    </Container>
  );
}

export default Home;
//make sure all bars are loaded in order
// const handleOperationsInOrder = async () => {
//   const promises = items.map(item => asyncOperation(item));
//   const results = await Promise.all(promises);
