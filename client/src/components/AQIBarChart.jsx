// import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AQIBarChart = ({ currentAQI, avgAQI, pollutants }) => {
  console.log('Current AQI:', currentAQI); // Check if 'co' is present
  console.log('Average AQI:', avgAQI); // Check if 'co' is present

  const data = {
    labels: pollutants.map(pollutant => pollutant.toUpperCase()),
    datasets: [
      {
        label: 'Current AQI',
        data: pollutants.map(pollutant => currentAQI[pollutant] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Average AQI',
        data: pollutants.map(pollutant => avgAQI[pollutant] || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Standard AQI',
        data: Array(pollutants.length).fill(100), // Example standard AQI value
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 500,
        title: {
          display: true,
          text: 'AQI',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

AQIBarChart.propTypes = {
  currentAQI: PropTypes.object.isRequired,
  avgAQI: PropTypes.object.isRequired,
  pollutants: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AQIBarChart;
