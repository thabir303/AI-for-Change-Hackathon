//components/WeatherInfo.jsx
// import React from 'react';

import PropTypes from 'prop-types';

const WeatherInfo = ({ weather }) => {
  return (
    <div className="weather-info">
      <h2>Current Weather</h2>
      <p>City: {weather.city}</p>
      <p>Temperature: {weather.temperature} °C</p>
      <p>Humidity: {weather.humidity} %</p>
      <p>Description: {weather.description}</p>
    </div>
  );
};

WeatherInfo.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default WeatherInfo;
