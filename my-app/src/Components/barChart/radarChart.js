import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadarController, PointElement, LineElement, RadialLinearScale, Tooltip, Legend } from "chart.js";

// Register the required controllers, elements, and plugins for Radar chart
ChartJS.register(RadarController, PointElement, LineElement, RadialLinearScale, Tooltip, Legend);

function RadarChart(props) {
    const data = {
        labels: Object.keys(props.features),
        datasets: [
            {
                label: 'Features',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
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
                }
            }
        }
    };

    return (
        <div style={{ width: '350px', height: '350px' }}>
            <Radar data={data} options={options} />
        </div>
    );
}

export default RadarChart;
