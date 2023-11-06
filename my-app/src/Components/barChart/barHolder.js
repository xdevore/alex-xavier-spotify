import Time from './time'
import React, { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar, Cell, Text } from 'recharts';
import axios from 'axios';
import batch from './batchCounter';
import { Button, Card, Row, Col } from 'react-bootstrap';
import SongList from './songList';
import '../buttonStyle.css';
import { getSummary } from '../openAI/genreSummary';
const moment = require('moment');


  
  function BarHolder(props) {
    

    const [loading, setLoading] = useState(true);

    const [year, setYear] = useState(Time.getCurrentYearRange());
    const [month, setMonth] = useState({});
    const [day, setDay] = useState({});
    const [songGenres, setSongGenres] = useState([])
    const [timeFrame, setTimeFrame]= useState(Time.splitRangeIntoSubRanges(year,'year'))

    const [songInfo, setSongInfo]=useState({}) //dictionary stuff probably should rename tbh
     

    const [timeState, setTimeState] = useState({
        year: true,
        month: false,
        day: false
      });

      const [songData, setSongData] = useState([])

      // get new songs in a new time frame ----------------------------------------------------------------------------------

      useEffect(() => {
        
        async function fetchSongs(userId, start, end) {
          
            console.log("Fetching songs from", start, "to", end);
    
            try {

                const response = await axios.get(`http://localhost:6969/api/songs/${userId}/${start}/${end}`);
    
             
                var copy = [...timeFrame];
                
                
                batch.userCount(response.data, copy);
              
                setTimeFrame(copy);
                
             
                const newSongData = response.data;
                setSongData(newSongData);
               
                
                await fetchUniqueSongs(newSongData);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        }
    
        var start;
        var end;
        if (timeState.year) {
            start = year.start;
            end = year.end;
        } else if (timeState.month) {
            start = month.start;
            end = month.end;
        } else {
            start = day.start;
            end = day.end;
        }
    
        fetchSongs(props.userId, start, end);
    
        async function fetchUniqueSongs(songs) {
            const songsYeah = songs.map(song => song.songId);
           
            try {
          
                const response = await axios.post('http://localhost:6969/api/seen/getSongs', { songIds: songsYeah });
                const myGenres = response.data.map(song => song.genres).flat();
                const counter = {};
  
                myGenres.forEach(item => {
                  if (counter[item]) {
                    counter[item] += 1;
                  } else {
                    counter[item] = 1;
                  }
                });
                props.onGenreChange(counter);
                setSongGenres(Object.keys(counter));
                const songsDict = batch.uniqueSongsDict(response.data);
               
                console.log("hard days work", songsDict);
                setSongInfo(songsDict);
            } catch (error) {
                console.error("Error loading unique songs:", error);
            }
        }
    
    }, [timeState]);  
    


//  update the opacity for song stuff ---------------------------------
    useEffect (()=> {
  
      var copy = [...timeFrame]
     
      batch.resetOpacity(copy)
      if ((props.searchId != "") || (props.searchGenre && props.searchGenre.length > 0)){
      console.log(props.searchId);
      
     
      if (props.searchId != ""){
       
        batch.idCount(props.searchId,songData,copy, "song");
        }

      else if (props.searchGenre && props.searchGenre.length > 0) {
        console.log("called on update",props.searchGenre)
        console.log("song ids", songData)
        console.log("Dictionary", songInfo)
        
        batch.idCount(props.searchGenre, songData, copy, "genre", songInfo)
      }
      }
      setTimeFrame(copy);
      setLoading(false);
    }, [props.searchId,songInfo, props.searchGenre]);

    // extra time name stuff
    
      const setTimePeriod = (period) => {
        setTimeState({
          year: period === 'year',
          month: period === 'month',
          day: period === 'day'
        });
      };

      // Time direction switch of day, month, year
      function moveDown(split){
          
            setLoading(true)
        
          if (timeState.year){
            setMonth(split);
            setTimePeriod('month');
            setTimeFrame(Time.splitRangeIntoSubRanges(split, 'month'));
          }
          if (timeState.month){
            setDay(split);
            setTimePeriod('day');
            //setTimeFrame(Time.splitRangeIntoSubRanges(split, 'day'))
          }
          console.log(month);
      }

      function moveUp(){
  
        setLoading(true)
        if (timeState.month){
          setTimePeriod('year');
          setTimeFrame(Time.splitRangeIntoSubRanges(year,'year'));
        }
        if (timeState.day){
          setTimePeriod('month');
          setTimeFrame(Time.splitRangeIntoSubRanges(month,'month'));
        }
    }
    function moveLR(direction){

      setLoading(true)
        if (timeState.year){
            const newYear = Time.moveRange(year, 'year', direction);
            setTimePeriod('year');
            setYear(newYear);
            setTimeFrame(Time.splitRangeIntoSubRanges(newYear,'year'));
        }
        else if (timeState.month){
            const newMonth = Time.moveRange(month, 'month', direction);
            setTimePeriod('month')
            setMonth(newMonth);
            setTimeFrame(Time.splitRangeIntoSubRanges(newMonth,'month'));
        }
        else{
            const newDay = Time.moveRange(day, 'day', direction);
            setTimePeriod('day')
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
        <>
            <Row className="mb-3">
        <Col xs={12} className="text-center">
            <h3>Songs Played {timeLabel()}</h3>
        </Col>
    </Row>
      <Row className="mb-3">
        <Col xs={2}>
          <Button variant="primary" className="btn btn-spotify-clear" onClick={() =>moveUp()}>
            <i className="bi bi-arrow-left">Back</i>
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="position-relative">
        
        {
    (!loading && timeState.day) ? 
        <SongList songs={songData} dict ={songInfo} Id = {props.searchId} genres = {songGenres} chosenGenres = {props.searchGenre} time = {timeState}/> :
        <BarChart width={1000} height={400} data={timeFrame}>
  <XAxis dataKey="name" angle={-30} fontSize={12} />
  <YAxis />
  <Tooltip />
  <Bar
    dataKey="numSongs"
    fill={data => `rgba(136, 132, 216, ${data.opacity})`}
    stroke="#000" 
    strokeWidth={1} 
    onClick={(data) => moveDown(data)}
  />
  <Text x={875 / 2} y={30} textAnchor="middle" fill="#000" fontSize={24} fontWeight="bold">Chart Name</Text>
</BarChart>

    
}
         
        </Col>
      </Row>
      <Row className="text-center">
        <Col xs={5}>
          <Button variant="primary" className="mr-2 btn btn-spotify-clear"  onClick={() =>moveLR('backwards')}>
            <i className="bi bi-arrow-left"></i> Prev
          </Button>
        </Col>
        <Col xs={5}>
          <Button variant="primary" className="ml-2 btn btn-spotify-clear" onClick={() =>moveLR('forward')}>
            Next <i className="bi bi-arrow-right"></i>
          </Button>
        </Col>
      </Row>
    </>
      );
      
  };
  export default BarHolder;

  
