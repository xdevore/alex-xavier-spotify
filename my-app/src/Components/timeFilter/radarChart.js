import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadarController, PointElement, LineElement, RadialLinearScale, Tooltip, Legend } from "chart.js";

//Had to register stuff to use the charts for some reason
ChartJS.register(RadarController, PointElement, LineElement, RadialLinearScale, Tooltip, Legend);

function RadarChart(props) {
    const data = {
        labels: Object.keys(props.features),
        datasets: [
            {
               
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: '#1ED760',
                pointBackgroundColor: '##1ED760',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#1ED760',
                data: Object.values(props.features)
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                ticks: {
                    display: false
                },
                min: 0,           
                max: 1            
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div style={{ width: '500px', height: '350px' }}>
            <Radar data={data} options={options} />
        </div>
    );
}

export default RadarChart;
