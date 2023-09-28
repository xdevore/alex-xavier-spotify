import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    </Container>
  );
}

export default Home;

