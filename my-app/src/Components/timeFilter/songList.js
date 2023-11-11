import React, { useEffect, useState } from 'react';

import { Row, Col } from 'react-bootstrap';
import { getSummary } from '../openAI/genreSummary';
import batch from './counter';
import RadarChart from './radarChart';
import { genresDictionary } from '../genreMap/genreDict.js';
import { BsStar, BsStarFill } from 'react-icons/bs';
import Starred from './starred';




function SongList(props) {
 const [myGenres, setMyGenres] = useState([]);
 const [someText, SetSomeText]= useState("");
 const [features, setFeatures]= useState({});
 

useEffect(() => {
    const timer = setTimeout(() => {
        if (props.genres && props.genres.length > 0 && (JSON.stringify(props.genres) !== JSON.stringify(myGenres))) {
            setMyGenres(props.genres);

            getSummary(props.genres).then(result => {
                SetSomeText(result);
                console.log(result); 
            });
            const feature_norm = batch.featureData(props.songs, props.dict)
            setFeatures(feature_norm)
           
        }
    }, 200);  

    return () => clearTimeout(timer); 
}, [props.genres]); 
//song.songId === props.Id;
//(props.dict[song.songId].genres.some(item => props.chosenGenres.includes(item)))
return (
  <div className="row">
    
   
    <div className="col-md-6">
      <Starred timeLabel = {props.timeLabel} time={props.time} stars= {props.stars} userId = {props.userId}/>
      <ul className="list-group" style={{ maxHeight: '470px', overflowY: 'auto' }}>
        {props.songs.map(song => {
           
          return (
          <li key={song._Id} className="list-group-item"
           
            style={{ backgroundColor: (song.songId === props.Id||(props.dict[song.songId].genres.some(item => props.chosenGenres.includes(item)))) ? '#1DB954' : 'transparent' }}>
            {props.dict && props.dict[song.songId] ? props.dict[song.songId].name + "     -     " + props.dict[song.songId].artist : "not in database my b"}
          </li>
          );
})}
      </ul>
    </div>

    
    <div className="col-md-6">
      
    
    <div className="mb-2 p-2 rounded" 
     style={{ height: 'calc(100% / 5)', maxWidth: '500px' }}>
  {someText === "" ? "Loading AI Genre Data..." : someText}
</div>

     
      <div style={{ height: 'calc(4/5 * 100%)' }}>
      
          
            <RadarChart features = {features}/>
        
      </div>

    </div>

  </div>
);


}

export default SongList;
