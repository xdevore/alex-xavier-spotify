import Time from './time'
import React, { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar, Cell, Text } from 'recharts';

import { Button, Card, Row, Col } from 'react-bootstrap';
const moment = require('moment');


  
  function BarHolder() {
    const [year, setYear] = useState(Time.getCurrentYearRange());
    const [month, setMonth] = useState({});
    const [day, setDay] = useState({});

    const [timeFrame, setTimeFrame]= useState(Time.splitRangeIntoSubRanges(year,'year'))
     

    const [timeState, setTimeState] = useState({
        year: true,
        month: false,
        day: false
      });
      useEffect(()=>{
        //some action choosing day, month or year vals
        //Id axios call with start end of current
      }, [timeState])
    
      const setTimePeriod = (period) => {
        setTimeState({
          year: period === 'year',
          month: period === 'month',
          day: period === 'day'
        });
      };
      function moveDown(split){
          console.log(split)
          if (timeState.year){
            setMonth(split)
            setTimePeriod('month')
            setTimeFrame(Time.splitRangeIntoSubRanges(split, 'month'))
          }
          if (timeState.month){
            setDay(split)
            setTimePeriod('day')
          }
          console.log(month);
      }

      function moveUp(){
        if (timeState.month){
          setTimePeriod('year')
          setTimeFrame(Time.splitRangeIntoSubRanges(year,'year'))
        }
        if (timeState.day){
          setTimePeriod('month')
          setTimeFrame(Time.splitRangeIntoSubRanges(month,'month'))
        }
    }
    function moveLR(direction){
        if (timeState.year){
            const newYear = Time.moveRange(year, 'year', direction);
            setYear(newYear);
            setTimeFrame(Time.splitRangeIntoSubRanges(newYear,'year'));
        }
        else if (timeState.month){
            const newMonth = Time.moveRange(month, 'month', direction);
            setMonth(newMonth);
            setTimeFrame(Time.splitRangeIntoSubRanges(newMonth,'month'));
        }
        else{
            const newDay = Time.moveRange(day, 'day', direction);
            setDay(newDay);
            setTimeFrame(Time.splitRangeIntoSubRanges(newDay,'day'));
        }
    }
    


    const timeLabel = () => {
        if (timeState.year) {
            return moment(year.start).format('YYYY');
        } else if (timeState.month) {
            return moment(month.start).format('MMMM YYYY');
        } else if (timeState.day) {
            return moment(day.start).format('MMMM DD, YYYY');
        }
    };

        

      return(
        <Card style={{ backgroundColor: 'darkgrey', padding: '20px' }}>
            <Row className="mb-3">
        <Col xs={12} className="text-center">
            <h3>{timeLabel()}</h3>
        </Col>
    </Row>
      <Row className="mb-3">
        <Col xs={2}>
          <Button variant="primary" onClick={() =>moveUp()}>
            <i className="bi bi-arrow-left">Back</i>
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="position-relative">
          <BarChart width={875} height={400} data={timeFrame}>
            <XAxis dataKey="name" angle={-30} fontSize={12} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="numSongs" fill={data => `rgba(136, 132, 216, ${data.opacity})`} onClick={(data) => moveDown(data)} />
            <Text x={875 / 2} y={30} textAnchor="middle" fill="#000" fontSize={24} fontWeight="bold">Chart Name</Text>
          </BarChart>
         
        </Col>
      </Row>
      <Row className="text-center">
        <Col xs={5}>
          <Button variant="primary" className="mr-2" onClick={() =>moveLR('forward')}>
            <i className="bi bi-arrow-left"></i> Next
          </Button>
        </Col>
        <Col xs={5}>
          <Button variant="primary" className="ml-2" onClick={() =>moveLR('backward')}>
            Prev <i className="bi bi-arrow-right"></i>
          </Button>
        </Col>
      </Row>
    </Card>
      );
      
  };
  export default BarHolder;

  
