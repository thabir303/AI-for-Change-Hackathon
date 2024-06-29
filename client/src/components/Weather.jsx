import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching weather data');
      console.error(err);
    }
  };

  return (
    <div className="weather-container">
      <input
        type="text"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Enter latitude"
      />
      <input
        type="text"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
        placeholder="Enter longitude"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && (
        <div className="weather-info">
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Description: {weather.description}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Weather;
