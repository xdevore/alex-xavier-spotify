// Assuming you have D3.js and your dictionary imported
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { genresDictionary } from './genreDict.js';

const PlotlyChart = (props) => {
  
  const [checkedItems, setCheckedItems] = useState([]);

  //Change: temporary fix - now that two places use genre filter handleChackChange should exist in Home level so no extra renders
  useEffect(() => {
    setCheckedItems(props.current)
  },[props.current])

  const handleCheckChange = (item) => {
  
    const item_val = item.points[0].text
    let newCheckedItems;
    if (checkedItems.includes(item_val)) {
      newCheckedItems = checkedItems.filter(i => i !== item_val); 
    } else {
      newCheckedItems = [...checkedItems, item_val]; 
    }
   
    props.getGenre(newCheckedItems); 
    setCheckedItems(newCheckedItems);
  };
  
  const dataPoints = Object.keys(genresDictionary)
  .filter(key => Object.keys(props.genreList).includes(key))
  .map(key => ({
    ...genresDictionary[key],
    genre: key,
    frequency: props.genreList[key]
  }));


const plotData = [{
  x: dataPoints.map(point => point.x),
  y: dataPoints.map(point => point.y),
  text: dataPoints.map(point => point.genre), 
  hoverinfo: 'text',
  mode: 'markers',
  marker: {
    
    color: dataPoints.map(point => checkedItems.includes(point.genre) ? 'black' : point.color),
    size: dataPoints.map(point => Math.log(point.frequency + 1)*6),
  

  },
  type: 'scatter'
}];

const layout = {
    title: 'Genre Distributions',
    xaxis: {
      title: '← denser & atmospheric, spikier & bouncier →',
      showticklabels: false,
      showgrid: false, 
    zeroline: false,
    },
    yaxis: {
      title: '← organic, mechanical & electric →',
      showticklabels: false,
      showgrid: false, 
    zeroline: false,
    },
    hovermode: 'closest',
    showlegend: false,
    paper_bgcolor: 'transparent', 
    plot_bgcolor: 'transparent', 
   
    margin: {
      l: 10, 
      r: 10, 
      b: 10,
      t: 30, 
    },
    height: 600, 
    width: 1000,
   
  };

  return (
    <div className="col-md-6">
      <div className="card" style={{ backgroundColor: 'transparent', border: 'none' }}>
        <div className="card-body">
          
          <Plot
          
            data={plotData}
            layout={layout}
            style={{ width: '100%', height: '100%' }} 
            useResizeHandler={true}
            onClick={handleCheckChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PlotlyChart;