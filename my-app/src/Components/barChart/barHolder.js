import Time from './barChart/time'
import React, { useEffect, useState } from 'react';

  
  function BarHolder() {
    const [year, setYear] = useState(Time.getCurrentYearRange());
    const [month, setMonth] = useState({});
    const [day, setDay] = useState({});
    const [timeFrame, setTimeFrame]= useState(Time.splitRangeIntoSubRanges(year,'month'))

    const [timeState, setTimeState] = useState({
        year: true,
        month: false,
        day: false
      });
      useEffect(()=>{
        //some action choosing day, month or year vals
      }, [timeState])
    
      const setTimePeriod = (period) => {
        setTimeState({
          year: period === 'year',
          month: period === 'month',
          day: period === 'day'
        });
      };
      function moveDown(split){
          if (timeState.year){
            setMonth(split)
            setTimePeriod('month')
            setTimeFrame(Time.splitRangeIntoSubRanges(split, 'month'))
          }
          if (timeState.month){
            setDay(split)
            setTimePeriod('day')
          }
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
            setYear(Time.moveRange(year, 'year', direction))
            setTimeFrame(Time.splitRangeIntoSubRanges(year,'year'))}
        else if (timeState.month){
            setMonth(Time.moveRange(month, 'month', direction))
            setTimeFrame(Time.splitRangeIntoSubRanges(month,'month'))}
        else{
            setDay(Time.moveRange(day, 'day', direction))
            setTimeFrame(Time.splitRangeIntoSubRanges(day,'day'))}
        }

      return{
          //something with a map of data from timeState
      }
      
  };
  export default barHolder;

  
