import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BsStar, BsStarFill } from 'react-icons/bs';
import '../buttonStyle.css';
//import { removeListener } from '../models/userModel';

function Starred(props) {
  const [starred, setStarred] = useState(false);
  const [text, setText] = useState(props.timeLabel);
  const [starName, setStarName] = useState(false);
  const [starredDays, setStarredDays] = useState([])

  const handleStarClick = () => {
    setStarred(!starred);
    if (!starred){
        setStarName(true);
    }
    else {
        setStarName(false);
        const remove = starredDays.filter(day => day.start !== (props.time).start);
        console.log("here is what it should be", remove);
        setStarredDays(remove);
        addStarredItem(remove);

    }
  };

  const handleSubmit = () => {
    setStarName(false);
    const newStar = {
        start: props.time.start,  
        end: props.time.end,      
        message: text
    };
    
    setStarredDays([...props.stars, newStar]);  

    addStarredItem([...props.stars, newStar]);
};

  useEffect(()=>{
    console.log("PLEASE HIT THSI S", props.stars)
 
    setStarredDays(props.stars);
    const exists = (props.stars).some(obj => obj.start ==props.time.start);
    if (exists) {
        setStarred(true);
    
        const item = props.stars.find(day => day.start === props.time.start);
        
        if (item) {
            setText(item.message);
        } else {
            
            setText("Item not found");
        }
    }
  


  },[]);

  const addStarredItem = async (updatedStarredItems) => {
      console.log(updatedStarredItems)
    try {
      const response = await axios.post(`http://localhost:7001/api/users/${props.userId}/star`, {
        starred: updatedStarredItems
      });
      console.log('Starred items updated successfully', response.data);
    } catch (error) {
      console.error('Error updating starred items:', error?.response?.data?.message ?? error);
    }
  };

  return (
    <Row>
        <Col md={12}>
        <div className="d-flex align-items-center mb-2">
          <div onClick={handleStarClick} style={{ cursor: 'pointer' }}>
            {starred ? <BsStarFill color="#1ED760"  size = {20}/> : <BsStar size = {20}/>}
          </div>
          {starName && (
            <>

              <Form.Control
                type="text"
                placeholder={props.timeLabel}
                onChange={(e) => setText(e.target.value)}
                style={{ marginLeft: '5px', maxWidth: '200px' }}
              />
              <Button onClick={handleSubmit} className="btn btn-spotify-clear" style={{ marginLeft: '5px' }}>
                Submit
              </Button> 
              
            </>
          )}
         {(!starName && starred) && (
      <div className="ms-2"> 
        <p className="mb-0">{text}</p> 
      </div>
    )}
        </div>
        </Col>
        </Row>
  );
}

export default Starred;

